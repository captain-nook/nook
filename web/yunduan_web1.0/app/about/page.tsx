import Image from 'next/image'
import Link from 'next/link'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'

export const metadata = {
  title: '关于我们',
  description: '关于船长的角落与云端心流。',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f7fbff] text-slate-900 [font-family:var(--font-rounded)] flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[-10rem] top-10 h-[30rem] w-[30rem] rounded-full bg-sky-200/45 blur-3xl" />
            <div className="absolute right-[-8rem] top-20 h-[28rem] w-[28rem] rounded-full bg-cyan-200/40 blur-3xl" />
          </div>
          <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-sky-600">About</p>
              <h1 className="mt-5 text-5xl font-black tracking-tight text-slate-950 sm:text-7xl [font-family:var(--font-display-rounded)]">
                关于船长的<span className="text-[#f2b84b]">角</span>落
              </h1>
              <p className="mt-8 max-w-3xl text-xl leading-10 text-slate-600">
                船长的角落是云端心流旗下的 AI 内容频道，关注 AI 工具、内容创作、个人知识管理与效率方法。我们希望把快速变化的技术，讲成普通人能理解、能判断、能使用的内容。
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link href="/#videos" className="rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-slate-200">看近期视频</Link>
                <Link href="/contact" className="rounded-full border border-sky-100 bg-white/80 px-5 py-3 text-sm font-bold text-sky-800 shadow-sm">联系合作</Link>
              </div>
            </div>
            <div className="mx-auto w-full max-w-md">
              <div className="relative rounded-[3rem] border border-white/80 bg-white/70 p-4 shadow-[0_32px_100px_rgba(47,128,237,0.18)] backdrop-blur-xl">
                <div className="relative aspect-square overflow-hidden rounded-[2.4rem] bg-gradient-to-br from-sky-50 to-cyan-50">
                  <Image src="/captain-logo.png" alt="船长的角落 logo" fill className="object-contain p-10" priority />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              ['我们关注什么', 'AI 工具变化、内容生产流程、知识库搭建、个人效率系统，以及普通人如何在 AI 时代建立自己的判断。'],
              ['我们怎么表达', '不堆概念，不追求玄学式宏大叙事，而是用真实案例、可复用方法和清楚的边界，把问题讲明白。'],
              ['我们面向谁', '内容创作者、知识工作者、创业团队，以及任何想把 AI 真正用进工作和生活的人。'],
            ].map(([title, text]) => (
              <div key={title} className="rounded-[2rem] border border-sky-100 bg-white/85 p-7 shadow-sm">
                <h2 className="text-2xl font-black text-slate-950">{title}</h2>
                <p className="mt-4 text-base leading-8 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
