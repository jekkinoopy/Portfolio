# 努比工作室 Portfolio — Codex 工作規範

> **每次對話開始、動任何檔案之前，必須先讀完本檔案與 `developer-rules/` 下所有檔案。**

---

## 🚫 Git 絕對禁止事項

**禁止在 sandbox（AI 執行環境）內執行任何 git 指令**，包含但不限於：

- `git add`
- `git commit`
- `git push`
- `git status`
- `git log`
- `git diff`

原因：在 sandbox 跑 git 會留下 `index.lock` 殘檔，導致站主本機 git 卡住。

### 正確做法

改完檔案後，在回覆結尾**主動、強制**附上以下格式讓站主自行執行：

```
git add .
git commit -m "type: 重點（15字以內）"
git push origin main
```

規則：
- type 只能用 `feat` / `fix` / `style` / `refactor` / `chore`
- **禁止 `&&`**（站主環境為 PowerShell，不支援）
- **一律 `git add .`**，不指定單檔

---

## 📋 改檔後必做

只要本次對話有任何改檔、寫 code、生成程式碼、調整結構，**不管使用者有沒有開口，都必須在回覆結尾附上 commit 指令**。

純聊天、觀念問答、無改檔操作 → 不附。

---

## 📄 新增頁面檢查清單

新增任何頁面前，先讀 `developer-rules/new-page-checklist.md`。

---

## 🌐 語言

與站主溝通一律使用**繁體中文**。

## Imported Claude Cowork project instructions
