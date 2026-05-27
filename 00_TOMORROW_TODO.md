# Tomorrow Checklist (Calendar Bag)

## Priority
- [ ] 補齊 `2021` 桌曆缺圖到 `images/graphic/calendarBag/2021c/`

## Missing Files (must add)
- [ ] `2021桌曆_07A.jpg` (or `.jpeg`)
- [ ] `2021桌曆_08B.jpg` (or `.jpeg`)
- [ ] `2021桌曆_10A.jpg` (or `.jpeg`)

## Current Status
- `calendar-2021` 清單已存在，但上述 3 張檔案目前不在資料夾內。
- 只要補檔到正確路徑，`graphic/calendar-bag.html` 再更新清單即可。

## After Files Are Added
1. 開啟 `graphic/calendar-bag.html`
2. 更新 `calendar-2021` 的 `images` 陣列（補上 07A / 08B / 10A）
3. 重新整理頁面檢查：
   - `calendar-bag.html#calendar-2021`
   - 手機單欄順序（A -> B）
4. Commit:
   - `git add .`
   - `git commit -m "fix: 補齊2021桌曆缺圖"`
   - `git push origin main`

## Note
- 檔名請維持既有命名規則：`2021桌曆_數字+面別`（例如 `07A`）。
