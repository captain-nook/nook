import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'
import { bundledWechatPosts } from '@/lib/bundled-wechat-posts'

export interface LocalWechatPost {
  slug: string
  title: string
  summary: string
  date: string
  coverImage: string | null
  href: string
}

export interface LocalWechatPostDetail extends LocalWechatPost {
  html: string
}

const WECHAT_POSTS_DIR = process.env.WECHAT_POSTS_DIR || path.join(process.cwd(), 'content', 'wechat-posts')
const PUBLIC_WECHAT_ASSETS_DIR = path.join(process.cwd(), 'public', 'wechat-assets')
const GENERIC_HEAD_IMAGE = '20260502142235164.jpg'

function fileNameToSlug(file: string) {
  return file.replace(/\.md$/, '').split('_')[0]
}

async function listPostFiles() {
  if (!process.env.WECHAT_POSTS_DIR) {
    return bundledWechatPosts.map((post) => post.file)
  }
  const files = await fs.readdir(WECHAT_POSTS_DIR)
  return files.filter((file) => file.endsWith('.md'))
}

async function findFileBySlug(slug: string) {
  const files = await listPostFiles()
  return files.find((file) => fileNameToSlug(file) === slug) ?? null
}

function normalizeRemoteImage(src: string) {
  if (src.startsWith('http://')) return src.replace('http://', 'https://')
  if (src.startsWith('https://')) return src
  return null
}

function extractImages(markdown: string) {
  return [...markdown.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)].map((match) => match[1])
}

async function copyLocalWechatAsset(src: string) {
  const sourcePath = path.resolve(WECHAT_POSTS_DIR, src)
  const fileName = path.basename(sourcePath)
  const destPath = path.join(PUBLIC_WECHAT_ASSETS_DIR, fileName)
  await fs.mkdir(PUBLIC_WECHAT_ASSETS_DIR, { recursive: true })
  await fs.copyFile(sourcePath, destPath).catch(async () => {
    const assetsPath = path.join(WECHAT_POSTS_DIR, 'assets', fileName)
    await fs.copyFile(assetsPath, destPath)
  })
  return `/wechat-assets/${fileName}`
}

async function resolveImageSrc(src: string) {
  const remote = normalizeRemoteImage(src)
  if (remote) return remote
  if (!process.env.WECHAT_POSTS_DIR) return src.replace(/^assets\//, '/wechat-assets/')
  return copyLocalWechatAsset(src).catch(() => src)
}

async function resolveCoverImage(markdown: string, explicitCover: unknown) {
  if (typeof explicitCover === 'string' && explicitCover.trim()) {
    const cover = explicitCover.trim()
    const remote = normalizeRemoteImage(cover)
    if (remote) return remote
    if (!process.env.WECHAT_POSTS_DIR) return cover.replace(/^assets\//, '/wechat-assets/')
    return copyLocalWechatAsset(cover).catch(() => null)
  }

  const images = extractImages(markdown).filter((src) => !src.includes(GENERIC_HEAD_IMAGE))
  const preferred = images.find((src) => src.startsWith('assets/')) ?? images[0]
  if (!preferred) return null

  const remote = normalizeRemoteImage(preferred)
  if (remote) return remote
  if (!process.env.WECHAT_POSTS_DIR) return preferred.replace(/^assets\//, '/wechat-assets/')
  return copyLocalWechatAsset(preferred).catch(() => null)
}

async function normalizeMarkdownImages(markdown: string) {
  const images = extractImages(markdown)
  const uniqueImages = [...new Set(images)]
  let normalized = markdown

  for (const src of uniqueImages) {
    const resolved = await resolveImageSrc(src)
    normalized = normalized.replaceAll(`](${src})`, `](${resolved})`)
  }

  return normalized
}

async function markdownToHtml(markdown: string) {
  const normalizedMarkdown = await normalizeMarkdownImages(markdown)
  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(normalizedMarkdown)
  return processed.toString()
}

function stripMarkdown(markdown: string) {
  return markdown
    .replace(/---[\s\S]*?---/, '')
    .replace(/<[^>]+>/g, '')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
    .replace(/[#>*_`~\-]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

async function getRawPost(file: string) {
  if (!process.env.WECHAT_POSTS_DIR) {
    return bundledWechatPosts.find((post) => post.file === file)?.raw ?? null
  }
  return fs.readFile(path.join(WECHAT_POSTS_DIR, file), 'utf8')
}

async function readPostFile(file: string) {
  const raw = await getRawPost(file)
  if (!raw) throw new Error(`Post not found: ${file}`)

  const parsed = matter(raw)
  const data = parsed.data as Record<string, unknown>
  const title = String(data.publish_title || data.title || file.replace(/\.md$/, ''))
  const summary = String(data.publish_summary || data.summary || stripMarkdown(parsed.content).slice(0, 120))
  const created = String(data.created || file.slice(0, 6))
  const cover = await resolveCoverImage(parsed.content, data.cover)
  const slug = fileNameToSlug(file)

  return {
    slug,
    title,
    summary,
    date: created,
    coverImage: cover,
    href: `/wechat/${slug}`,
    content: parsed.content,
  }
}

export async function getLocalWechatPosts(limit = 6): Promise<LocalWechatPost[]> {
  try {
    const markdownFiles = (await listPostFiles())
      .sort((a, b) => b.localeCompare(a, 'zh-CN'))
      .slice(0, limit)

    const posts = await Promise.all(markdownFiles.map(readPostFile))
    return posts.map(({ content: _content, ...post }) => post)
  } catch {
    return []
  }
}

export async function getLocalWechatPostBySlug(slug: string): Promise<LocalWechatPostDetail | null> {
  try {
    if (!/^\d{6}$/.test(slug)) return null
    const file = await findFileBySlug(slug)
    if (!file) return null

    const post = await readPostFile(file)
    const html = await markdownToHtml(post.content)
    const { content: _content, ...basePost } = post
    return { ...basePost, html }
  } catch {
    return null
  }
}
