# Git push 被擋檔案（本機路徑）

> GitHub 單檔上限 **100MB**；建議 <50MB。以下檔案**僅留本機**，不進 repo。  
> 網站實際用的是 `z_assets/images/uiux/星塵領域/`（jpg），**不是**此資料夾。

根目錄：`d:\Developer\projects\Portfolio\`

## 導致 push 失敗（>100MB）

| 大小 | 路徑 |
|------|------|
| **143.32 MB** | `z_assets/images/uiux/FR-星塵領域/素材/050621/5421832.psd` |

## GitHub 警告（>50MB，仍可能 push 失敗若與大檔同批）

| 大小 | 路徑 |
|------|------|
| 86.75 MB | `z_assets/images/uiux/FR-星塵領域/素材/9736280.psd` |
| 71.61 MB | `z_assets/images/uiux/FR-星塵領域/素材/5421717.psd` |

## 同資料夾其餘 PSD（本機保留）

| 大小 | 路徑 |
|------|------|
| 26.77 MB | `z_assets/images/uiux/FR-星塵領域/素材/f8a224bd-393d-4a7c-a052-c261f1408b7f.psd` |
| 23.78 MB | `z_assets/images/uiux/FR-星塵領域/素材/13c94d56-569f-40c8-a602-44c6c6413e3b.psd` |
| 21.71 MB | `z_assets/images/uiux/FR-星塵領域/素材/3706989.psd` |
| 10.21 MB | `z_assets/images/uiux/FR-星塵領域/素材/d4181e56-2055-4015-98ba-d2a8d99e5d01.psd` |

## 處理方式

- `.gitignore` 已排除：`*.psd`、`z_assets/images/uiux/FR-星塵領域/`
- 已從未推送的 commit 歷史移除該資料夾（本機檔案不刪）
