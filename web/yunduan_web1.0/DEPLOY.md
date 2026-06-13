# 船长的角落 部署指南

当前项目使用 `OpenNext + Cloudflare Workers` 部署。

线上地址：

- `https://yunduan-web1-0.moosa119129.workers.dev`

Cloudflare 资源：

- Worker：`yunduan-web1-0`
- D1：`yunduan-web1-0-db`
- R2：`yunduan-web1-0-images`

私有仓库：

- `https://github.com/captain-nook/yunduan_web1.0`

## 1. 本地开发

```bash
npm install
npm run dev
```

本地入口：

- 首页：`http://localhost:3000`
- 关于我们：`http://localhost:3000/about`
- 联系合作：`http://localhost:3000/contact`
- 管理后台：`http://localhost:3000/admin`
- 编辑器：`http://localhost:3000/editor`

## 2. 首次部署准备

### 2.1 安装依赖和环境变量

```bash
npm install
cp .env.example .env.local
```

至少填写：

```env
ADMIN_PASSWORD=change-me
ADMIN_TOKEN_SALT=change-me-to-a-random-string
AI_CONFIG_ENCRYPTION_SECRET=change-me-to-another-random-string
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

注意：不要把 `.env*`、密钥、Cloudflare secret 提交到仓库。

### 2.2 登录 Cloudflare

```bash
npx wrangler login
```

### 2.3 初始化资源

```bash
npm run cf:init -- --site-url=https://your-domain.com
```

如果还要启用公共缓存 KV：

```bash
npm run cf:init -- --site-url=https://your-domain.com --with-kv
```

这一步会生成本地的 `wrangler.local.toml`，并自动写入真实 D1 / R2 / KV 绑定。

### 2.4 设置 secrets

```bash
npx wrangler secret put ADMIN_PASSWORD -c wrangler.local.toml
npx wrangler secret put ADMIN_TOKEN_SALT -c wrangler.local.toml
npx wrangler secret put AI_CONFIG_ENCRYPTION_SECRET -c wrangler.local.toml
```

如需外部 AI：

```bash
npx wrangler secret put AI_API_KEY -c wrangler.local.toml
```

### 2.5 生成类型并部署

```bash
npm run cf-typegen
npm run build
npm run deploy
```

## 3. 本地 Worker 预览

```bash
npm run preview
```

脚本会优先读取 `wrangler.local.toml`。模板仓库里的 `wrangler.toml` 不带真实资源绑定，不能直接拿来部署生产。

## 4. 日常更新

```bash
git pull
npm install
npm run build
npm run deploy
```

## 5. 内容同步注意事项

### 5.1 公众号文章

项目当前会读取本地公众号文章库：

```text
D:/MMDBB_vault/20 Areas/AI_Tech/公众号文章库
```

如果换电脑后路径不同，需要修改：

```text
lib/local-wechat-posts.ts
```

### 5.2 B 站封面

B 站视频封面当前使用本地文件：

```text
public/bilibili-covers/
```

新增视频时，需要先下载封面到该目录，再更新首页视频配置。

## 6. 常见问题

### `npm run build` 出现 Wrangler auth token 警告

通常与 Cloudflare 登录状态有关。先确认构建是否最终完成；如果部署阶段失败，再执行：

```bash
npx wrangler login
```

### `npm run deploy` 报缺少 D1 或 R2

先执行：

```bash
npm run cf:init -- --site-url=https://your-domain.com
```

### 后台登录提示鉴权未配置完成

至少补齐：

```bash
npx wrangler secret put ADMIN_PASSWORD -c wrangler.local.toml
npx wrangler secret put ADMIN_TOKEN_SALT -c wrangler.local.toml
```

### AI Provider 已保存的 Key 无法解密

通常是 `AI_CONFIG_ENCRYPTION_SECRET` 或 `ADMIN_TOKEN_SALT` 被改了。建议固定 `AI_CONFIG_ENCRYPTION_SECRET`，不要和 token salt 复用。

### RSS / sitemap / canonical 指向错域名

检查：

- `.env.local`
- `wrangler.local.toml`

## 7. 当前部署适配记录

- Cloudflare Workers 使用 `next build --webpack`，避免 Turbopack 构建产物在 Workers 运行时出现 chunk 加载问题。
- 线上 Worker 不能读取本机 `D:/...` vault 路径，所以当前公众号 Markdown 已打包到 `content/wechat-posts/`，并由 `lib/bundled-wechat-posts.ts` 提供线上读取。
- 本地如需改回直接读取 vault，可设置 `WECHAT_POSTS_DIR` 环境变量。
- `wrangler.local.toml` 包含线上资源绑定，属于本机部署配置，不提交 GitHub。
