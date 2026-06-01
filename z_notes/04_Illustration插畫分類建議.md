# Illustration 插畫分類建議

> 你用過 **Painter · Photoshop · Illustrator · Procreate**，其中 **Procreate 最多**。  
> 現站 `illustration/index.html` 是**單一方格網**，hover 顯示 `#Procreate`；本筆記定：檔案怎麼收、標籤怎麼打、要不要依軟體拆頁。  
> 相關：`illustration/index.html` · `z_assets/images/illust/` · `z_assets/css/illustration.css`

---

## 一、原則（先記這三句）

1. **訪客看的是「作品」，不是「軟體教學」**——分類主軸用**內容**（角色、動物、食物…）；軟體用 **hover 標籤**（`#Procreate` 等）補充即可。  
2. **Procreate 當預設區**：多數檔直接進 `procreate/`；其餘三軟體各一資料夾，量少也沒關係。  
3. **一張作品只標一個「主軟體」**；有跨軟體再標第二個（見下文），不要四個都掛。

---

## 二、建議怎麼分（兩層，不要混在一起）

### A. 本機整理用——依「軟體 + 年份」（主力 Procreate）

```text
z_assets/images/illust/
├── procreate/              # 主力（你 70%+ 可在這）
│   ├── 2021/
│   ├── 2022/
│   ├── 2023/
│   └── 2024/
├── photoshop/              # PS 完成或 PS 比重高
├── illustrator/            # 向量、線稿、字標
├── painter/                # Painter 完成（你現有 pan/ 可併入或對應這裡）
├── _source/                # .procreate · .psd · .ai · Painter 檔，僅本機，不進 git
├── _export/                # 已裁切要上網的 JPG/PNG（可選）
└── _archive/               # 未命名、重複、暫不上站
```

**檔名習慣（可沿用）：** `YYYY_電繪_MMDD主題.jpg` 或 `主題.jpg`；**不必**在檔名寫軟體（軟體靠資料夾 + 網頁標籤）。

**`新增資料夾/pan/`：** 若裡面是 Painter 時期作品，整理時搬到 `painter/YYYY/`，避免和 Procreate 混在一起。

---

### B. 網站展示用——依「主題」篩選（已上線）

`illustration/index.html` 頂部有主題按鈕；每張卡 `data-theme="…"`，hover 顯示主題＋軟體。可分享連結：`illustration/#animal`。

| `data-theme` | 按鈕文字 | 放什麼 | 站上例子 |
|--------------|----------|--------|----------|
| `animal` | 動物 | 貓狗、鳥、怪獸、海洋生物 | 狐狸、梅花鹿、科基、水母 |
| `food` | 食物 | 甜點、水果、靜物小物 | 馬卡龍、起司、橘子、燈泡 |
| `holiday` | 節日賀卡 | 節慶、賀卡、祝福圖 | 中秋快樂 |
| `character` | 人物 | 少女、制服、旅行人物 | 水手服、志溶九份、帥哥 |
| `scene` | 氛圍場景 | 夢境、自然、偏背景 | 宇宙、夢境、火山、潛水 |

**新增作品時：**

1. 在 grid 加 `<article class="illus-item" data-theme="animal">`（五選一）。  
2. overlay 內加 `<span class="illus-overlay__theme">動物</span>`（文字對應上表）。  
3. 猶豫時看「畫面第一眼主角」；一張只打一個 theme。

**排序建議（單頁內）：** 新→舊，或動物／食物交錯；不必按主題分區塊排。

---

## 三、四種軟體：怎麼判斷、怎麼標

| 軟體 | 適合放什麼 | 網站 hover 標籤 | 備註 |
|------|------------|-----------------|------|
| **Procreate** | iPad 塗鴉、日常插畫、大部分完成稿 | `#Procreate` | **預設**；`.procreate` 原檔放 `_source/` |
| **Photoshop** | 合成、修圖、賀卡排版、筆刷後期、網格製圖 | `#Photoshop` | 若只在 PS 加字／調色，主畫仍 Procreate → 見下方「跨軟體」 |
| **Illustrator** | 向量線稿、Logo 化角色、春聯字、幾何平塗 | `#Illustrator` | 和 **Graphic**（商業平面）重疊時：委託／品牌案 → Graphic；個人創作 → Illustration |
| **Painter** | 仿水彩／油畫、厚塗、電繪板時期 | `#Painter` | 量少可集中一區展示，不必獨立整頁 |

### 單張「主軟體」判斷（快速）

```text
最後一次「從零畫到完成」在哪個 App？
├─ Procreate 畫完，只輸出 JPG ─────────────→ #Procreate
├─ Procreate 草稿 → PS 上色/合成完成 ────→ #Procreate · Photoshop（或主 PS 若 PS 改過半以上）
├─ Illustrator 描線/填色完成 ───────────→ #Illustrator
└─ Painter 畫完 ─────────────────────────→ #Painter
```

**跨軟體標籤（最多兩個）：**

- 例：Procreate 畫圖 + PS 調色 → `<span>#Procreate</span>` 為主，可再加 `<span class="illus-tag--secondary">#Photoshop</span>`（改版時再做樣式；現階段寫在一行：`#Procreate · PS` 也行）。  
- **不要**為了「用過」就標四個軟體。

---

## 四、和 Graphic 的界線（避免重複上架）

| 放 Illustration | 放 Graphic |
|-----------------|------------|
| 個人練習、角色、賀卡、粉專圖 | Logo、包裝、桌曆、DM、商業案場 |
| 同一隻 monster 當作品集插畫 | 同一案若已是客戶交付物 → Graphic 為主 |

