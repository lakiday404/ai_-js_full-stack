# Claude Code CLI 接入 DeepSeek V4 API 完整教程

> **适用环境**：Windows 11 (23H2) + PowerShell  
> **最后更新**：2026年4月  
> **目标**：零基础完成 Claude Code CLI 安装，并通过 DeepSeek 兼容接口替代 Anthropic 原生 API，实现低成本 AI 编程助手。

---

## 一、前置环境要求

| 项目 | 版本要求 | 说明 |
|------|---------|------|
| 操作系统 | Windows 11 (23H2) | 其他 Windows 版本理论兼容 |
| Shell | PowerShell | ⚠️ **不支持 `&&` 操作符**，命令间用分号 `;` 分隔 |
| Node.js | v24.14.0+ | 需提前安装，官网 https://nodejs.org |
| npm | 11.9.0+ | 随 Node.js 一起安装 |

### 验证前置环境

```powershell
node --version
# 期望输出: v24.14.0 或更高

npm --version
# 期望输出: 11.9.0 或更高
```

> 如果未安装 Node.js，请先前往 https://nodejs.org 下载 LTS 版本安装。

---

## 二、安装 Claude Code CLI

### 2.1 执行安装

```powershell
npm install -g @anthropic-ai/claude-code
```

### 2.2 验证安装成功

```powershell
claude --version
```

**期望输出**：

```
2.1.119 (Claude Code)
```

> 版本号可能不同，只要输出包含 `Claude Code` 即表示安装成功。

---

## 三、获取 DeepSeek API Key

### 3.1 注册账号

1. 打开 DeepSeek 开放平台：**https://platform.deepseek.com**
2. 使用**国内手机号**注册（无需海外手机号）

### 3.2 充值余额

1. 登录后进入控制台
2. 选择**支付宝充值**（最低充几块钱即可开始使用）

### 3.3 创建 API Key

1. 进入 **API Keys** 页面
2. 点击 **创建 API Key**
3. 复制生成的 Key，格式为：`sk-xxxxxxxxxxxx`

> ⚠️ **重要**：API Key 只在创建时显示一次，请立即复制保存。丢失后需重新创建。

---

## 四、创建配置文件

### 4.1 核心原理

DeepSeek 提供了与 Anthropic API 格式**完全兼容**的接口地址：

```
https://api.deepseek.com/anthropic
```

通过修改 Claude Code 的配置，将 API 请求重定向到 DeepSeek，即可：

- **不需要**任何中间适配层或代理
- Claude Code 以为自己在调用 Anthropic API，实际请求发送到了 DeepSeek
- 完整支持流式输出、函数调用等核心特性

### 4.2 配置文件路径

```
C:\Users\<你的用户名>\.claude\settings.json
```

### 4.3 创建 .claude 目录

```powershell
if (-not (Test-Path "$env:USERPROFILE\.claude")) { New-Item -ItemType Directory -Path "$env:USERPROFILE\.claude" -Force }
```

### 4.4 写入配置文件

> ⚠️ **请将 `sk-你的DeepSeek API Key` 替换为你在第三步获取的真实 API Key。**

```powershell
$content = @'
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "sk-你的DeepSeek API Key",
    "ANTHROPIC_BASE_URL": "https://api.deepseek.com/anthropic",
    "ANTHROPIC_MODEL": "deepseek-chat",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "deepseek-reasoner",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "deepseek-chat",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "deepseek-chat",
    "CLAUDE_CODE_SUBAGENT_MODEL": "deepseek-chat",
    "CLAUDE_CODE_MAX_OUTPUT_TOKENS": "32000"
  },
  "permissions": {
    "allow": [],
    "deny": []
  }
}
'@
Set-Content -Path "$env:USERPROFILE\.claude\settings.json" -Value $content -Encoding UTF8
```

### 4.5 验证配置文件已写入

```powershell
Get-Content "$env:USERPROFILE\.claude\settings.json"
```

确认输出内容包含你的 API Key 和 DeepSeek 的 Base URL。

---

## 五、配置参数详解

