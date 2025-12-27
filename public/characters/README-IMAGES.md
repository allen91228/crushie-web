# 圖片漸進式載入說明

為了實現快速載入效果，系統會自動使用縮略圖版本，然後再載入完整圖片。

## 縮略圖命名規則

對於每個圖片，需要創建一個縮略圖版本，命名規則為：在原檔名後加上 `-thumb` 後綴。

### 範例：

**完整圖片：**
- `GuCheng-ze.png` → 縮略圖：`GuCheng-ze-thumb.png`
- `GuCheng-ze大頭貼.png` → 縮略圖：`GuCheng-ze大頭貼-thumb.png`
- `LinXiang-yang.png` → 縮略圖：`LinXiang-yang-thumb.png`

## 縮略圖要求

- **尺寸**：建議為原圖的 10-20%（例如：原圖 1000px → 縮略圖 100-200px）
- **品質**：可以降低品質以減小檔案大小（建議 60-70% 品質）
- **格式**：與原圖相同格式（PNG、JPG 等）

## 如何生成縮略圖

### 方法 1：使用 ImageMagick（命令行）

```bash
# 安裝 ImageMagick（如果還沒安裝）
# macOS: brew install imagemagick
# Linux: sudo apt-get install imagemagick

# 生成縮略圖（調整為原圖的 15%）
convert GuCheng-ze.png -resize 15% GuCheng-ze-thumb.png

# 批量處理所有 PNG 圖片
for file in *.png; do
  convert "$file" -resize 15% "${file%.png}-thumb.png"
done
```

### 方法 2：使用線上工具

1. 使用 [Squoosh](https://squoosh.app/) 或 [TinyPNG](https://tinypng.com/)
2. 上傳原圖
3. 調整尺寸為原圖的 10-20%
4. 降低品質（60-70%）
5. 下載並命名為 `原檔名-thumb.png`

### 方法 3：使用 Photoshop / GIMP

1. 打開原圖
2. 調整圖片大小為原圖的 10-20%
3. 降低品質（60-70%）
4. 另存為 `原檔名-thumb.png`

## 檔案結構範例

```
public/characters/
├── GuCheng-ze.png              (完整大圖)
├── GuCheng-ze-thumb.png        (縮略圖)
├── GuCheng-ze大頭貼.png        (完整大頭貼)
├── GuCheng-ze大頭貼-thumb.png  (縮略大頭貼)
├── LinXiang-yang.png
├── LinXiang-yang-thumb.png
└── ...
```

## 注意事項

- 如果縮略圖不存在，系統會自動使用原圖（不會出錯）
- 縮略圖應該放在與原圖相同的目錄
- 建議縮略圖檔案大小 < 50KB 以實現快速載入