不確定時：**偏可愛敘事、非商業交付** → Illustration。

---

## 五、現站 `illustration/index.html` 怎麼做（過渡期）

| 項目 | 建議 |
|------|------|
| 版面 | **維持單一 grid**（不必為 PS/AI/Painter 各開一頁） |
| hover | 每張改為**真實主軟體**；非 Procreate 的改掉一律 `#Procreate` |
| Procreate 居多 | 可設預設標籤 `#Procreate`，僅例外手改 |
| 主題篩選 | 已實作：`illus-filters` + `illustration.js`（`data-theme`） |
| 軟體篩選（選做） | 日後可加 `data-tool`：`全部 · Procreate · …` |
| 原檔 | `.procreate` / 大 `.psd` 不進 repo；只推 `_export/` 的 JPG |

**HTML 資料屬性（日後改版用）：**

```html
<article class="illus-item" data-tool="procreate" data-type="animal">
```

- `data-tool`：`procreate` | `photoshop` | `illustrator` | `painter`  
- `data-type`：`animal` | `food` | `holiday` | `character` | `scene`（選填，方便篩選）

---

## 六、上站前每張檢查

| 項目 | 建議 |
|------|------|
| 格式 | **JPG** 或 PNG（有透明再 PNG）；sRGB |
| 長邊 | **1600–2000 px**（方格網夠用；檔案別過大） |
| alt | 用作品主題（馬卡龍、中秋快樂），勿全寫「作品名稱」 |
| 張數 | 先精選 **30–50 張** 上線，其餘 `_archive` 再慢慢補 |

---

## 七、教學影片／書籍：要不要標參考？

**建議：要標，但不必每張都寫一大段。** 作品集目的是讓人看見你的能力與誠實；跟教學做的練習若完全不提，之後若被認出是某課程作業，反而傷害信任。

### 三種狀況（先分類再決定標不標）

| 狀況 | 說明 | 站上建議 |
|------|------|----------|
| **A. 跟做練習** | 構圖、角色、配色大半照教學逐步做 | **應標**參考；可考慮放「練習／跟畫」或不要當主打首頁 |
| **B. 技法學習** | 只學筆刷、光影、流程；主題與構圖是你自己的 | **建議標**「技法參考：…」即可，不必弱化作品 |
| **C. 原創** | 沒照特定章節完成 | **不用標** |

不確定時當 **A 或 B** 處理較安全。

### 標什麼、標在哪裡

**建議寫的內容（擇一或合併，一行就好）：**

- 來源類型：`教學影片`／`書籍`／`線上課程`
- 名稱：課程名、書名、作者或頻道（能辨識即可）
- （選）章節／單元：例如「第 3 堂：動物毛发」

**範例：**

- `參考：Procreate 官方教學〈Blend Modes〉`
- `跟畫練習 · YouTube／○○老師〈可愛動物〉`
- `技法參考：《數位插畫入門》光影章節`

**站上放哪裡（由低到高存在感）：**

1. **本機備忘**（`z_notes/` 或試算表：檔名 → 參考）— 最少改 HTML，先做起來  
2. **Hover 第二行**（在 `#Procreate` 下加小字「參考：…」）— 適合 A 類跟做  
3. **`data-ref` 屬性** + 篩選「練習／原創」— 訪客可選只看原創（日後改版）  
4. **頁尾一段話** — 例：「部分為學習用途跟畫，已於作品上標註參考。」

**不建議：**

- 每張都寫很長免責聲明  
- 把教學作品當成完全原創商業案例接案  
- 未經授權使用課程「範例檔」當成自己的 PSD 展示（檔案本身不要上傳）

### 和「主題篩選」的關係

- **主題**（動物／食物…）給訪客找風格。  
- **參考**（原創／跟畫）給訪客與你自己區分作品性質；兩者正交，可並存。  
- 若跟畫很多：之後可加第六個篩選 **「原創」** 或把 A 類集中放在 grid 最後。

### 本機記錄格式（建議）

在 `z_notes/` 或 `illust/_refs.md` 維護對照即可：

```text
檔名或作品名 | 類型 A/B/C | 參考來源（一行）
馬卡龍.jpg   | B          | 《○○》第 2 章筆刷
中秋快樂.jpg | A          | YouTube／○○ 中秋賀卡跟做
```

上站前把 **A 類** 的參考抄進 overlay 或記在備忘；**C 類** 不用動。

### 法律與禮貌（簡要）

- 個人作品集、非商用展示，標註來源主要是**誠實與禮貌**；具體是否侵權取決於跟做程度、是否商用等，有疑慮時以**標註 + 不要商用**最保守。  
- 此為一般整理建議，非法律意見。

---

## 八、之後改版 checklist

- [ ] 整理 `illust/` 資料夾：`procreate/` 為主，其餘三軟體分夾  
- [ ] 更正每張 hover 標籤（不要全部 #Procreate）  
- [x] `data-theme` + 頂部主題篩選（`illustration.js`）  
- [ ] （選）`data-tool` 軟體篩選  
- [ ] 更新 `z_misc/site-guide/index.html` Illustration 說明  
- [ ] 與 Graphic 重複的檔案只留一區  

---

## 九、一句話總結

**檔案按軟體分夾、Procreate 為主；網站一頁方格＋主題篩選；跟教學／書的畫標一行參考（A 必標、B 建議、C 不用）；新圖加 `data-theme`。**
