'use client'

import type { Theme } from '@/lib/appearance'
import type { PostWithTags } from '@/lib/db'
import type { SiteCategoryLink, SiteNavLink } from '@/lib/site'
import type { LocalWechatPost } from '@/lib/local-wechat-posts'
import { HomeDefault } from '@/components/themes/HomeDefault'

export type { Theme }

export interface HomeProps {
  initialTheme: Theme
  posts: PostWithTags[]
  categories: SiteCategoryLink[]
  navLinks: SiteNavLink[]
  currentPage: number
  totalPages: number
  localWechatPosts: LocalWechatPost[]
  categorySlugMap: Record<string, string>
}

export function HomeClient(props: HomeProps) {
  return <HomeDefault {...props} />
}