| 参数 | 值 | 说明 |
|------|-----|------|
| `ANTHROPIC_AUTH_TOKEN` | `sk-你的Key` | DeepSeek API Key，用于身份认证 |
| `ANTHROPIC_BASE_URL` | `https://api.deepseek.com/anthropic` | **关键参数**！DeepSeek 提供的 Anthropic 兼容接口地址 |
| `ANTHROPIC_MODEL` | `deepseek-chat` | Claude Code 默认使用的模型 |
| `ANTHROPIC_DEFAULT_OPUS_MODEL` | `deepseek-reasoner` | 复杂推理任务使用的模型（更强但更贵） |
| `ANTHROPIC_DEFAULT_SONNET_MODEL` | `deepseek-chat` | 日常编码任务使用的模型（便宜够用） |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL` | `deepseek-chat` | 简单任务使用的模型 |
| `CLAUDE_CODE_SUBAGENT_MODEL` | `deepseek-chat` | 子代理（Sub-agent）使用的模型 |
| `CLAUDE_CODE_MAX_OUTPUT_TOKENS` | `32000` | 单次回复最大 Token 数，DeepSeek 最高支持 32000 |

---

## 六、模型选择策略

| 模型名称 | 特点 | 适用场景 | 价格 |
|----------|------|---------|------|
| `deepseek-chat` | 标准对话模型，响应快 | 日常编码、代码补全、简单问答 | 便宜 |
| `deepseek-reasoner` | 推理增强模型，思考更深入 | 复杂逻辑分析、架构设计、疑难 Bug | 较贵 |

**当前配置采用混合策略**：
- 日常编码 → `deepseek-chat`（Sonnet/Haiku 位）
- 复杂推理 → `deepseek-reasoner`（Opus 位）
- Claude Code 会根据任务复杂度自动选择对应模型

---

## 七、启动 Claude Code

### 7.1 启动命令

```powershell
claude
```

### 7.2 首次启动引导

首次启动会依次出现以下引导步骤：

1. **选择主题** → 推荐选择 `Dark mode`
2. **信任工作目录** → 选择 `Yes, I trust this folder`
3. 完成后进入交互式命令行界面，即可开始使用

### 7.3 验证 DeepSeek 接入成功

在 Claude Code 交互界面中输入任意问题，例如：

```
你好，请介绍一下你自己
```

**如果能正常回复**，说明 DeepSeek API 已成功接入。

> 如果报错，请检查：
> 1. API Key 是否正确粘贴（无多余空格）
> 2. DeepSeek 账户余额是否充足
> 3. 网络连接是否正常（能否访问 https://api.deepseek.com）

---

## 八、费用说明

| 项目 | 说明 |
|------|------|
| 注册门槛 | 国内手机号即可，无需海外手机号 |
| 充值方式 | 支付宝直接充值，无需虚拟信用卡 |
| 计费方式 | 按 Token 用量计费，价格约为 GPT 的 **1/10** |
| 日常开销 | 编码使用场景下，每月约 **几块钱到十几块钱** |

---

## 九、注意事项

### 9.1 安全相关

- ⚠️ 配置文件中包含 API Key，**绝对不要**上传到公开 Git 仓库
- 建议在项目的 `.gitignore` 中添加：
  ```
  .claude/
  ```

### 9.2 PowerShell 注意

- Windows PowerShell **不支持 `&&` 操作符**
- 多条命令串联请使用**分号 `;`** 分隔，例如：
  ```powershell
  cd C:\my-project; claude
  ```

### 9.3 常见问题排查

| 问题 | 排查方向 |
|------|---------|
| 启动后报认证错误 | 检查 API Key 是否正确、是否有多余空格或换行 |
| 请求超时 | 检查网络连接，尝试 `ping api.deepseek.com` |
| 余额不足提示 | 登录 DeepSeek 平台充值 |
| 配置不生效 | 确认配置文件路径为 `$env:USERPROFILE\.claude\settings.json`，重启 Claude Code |

---

## 十、可选：安装 Codex CLI（OpenAI）

如果后续还需要接入 OpenAI 的 Codex CLI：

```powershell
npm install -g @openai/codex
```

> **注意**：Codex 需要 OpenAI API Key，充值需要虚拟信用卡（Visa/MasterCard），可按需后续配置。

---

## 附录：完整操作命令速查

以下是从零开始的完整命令序列，可直接按顺序执行：

```powershell
# 1. 安装 Claude Code CLI
npm install -g @anthropic-ai/claude-code

# 2. 验证安装
claude --version

# 3. 创建配置目录
if (-not (Test-Path "$env:USERPROFILE\.claude")) { New-Item -ItemType Directory -Path "$env:USERPROFILE\.claude" -Force }

# 4. 写入配置文件（⚠️ 替换 sk-你的DeepSeek API Key 为真实 Key）
$content = @'
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "sk-你的DeepSeek API Key",
    "ANTHROPIC_BASE_URL": "https://api.deepseek.com/anthropic",
    "ANTHROPIC_MODEL": "deepseek-chat",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "deepseek-reasoner",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "deepseek-chat",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "deepseek-chat",
    "CLAUDE_CODE_SUBAGENT_MODEL": "deepseek-chat",
    "CLAUDE_CODE_MAX_OUTPUT_TOKENS": "32000"
  },
  "permissions": {
    "allow": [],
    "deny": []
  }
}
'@
Set-Content -Path "$env:USERPROFILE\.claude\settings.json" -Value $content -Encoding UTF8

# 5. 验证配置文件
Get-Content "$env:USERPROFILE\.claude\settings.json"

# 6. 启动 Claude Code
claude
```

---

> **文档结束** — 按照以上步骤操作，即可在 Windows 环境下通过 Claude Code CLI 使用 DeepSeek V4 API 进行 AI 辅助编程。
