# Nook Skills：中文内容生产工作流

一套面向中文内容创作者的 Agent Skills，提供可重复调用的内容生产方法。

从选题判断、正文写作、逐字稿生产、标题生成、人工感审校、模板套用、图片处理，到发布前检查，每个环节都有固定流程和质量标准。

如果你只是想让 AI 直接写一篇文章，这套 skills 可能显得有点“慢”。但如果你希望长期稳定地产出公众号文章，并且每篇文章都有一致的价值判断、标题风格、模板结构和发布检查，它会很适合你。

## 它能做什么

- 帮你判断一篇公众号文章是否值得写。
- 帮你把素材整理成适合公众号阅读的中文长文。
- 帮你生成公众号标题、封面短标题和 YAML 标题字段。
- 帮你做“像不像真人写”的审校，减少空话、套话、AI 味。
- 帮你把卡兹克式活人感、花叔式流程感和自己的写作判断整合成可复用方法，而不是简单仿写某个人。
- 帮你套用固定公众号模板：关注引导、头图、字数预告、正文、尾部引导、尾图。
- 帮你判断是否需要插图，并把出图作为可选动作，而不是每次强行配图。
- 帮你梳理图片进入公众号后台的流程：本地图片、图床链接、Markdown 图片、公众号渲染。
- 帮你在发布前检查标题、摘要、图片、模板、正文结构是否完整。
- 帮你在公众号、短视频和小红书标题之间做跨平台改写。

## 它不是什么

- 它不是微信公众号官方接口封装。
- 它默认不负责自动同步草稿箱。
- 它不内置任何 AppID、AppSecret、访问令牌或图床密钥。
- 它不替你绕过微信公众号后台的限制。
- 它不保证所有第三方 Obsidian 插件长期兼容。

默认推荐流程是：在 Obsidian 或 Markdown 中写作，通过公众号排版插件渲染正文，然后手动复制到微信公众号后台。

如果你想进一步实现“一键同步到公众号草稿箱”，需要另外配置微信公众号开发者接口。这会涉及 AppID、AppSecret、接口权限、IP 白名单、素材上传和草稿箱 API。本仓库只把这件事作为进阶方案说明，不把它作为默认能力。

## 推荐环境

### 必需

- 一个支持本地 skills 的 Codex / Agent 环境。
- 能访问本仓库文件的本地目录。

### 推荐

- Obsidian：用于管理公众号稿件。
- WeChat Converter 或类似公众号排版插件：用于把 Markdown 渲染成适合公众号后台粘贴的格式。
- PicGo 或 PicList：用于把本地图片上传到图床。
- Cloudflare R2、对象存储或其他图床：用于给图片生成公网可访问链接。

### 可选

- AI 出图工具，或你自己的出图 skill。
- 微信公众号开发者接口配置，用于自动同步草稿箱。

## 第三方工具怎么理解

这套 skills 本身只负责“写作与流程判断”，第三方工具负责不同环节：

| 工具 | 作用 | 是否必需 |
| --- | --- | --- |
| Obsidian | 写作、管理 Markdown 稿件、维护模板 | 推荐 |
| WeChat Converter | 把 Markdown 渲染成公众号可粘贴的排版 | 推荐 |
| PicGo / PicList | 把本地图片上传到图床，并替换成图片链接 | 推荐 |
| Cloudflare R2 / 其他图床 | 存放图片，让公众号后台能读取图片 | 推荐 |
| 微信公众号开发者接口 | 自动上传素材、创建草稿箱 | 可选 |
| AI 出图工具 | 为文章生成插图 | 可选 |

最重要的一点是：公众号后台无法长期可靠地读取你电脑里的本地图片。为了让图片在复制到公众号后台后仍然显示，图片最好先变成公网图片链接。

推荐图片链路：

```text
本地图片或 AI 生成图片
-> PicGo / PicList 上传
-> 得到图床 URL
-> 写入 Markdown 图片语法
-> WeChat Converter 渲染
-> 复制到公众号后台正文
```

## 快速开始

### 1. 安装 skills

把本仓库克隆到本地，然后把 `skills/` 下需要的 skill 安装到你的 Codex skills 目录。不同 Agent 客户端安装方式可能不同，请以你当前客户端的 skill 安装说明为准。

你至少需要安装：

- `nook-wechat-writer`
- `nook-humanizer-zh-review`

其中 `nook-humanizer-zh-review` 是子审校 skill。公众号文章进入风格审校、去 AI 味、人味校验或 final polish 阶段时，`nook-wechat-writer` 会强制加载它做二次复检。

如果你仍在使用旧版拆分 skills，可以把对应关系理解为：

- `公众号写作` / `wechat-article-writing` -> `nook-wechat-writer`
- `标题写作` / `wechat-title-writing` -> `nook-wechat-writer` 的标题热词库与发布元信息流程
- `审校_降AI味` / `humanize-zh-review` -> `nook-humanizer-zh-review`
- `短视频写作` / `跨平台改写` -> `nook-wechat-writer/references/channel-adaptation.md`
- `khazix-writer` -> 保留为卡兹克个人风格来源；nook 只吸收其中可迁移的方法，详见 `creator-source-patterns.md`

