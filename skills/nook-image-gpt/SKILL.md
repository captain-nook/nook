# nook-image-gpt

通过中转站调用 GPT Image 2.0 生成图片的 MCP 工具。

MCP Server 代码位于独立的 **nook-mcp** 仓库：  
https://github.com/captain-nook/nook-mcp/tree/master/nook-image-gpt

## 依赖

本 skill 需要依赖 `nook-image-gpt` MCP Server，请先在 agent 中配置该 MCP，配置方法见 nook-mcp 仓库的 SKILL.md。

## Tool 参考

| 参数 | 必填 | 类型 | 默认值 | 说明 |
|------|------|------|--------|------|
| prompt | 是 | string | — | 生图提示词 |
| size | 否 | string | `1024x1024` | 分辨率 |
| n | 否 | number | 1 | 生成数量（最大 10） |
| save_to_dir | 否 | string | — | 保存为 PNG |

## 触发路由

| 场景 | tool |
|------|------|
| GPT Image 2.0（jarodfund 中转） | `generate_image` |

## 从其他 Skill 调用

```markdown
## 出图环节
1. 调用 `generate_image` tool（由 nook-image-gpt MCP 提供）
2. 使用返回的 base64 或文件路径嵌入后续环节
```

详细信息（分辨率表、多 agent 配置模板等）请移步 [nook-mcp/nook-image-gpt](https://github.com/captain-nook/nook-mcp/tree/master/nook-image-gpt)。
