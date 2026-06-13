import Link from 'next/link'
import { Mail, MessageCircle, Send } from 'lucide-react'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'

export const metadata = {
  title: '联系合作',
  description: '船长的角落商务合作、课程共创、内容转载与项目咨询入口。',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#f7fbff] text-slate-900 [font-family:var(--font-rounded)] flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[-8rem] top-16 h-[28rem] w-[28rem] rounded-full bg-sky-200/45 blur-3xl" />
            <div className="absolute right-[-10rem] top-6 h-[30rem] w-[30rem] rounded-full bg-cyan-200/40 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-7xl">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-sky-600">Contact</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-black tracking-tight text-slate-950 sm:text-7xl [font-family:var(--font-display-rounded)]">
              联系与<span className="text-[#f2b84b]">合作</span>
            </h1>
            <p className="mt-8 max-w-3xl text-xl leading-10 text-slate-600">
              如果你希望进行商务合作、课程共创、内容授权、AI 工具共创或项目咨询，可以从这里开始沟通。
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
          <div className="grid gap-5 lg:grid-cols-3">
            {[
              [Mail, '商务合作', '品牌合作、工具测评、内容共创、活动合作。'],
              [MessageCircle, '课程与咨询', 'AI 内容生产、知识库搭建、团队效率工作流。'],
              [Send, '内容转载', '文章转载、视频引用、课程素材授权。'],
            ].map(([Icon, title, text]) => {
              const IconComp = Icon as typeof Mail
              return (
                <div key={title as string} className="rounded-[2rem] border border-sky-100 bg-white/85 p-7 shadow-sm">
                  <IconComp className="h-7 w-7 text-sky-600" />
                  <h2 className="mt-5 text-2xl font-black text-slate-950">{title as string}</h2>
                  <p className="mt-4 text-base leading-8 text-slate-600">{text as string}</p>
                </div>
              )
            })}
          </div>

          <div className="mt-8 rounded-[2.5rem] bg-slate-950 p-8 text-white shadow-2xl shadow-slate-200 sm:p-12">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-cyan-300">Next Step</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">合作入口正在整理中</h2>
            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">
              后续这里会接入公众号、B 站主页、邮箱、微信或企微二维码。当前可先通过项目维护者补充正式联系方式。
            </p>
            <Link href="/" className="mt-8 inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-950">返回首页</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
