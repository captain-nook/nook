import { notFound } from 'next/navigation'
import Link from 'next/link'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { getLocalWechatPostBySlug } from '@/lib/local-wechat-posts'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getLocalWechatPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
  }
}

export default async function WechatPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getLocalWechatPostBySlug(slug)
  if (!post) notFound()

  return (
    <div className="min-h-screen bg-[#f7fbff] text-slate-900 [font-family:var(--font-rounded)] flex flex-col">
      <SiteHeader />
      <main className="flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <article className="mx-auto max-w-3xl rounded-[2rem] border border-sky-100 bg-white/90 px-5 py-8 shadow-sm sm:px-10 sm:py-12">
          <Link href="/#articles" className="text-sm font-bold text-sky-700 hover:text-sky-900">
            ← 返回文章
          </Link>
          <header className="mt-8 mb-10 border-b border-sky-100 pb-8">
            <div className="mb-4 flex items-center gap-2 text-xs text-slate-500">
              <span className="rounded-full border border-sky-100 bg-sky-50 px-2.5 py-1 font-medium text-sky-700">公众号</span>
              <time>{post.date}</time>
            </div>
            <h1 className="text-3xl font-black leading-snug tracking-tight text-slate-950 sm:text-5xl [font-family:var(--font-display-rounded)]">
              {post.title}
            </h1>
            {post.summary && <p className="mt-5 text-base leading-8 text-slate-600">{post.summary}</p>}
          </header>

          <div className="rich-content" dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>
      </main>
      <SiteFooter />
    </div>
  )
}