逐字稿 skill 当前仍在草稿区，未来进入正式 `skills/` 后也应复用 `nook-humanizer-zh-review`。

### 2. 自定义公众号信息

开源仓库不会携带任何个人公众号信息。你需要把模板里的这些内容换成自己的：

- 公众号名称
- 关注引导文案
- 固定头图链接
- 固定尾图或二维码链接
- 尾部引导文案
- 图床域名
- 标题风格
- 文章价值判断标准

建议先打开：

- `templates/wechat-article-template.md`
- `skills/wechat-article-publishing/SKILL.md`
- `skills/wechat-article-writing/SKILL.md`

把其中的示例内容替换成你自己的公众号风格。

### 3. 配置 Obsidian 模板

如果你使用 Obsidian，可以把 `templates/wechat-article-template.md` 复制到你的 Obsidian 模板目录。

新建公众号文章时，建议稿件结构保持为：

```text
YAML
关注引导
固定头图
字数预告
导语
正文
固定尾部引导
固定尾图
```

推荐模板顺序：

```text
关注引导 -> 固定头图 -> 字数预告 -> 导语块 -> 正文 -> 固定尾部引导 -> 固定尾图
```

### 4. 配置图片上传

如果你希望图片复制到公众号后台后仍然正常显示，建议配置图床。

一种常见配置是：

```text
PicGo / PicList -> Cloudflare R2 -> 自定义域名 -> Markdown 图片链接
```

配置完成后，你在 Obsidian 中插入的图片应该尽量变成这种格式：

```markdown
![图片说明](https://你的图床域名/path/image.jpg)
```

如果图片仍然是本地路径，例如：

```markdown
![[local-image.png]]
```

或：

```markdown
![图片](C:\Users\name\Pictures\image.png)
```

复制到公众号后台时就可能无法正常显示。

### 5. 写公众号文章

触发 `wechat-article-writing` 后，Agent 应该先做价值判断，而不是马上写正文。

推荐流程：

1. 判断选题是否值得写。
2. 明确文章想帮读者解决什么问题。
3. 确认文章的核心判断。
4. 写正文。
5. 询问是否需要插图。
6. 如果需要插图，再调用你的出图工具或出图 skill。
7. 写完后调用审校 skill。
8. 套用公众号模板。

### 6. 生成标题

使用 `wechat-title-writing` 生成：

- 公众号后台标题
- YAML `title`
- YAML `summary`
- 封面短标题

注意：公众号后台通常不会自动读取 Markdown YAML。发布时你仍然需要把标题和摘要手动填入公众号后台对应位置。

### 7. 发布前检查

使用 `wechat-article-publishing` 做发布检查：

- 是否有 YAML。
- 标题是否明确。
- 摘要是否不是模板开头的“点击蓝字”。
- 固定头图和尾图是否存在。
- 字数预告是否合理。
- 图片是否为公网链接。
- 正文是否已经套模板。
- 是否存在本地路径、私密链接或临时文件名。

### 8. 复制到公众号后台

推荐手动发布流程：

1. 在 Obsidian 中打开文章。
2. 用 WeChat Converter 渲染公众号排版。
3. 复制渲染后的正文。
4. 粘贴到微信公众号后台编辑器。
5. 手动填写公众号标题。
6. 手动填写摘要，优先使用 YAML `summary`。
7. 检查图片是否显示。
8. 检查首图、尾图和正文结构。
9. 预览。
10. 发布或保存草稿。

已知限制：

- 正文排版和图片通常可以随渲染内容粘贴进去。
- 标题通常不会自动带入公众号后台。
- 摘要可能会被公众号后台自动抓取正文开头，因此要手动改成 YAML `summary`。

## 当前 skills 分工

本仓库是 nook 的统一 skill 仓库。历史上单独维护的 `nook-card`、`nook-tv-cover` 等 skill，后续统一收敛到本仓库的 `skills/` 目录。

### nook-wechat-writer

负责公众号文章主流程。它关心的是“这篇文章是否值得写、怎么写、写成什么样”。

核心原则：

- 先判断价值，再开始写。
- 不为了凑字数而写。
- 不把 AI 的正确废话当正文。
- 每篇文章都要有明确读者收益。
- 出图是可选动作，需要时才调用。

### legacy: wechat-title-writing

负责标题。它关心的是“读者为什么点开、标题是否承载文章判断”。

输出通常包括：

- 公众号标题
- YAML `title`
- YAML `summary`
- 封面短标题
- 备选标题

### legacy: humanize-zh-review

负责中文人工感审校。它关心的是“这篇文章是不是像一个具体的人写的”。

重点检查：

- 是否有 AI 味。
- 是否有空泛总结。
- 是否过度平滑。
- 是否缺少具体判断。
- 是否有不属于作者的表达习惯。

### nook-humanizer-zh-review

负责中文人工感和去 AI 味子审校。它不决定文章选题、标题、结构或发布格式，只在父 skill 进入风格审校、去 AI 味、人味校验或 final polish 阶段时作为强制子审校层使用。

重点检查：

