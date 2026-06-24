---
description: 新增任何 HTML 頁面後的必做清單。
globs: "**/*.html"
alwaysApply: true
---

# 【新增頁面規範】建立 HTML 後必做三件事

每次新增任何 HTML 頁面（不論是否有 Nav 入口），完成後**強制、主動**執行以下三步，絕對不等使用者開口要：

## 1. 更新全站導覽

`z_misc/site-guide/index.html`

- 有 Nav 入口 → 加入「主選單樹」表格
- 無 Nav 入口（如 `z_misc/` 下的隱藏頁）→ 加入「站內其他 HTML」表格

## 2. 更新檔案結構文件

`z_notes/02_專案檔案結構.md`

- 在對應區塊（Nav 頁 or `z_misc/`）補上新檔路徑與說明

## 3. 在對話給出 commit 指令

格式遵照 `developer-rules/git-commit-required.md`：

```bash
git add .
git commit -m "type: 重點"
```
