# Git Commit Required

> 每次 AI 協作完成後，請執行下方 commit 指令。

---

## 本次變更（2026-06-24）

### 新增檔案

| 路徑 | 說明 |
|------|------|
| `z_misc/notes/index.html` | 閱讀札記草稿頁（隱藏，無 Nav 入口） |

### 修改檔案

| 路徑 | 說明 |
|------|------|
| `z_misc/site-guide/index.html` | 「站內其他 HTML」表格新增 `z_misc/notes/` 條目 |
| `z_notes/02_專案檔案結構.md` | `z_misc/` 目錄樹新增 `notes/index.html` 說明 |

---

## 建議 Commit Message

```
feat: 新增 Notes 閱讀札記草稿頁

- 建立 z_misc/notes/index.html（隱藏頁，無 Nav 入口）
- 版型：共鳴句為視覺核心，出處細字退場，tags 純文字
- 更新 z_misc/site-guide 全站導覽
- 更新 z_notes/02_專案檔案結構
```

---

## 執行指令

```bash
git add z_misc/notes/index.html
git add z_misc/site-guide/index.html
git add z_notes/02_專案檔案結構.md
git add z_notes/git-commit-required.md
git commit -m "feat: 新增 Notes 閱讀札記草稿頁"
git push
```

---

*確認 commit 後可刪除本檔，或留存作為變更紀錄。*
