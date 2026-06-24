---
description: 改檔後的 commit 規範、push 禁令與本機修復流程。
globs: "*"
alwaysApply: true
---

# 【Git 完整規範】commit 格式・push 禁令・修復流程

## Commit：改完必附

只要本次對話中**有任何改檔、寫 Code、生成程式碼、調整結構的任務完成**，在回覆結尾**必須、強制、主動**附上 commit 指令，絕對不准等使用者開口要！

> ⚠️ **死線警告**：若本次對話完全沒有改動任何檔案、純屬聊天或觀念問答，則「不必」附上。

**禁止**在 sandbox（AI 執行環境）內執行**任何** `git` 指令，包含 `git add`、`git status`、`git diff`、`git log`；一律只輸出指令，由站主在本機執行。在 sandbox 跑 git 會留下 `index.lock` 殘檔，導致站主本機 git 卡住。

### 輸出格式（一字不差）：

```bash
git add .
git commit -m "type: 重點"
git push origin main
```

| 項目 | 約定 |
|------|------|
| type | `feat`｜`fix`｜`style`｜`refactor`｜`chore` 五選一 |
| 重點 | **15 字以內**（標點計入） |
| add | **一律 `git add .`**，禁止只 add 單檔 |
| 串接 | **禁止 `&&`**（站主環境為 PowerShell，不支援） |

## Push：每次必附

- **`git push origin main` 一律附上**，讓站主一次複製全部指令執行。
- 修 push 失敗：只動本機（壓圖、`.gitignore`、`amend`／filter-branch **先問**）。
- GitHub 單檔 **> 100 MB** 拒 push。`*.png.bak` 已在根 `.gitignore` 保護，`git add .` 不會送進備份檔。
