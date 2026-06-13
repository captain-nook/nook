'use client'

import Image from 'next/image'
import Link from 'next/link'
import { BookOpenText, Mic, Radio, Sparkles, Video } from 'lucide-react'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { Pagination } from '@/components/Pagination'
import type { HomeProps } from '@/components/HomeClient'

function formatDate(ts: number) {
  return new Date(ts * 1000).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const channels = [
  { title: '视频', description: 'AI 工具实测、方法拆解与频道视频归档。', icon: Video },
  { title: '文章', description: '公众号长文、趋势观察与实践笔记。', icon: BookOpenText },
  { title: '图文', description: '更轻量的 AI 内容卡片与方法速记。', icon: Radio },
  { title: '播客', description: '围绕 AI 与创作的深度聊天内容。', icon: Mic },
]

const recentVideos = [
  {
    title: 'Karpathy三层结构，我搭了套会生长的 WIKI 知识库',
    href: 'https://www.bilibili.com/video/BV1SyoYBDEFK/',
    cover: '/bilibili-covers/karpathy-wiki.jpg',
  },
  {
    title: 'DeepSeek V4 发布，沉寂14个月，值不值得用？',
    href: 'https://www.bilibili.com/video/BV15FZFBiEmf/',
    cover: '/bilibili-covers/deepseek-v4.jpg',
  },
  {
    title: 'OpenAI Image 2.0 实测：AI 生图终于能直接干活了？',
    href: 'https://www.bilibili.com/video/BV1mc9YBuEir/',
    cover: '/bilibili-covers/openai-image-2.jpg',
  },
]

export function HomeDefault({
  initialTheme,
  posts,
  categories,
  navLinks,
  currentPage,
  totalPages,
  localWechatPosts,
  categorySlugMap,
}: HomeProps) {
  const latestPosts = posts.slice(0, 6)

  return (
    <div className="min-h-full flex flex-col bg-[#f7fbff] text-slate-900 [font-family:var(--font-rounded)]">
      <SiteHeader
        initialTheme={initialTheme}
        navLinks={navLinks}
        categories={categories}
      />

      <main className="relative flex-1 overflow-hidden">
        <section className="relative min-h-[calc(100vh-3.5rem)] px-4 sm:px-6">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-[-10rem] top-20 h-[34rem] w-[34rem] rounded-full bg-sky-300/45 blur-3xl" />
            <div className="absolute right-[-8rem] top-10 h-[36rem] w-[36rem] rounded-full bg-cyan-300/45 blur-3xl" />
            <div className="absolute bottom-[-14rem] left-1/2 h-[32rem] w-[50rem] -translate-x-1/2 rounded-full bg-blue-200/80 blur-3xl" />
          </div>

          <div className="relative mx-auto grid min-h-[calc(100vh-3.5rem)] max-w-7xl items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
            <div className="relative text-left">
              <div className="pointer-events-none absolute -inset-x-8 -inset-y-10 -z-10 rounded-[3rem] bg-sky-500/12 blur-3xl" />
              <h1 className="whitespace-nowrap text-[clamp(3.05rem,6.6vw,7.2rem)] font-black leading-[1.05] tracking-[-0.035em] text-[#0f4f78] [font-family:var(--font-display-rounded)] drop-shadow-[0_14px_24px_rgba(47,128,237,0.16)]">
                船长的<span className="text-[#ffd45a] drop-shadow-[0_10px_18px_rgba(255,190,64,0.45)]">角</span>落
              </h1>
              <p className="mt-8 max-w-2xl text-[clamp(1.35rem,2.4vw,2.4rem)] font-bold leading-tight tracking-normal text-[#16a6bd] [font-family:var(--font-display-rounded)] drop-shadow-[0_8px_16px_rgba(22,166,189,0.18)]">
                在内容的海面上，找到 AI 的航向
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <Link href="#videos" className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-200 transition hover:-translate-y-0.5">
                  看视频
                </Link>
                <Link href="/about" className="rounded-full border border-sky-100 bg-white/80 px-5 py-3 text-sm font-semibold text-sky-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-white">
                  关于我们
                </Link>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[32rem] lg:mr-0">
              <div className="absolute -left-8 top-12 h-28 w-28 rounded-[2rem] bg-cyan-300/25 blur-2xl" />
              <div className="absolute -right-6 bottom-14 h-36 w-36 rounded-full bg-sky-400/20 blur-2xl" />
              <div className="relative rounded-[3rem] border border-white/80 bg-white/65 p-4 shadow-[0_32px_100px_rgba(47,128,237,0.18)] backdrop-blur-xl">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2.4rem] bg-gradient-to-br from-sky-50 to-cyan-50">
                  <Image
                    src="/captain-avatar.png"
                    alt="船长头像"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-center">
                <div className="relative h-28 w-[21rem] sm:h-32 sm:w-[24rem]">
                  <Image src="/captain-logo.png" alt="船长的角落 logo" fill className="object-contain drop-shadow-[0_22px_45px_rgba(47,128,237,0.2)]" priority />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="intro" className="mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-28">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">About the Channel</p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                一个围绕 AI 内容持续输出的频道。
              </h2>
            </div>
            <p className="text-lg leading-9 text-slate-600">
              船长的角落关注 AI 工具、效率方法、趋势观察与创作实践。这里不是信息堆放处，而是一个帮助你在变化里找到方向的内容空间。
            </p>
          </div>
        </section>

        <section id="videos" className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">Video</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">近期视频</h2>
            </div>
            <p className="max-w-lg text-sm leading-7 text-slate-500">
              AI 工具实测、方法拆解和内容生产流程记录。
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {recentVideos.map((video) => (
              <Link
                key={video.href}
                href={video.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-[2rem] border border-sky-100 bg-white/85 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-100"
              >
                <div className="relative aspect-video overflow-hidden bg-slate-100">
                  <Image src={video.cover} alt={video.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-sky-800 shadow-sm">Bilibili</div>
                </div>
                <div className="p-6">
                  <h3 className="line-clamp-2 text-lg font-bold leading-snug text-slate-900 group-hover:text-sky-700">{video.title}</h3>
                  <p className="mt-3 text-sm font-semibold text-sky-700">去 B 站观看</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section id="articles" className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">Articles</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">公众号文章</h2>
            </div>
            <p className="max-w-lg text-sm leading-7 text-slate-500">
              来自本地公众号文章库，包含由 WeChat Converter 渲染后的图文内容。
            </p>
          </div>

          {localWechatPosts.length > 0 ? (
            <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
              {localWechatPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={post.href}
                  className="group overflow-hidden rounded-[2rem] border border-slate-100 bg-white/90 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-100"
                >
                  {post.coverImage && (
                    <div className="relative aspect-[16/9] overflow-hidden bg-sky-50">
                      <Image src={post.coverImage} alt={post.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="mb-3 flex items-center gap-2 text-xs text-slate-500">
                      <span className="rounded-full border border-sky-100 bg-sky-50 px-2.5 py-1 font-medium text-sky-700">公众号</span>
                      <time>{post.date}</time>
                    </div>
                    <h3 className="line-clamp-2 text-xl font-bold leading-snug text-slate-900 group-hover:text-sky-700">{post.title}</h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600">{post.summary}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : latestPosts.length === 0 ? (
            <div className="rounded-[2rem] border border-sky-100 bg-white/75 p-12 text-center shadow-sm">
              <Sparkles className="mx-auto h-8 w-8 text-sky-500" />
              <p className="mt-4 text-base font-bold text-slate-700">文章即将更新</p>
            </div>
          ) : (
            <>
              <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
                {latestPosts.map((post, index) => (
                  <article
                    key={post.slug}
                    className="group rounded-[2rem] border border-slate-100 bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                    style={{ animation: `fadeInUp 0.4s ease-out ${index * 0.05}s both` }}
                  >
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      {post.category && (() => {
                        const slug = categorySlugMap[post.category]
                        return slug ? (
                          <Link href={`/category/${slug}`} className="rounded-full border border-sky-100 bg-sky-50 px-2.5 py-1 font-medium text-sky-700">
                            {post.category}
                          </Link>
                        ) : (
                          <span className="rounded-full border border-sky-100 bg-sky-50 px-2.5 py-1 font-medium text-sky-700">{post.category}</span>
                        )
                      })()}
                      <time>{formatDate(post.published_at)}</time>
                    </div>
                    <h3 className="mt-4 line-clamp-2 text-xl font-bold leading-snug text-slate-900 group-hover:text-sky-700">
                      <Link href={`/${post.slug}`}>{post.title}</Link>
                    </h3>
                    {post.description && <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600">{post.description}</p>}
                  </article>
                ))}
              </div>
              {totalPages > 1 && <div className="mt-8"><Pagination currentPage={currentPage} totalPages={totalPages} basePath="/" /></div>}
            </>
          )}
        </section>

        <section id="future" className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24">
          <div className="grid gap-5 md:grid-cols-4">
            {channels.map((channel) => {
              const Icon = channel.icon
              return (
                <div key={channel.title} className="rounded-[2rem] border border-white bg-white/80 p-6 shadow-sm">
                  <Icon className="h-6 w-6 text-sky-600" />
                  <h3 className="mt-5 text-xl font-bold text-slate-950">{channel.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{channel.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        <section id="courses" className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 p-8 text-white shadow-2xl shadow-slate-200 sm:p-12">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sky-500/25 blur-3xl" />
            <div className="relative">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Courses</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">AI 内容创作课程</h2>
              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">
                系统拆解 AI 工具使用、内容生产流程、选题判断与个人知识库搭建方法。
              </p>
              <p className="mt-8 inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-950">敬请期待</p>
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24">
          <Link href="/contact" className="block rounded-[2.5rem] border border-sky-100 bg-white/85 p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-100 sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">Contact</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">联系与合作</h2>
            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600">
              商务合作、课程共创、内容转载与项目咨询，都可以从这里发起联系。
            </p>
          </Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