- AI 套话和助手腔。
- 机械排比、假对比、三项凑整。
- 空泛总结、口号化结尾和虚假升华。
- 过度平滑、句长过于整齐、每段都像总结。
- 缺少具体锚点、真实细节、明确来源或作者判断。
- 假口语、戏剧化但不可信的案例。

它参考并本地化整合了 `Humanizer-zh` 的去 AI 痕迹方法，第三方来源保留在 `third_party/Humanizer-zh`，归因说明见 `skills/nook-humanizer-zh-review/ATTRIBUTION.md`。

调用边界：

- 公众号文章：`nook-wechat-writer` 保持上位规则，控制 intro、标题、自然段、正文格式和发布元信息。
- 逐字稿：`nook-video-transcript` 保持上位规则，控制可念性、气口、提词器格式和视频主线。
- humanizer 只做 AI 痕迹复检和局部重写建议，不反客为主。

### nook-card

负责把内容转成可交付的视觉卡片与 OpenDesign/Remotion 交付结构。它包含卡片规范、风格注册表、交互协议、模板和基础测试样例。

### nook-tv-cover

负责生成短视频、频道内容、电视感封面图的工作流。它包含封面流程、模型配置示例和风格参考资产。

### legacy: wechat-article-publishing

负责发布前流程。它关心的是“这篇文章能否顺利进入公众号后台”。

重点检查：

- 模板是否完整。
- 图片是否可访问。
- 标题和摘要是否准备好。
- 是否包含固定头图、尾图、关注引导。
- 是否误把本地路径、密钥、私人链接放进稿件。

## 对外介绍这套 skills

你可以这样介绍：

> Nook Skills 是一套中文公众号写作与发布流程 skills。把公众号文章生产拆成几个稳定步骤：选题判断、正文写作、标题生成、人工感审校、模板套用、图片图床处理和发布前检查。适合长期写公众号的人，把每篇文章都放进同一套质量标准和发布流程里。

也可以更短一点：

> 这是一套给中文公众号作者用的 Agent 工作流。它帮你把“写什么、怎么写、怎么起标题、怎么审校、怎么套模板、怎么粘进公众号后台”固定下来。

## 给使用者的交代

如果你把这个仓库发给别人，建议同时告诉他：

1. 先不要急着改代码，先读 README。
2. 这套东西默认是手动粘贴发布，不是自动发布。
3. 需要把模板里的公众号名称、头图、尾图、二维码、slogan 换成自己的。
4. 如果要让图片稳定进入公众号后台，必须配置图床。
5. 如果使用 R2，建议绑定自己的域名，不要直接依赖临时链接。
6. 如果要自动同步草稿箱，需要自己处理微信公众号接口权限和 IP 白名单。
7. 不要把 AppSecret、token、图床密钥提交到仓库。
8. YAML 里的标题和摘要是给写作流程使用的，发布时仍要手动检查公众号后台字段。
9. 这套 skills 的核心是让每次写作都有稳定流程。

## 目录结构

```text
nook-skills/
  README.md
  CONTRIBUTING.md
  skills/
    nook-card/
      SKILL.md
      DESIGN.md
      assets/
      references/
      tests/
    nook-tv-cover/
      SKILL.md
      README.md
      assets/
      references/
    nook-wechat-writer/
      SKILL.md
      references/
        nook-content-principles.md
        creator-source-patterns.md
        channel-adaptation.md
        wechat-production-workflow.md
        wechat-style-and-review.md
        open-source-safety-and-attribution.md
    nook-humanizer-zh-review/
      SKILL.md
      ATTRIBUTION.md
      references/
        anti-ai-review-checklist.md
        humanizer-zh-mapping.md
        wechat-adaptation.md
        video-adaptation.md
  third_party/
    Humanizer-zh/
      README.md
      SKILL.md
      LICENSE
  templates/
    wechat-article-template.md
```

## 第三方来源与归因

`nook-humanizer-zh-review` 的规则设计参考了 `Humanizer-zh` 的 AI 写作去痕思路。本仓库将原项目保留在：

```text
third_party/Humanizer-zh/
```

该目录用于保留来源、README、SKILL.md 和 MIT License。正式 nook skill 不把 Humanizer-zh 作为自身身份，而是把其中的检测维度蒸馏为 nook 场景可用的子审校规则。



本仓库默认不启用自动同步草稿箱。

如果你要做这件事，需要额外处理：

- 微信公众号 AppID
- 微信公众号 AppSecret
- 服务器 IP 白名单
- access_token 获取与刷新
- 图片素材上传
- 草稿箱创建接口
- 错误重试
- 敏感信息本地保存

对于多数个人写作者，推荐先使用：

```text
Obsidian 写作 -> WeChat Converter 渲染 -> 手动复制到公众号后台
```

这个流程稳定、可控，也更容易排查问题。

## 安全提醒

开源前请确认仓库中没有：

- AppSecret
- access_token
- API key
- 私人图床链接
- 本地绝对路径
- 未授权使用的图片
- 个人手机号、邮箱、地址等信息
- 私有公众号后台截图

## License

本项目使用 MIT License。你可以自由使用、修改和分发，但请自行承担具体发布流程、第三方平台限制和内容责任。
