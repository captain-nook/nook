# 船长的角落官网

「船长的角落」是云端心流旗下的 AI 内容频道官网。网站用于展示品牌、B 站视频、公众号文章、课程入口、关于我们与联系合作信息。

当前仓库是私有 GitHub 同步仓库：

- `https://github.com/captain-nook/yunduan_web1.0`

## 当前状态

线上访问地址：

- `https://yunduan-web1-0.moosa119129.workers.dev`

已完成 V1 网站骨架：

- 首页封面式 Hero：标题、slogan、头像、Logo
- 近期视频区：接入 3 条 B 站近期视频，封面已下载到本地
- 公众号文章区：自动读取本地公众号文章库 Markdown
- 公众号文章详情页：`/wechat/[slug]`
- 关于我们页面：`/about`
- 联系合作页面：`/contact`
- 后台入口：`/admin`
- 编辑器入口：`/editor`

## 内容来源

### 公众号文章

本地来源目录：

- `D:/MMDBB_vault/20 Areas/AI_Tech/公众号文章库`

读取逻辑：

- 读取最近 Markdown 文件
- 使用 frontmatter 中的 `publish_title` / `title`
- 使用 `publish_summary` / `summary`
- 跳过通用公众号头图，优先提取正文真实配图
- 本地 `assets/...` 图片会复制到 `public/wechat-assets/`
- 首页文章卡片链接到 `/wechat/[YYMMDD]`

核心实现：

- `lib/local-wechat-posts.ts`
- `app/wechat/[slug]/page.tsx`

### B 站视频

当前 3 条视频封面已下载到：

- `public/bilibili-covers/`

当前视频配置在：

- `components/themes/HomeDefault.tsx`

后续建议抽离为：

- `lib/site-videos.ts`

视频同步流程：

1. 提供 B 站视频链接或 BV 号
2. 通过 B 站接口读取标题和封面 `pic`
3. 用带 `User-Agent` 和 `Referer` 的请求下载封面
4. 存入 `public/bilibili-covers/`
5. 更新视频配置

## 本地开发

```bash
cd H:/antigravity/yunduan_web1.0
npm install
npm run dev
```

常用入口：

- 首页：`http://localhost:3000`
- 关于我们：`http://localhost:3000/about`
- 联系合作：`http://localhost:3000/contact`
- 管理后台：`http://localhost:3000/admin`
- 写新文章：`http://localhost:3000/editor?new=1`

## 新电脑继续工作

```bash
git clone https://github.com/captain-nook/yunduan_web1.0.git
cd yunduan_web1.0
npm install
npm run dev
```

注意：公众号文章库位于本机 vault：

- `D:/MMDBB_vault/20 Areas/AI_Tech/公众号文章库`

如果换电脑，需要同步或复制该目录，否则首页只能显示数据库文章或空状态。

## 常用命令

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 本地开发 |
| `npm run build` | 构建检查 |
| `npm run start` | 本地运行构建产物 |
| `npm run deploy` | 部署到 Cloudflare Workers |

## 技术栈

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- OpenNext for Cloudflare
- Cloudflare Workers / D1 / R2
- gray-matter / remark / remark-gfm / remark-html

## 当前注意事项

- `npm run build` 当前会出现 Cloudflare/Wrangler auth token 警告，但构建可以完成。
- 线上部署前需要配置 Cloudflare 资源、环境变量和正式域名。
- 不要把 `.env*`、密钥、Cloudflare secret 提交到仓库。
