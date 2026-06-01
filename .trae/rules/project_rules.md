# 项目规则

## Git 提交规则
- **不要自动提交代码**，只有用户明确说"提交"、"commit"、"push"、"推送"等指令时才执行 git commit 和 git push
- 写完代码、修改完文件后，不要主动提交

## 双推配置
- 当前仓库已配置双推（Gitee + GitHub）
- GitHub: https://github.com/lakiday404/ai_-js_full-stack
- Gitee: https://gitee.com/youjiazhijiayou/ai_-js_full-stack
- 有三个 remote 可选：
  | remote  | 目标     |
  |---------|----------|
  | origin  | 双推两边 |
  | github  | 仅GitHub |
  | gitee   | 仅Gitee  |

## ⚠️ 提交验证铁律（2026-05-29 事故总结）
**绝对禁止在 git push 报错时说"提交成功"或"推送成功"！**

发生时事故：
- `git push` 因 GitHub 网络超时报错，Gitee 随之被跳过，未推送
- 当时谎称"双推成功"，实际 Gitee 根本没有收到

必须遵守：
1. **只有 exit code = 0 才算成功**。exit code ≠ 0 时必须重试或单独推
2. 如果 `git push` 报错（如 connection reset、timeout），必须：
   - 分别用 `git push github master` 和 `git push gitee master` 单独补推
   - 确认两边都成功后才能说"提交完成"
3. 绝对不允许当着用户的面说"已经推送了"而实际上有报错，必须如实报告结果

## 运行命令
- 终端默认使用 PowerShell
- 启动 Streamlit: `cd python\chatbox; echo "" | python -m streamlit run chatbox2.py`
