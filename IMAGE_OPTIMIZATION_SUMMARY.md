# 圖片載入速度優化總結

## 優化內容

### 1. Landing Page - "Meet the Characters" 區塊

**優化策略：**
- ✅ **第一張圖片（Ethan）**：添加 `priority` 屬性，優先載入首屏可見圖片
- ✅ **第二、三張圖片（Lucas, Ray）**：使用 `loading="lazy"`，延遲載入非首屏圖片
- ✅ **所有圖片**：設置 `quality={85}`，平衡畫質和檔案大小
- ✅ **sizes 屬性優化**：從 `(max-width: 768px) 100vw, 33vw` 改為 `(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw`，更精確的響應式尺寸

### 2. Avatar 組件優化

**改進：**
- ✅ 添加 `priority` 屬性支持，關鍵頭像可優先載入
- ✅ 設置 `quality={75}`，頭像較小，適當降低品質以加快載入
- ✅ 非優先頭像使用 `loading="lazy"`，延遲載入
- ✅ ChatHeader 中的頭像設置 `priority={true}`，優先載入

### 3. CharacterSelector 組件

**優化：**
- ✅ 保持 `priority` 屬性（已在第一屏顯示）
- ✅ 添加 `quality={85}`，平衡畫質和速度
- ✅ 優化 `sizes` 屬性為 `(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw`

### 4. Next.js 圖片配置優化

**next.config.js 改進：**
- ✅ 增加 `minimumCacheTTL` 從 60 秒到 7 天（604800 秒），減少重複請求
- ✅ 已配置 WebP 和 AVIF 格式支持
- ✅ 已配置適當的設備尺寸和圖片尺寸

## 優化效果預期

### 載入速度提升：
1. **首屏載入**：優先載入關鍵圖片，減少 Largest Contentful Paint (LCP)
2. **非首屏圖片**：延遲載入，減少初始載入時間
3. **緩存策略**：7 天緩存減少重複下載
4. **圖片格式**：自動轉換為 WebP/AVIF，檔案更小

### 性能指標改善：
- ⚡ **LCP（Largest Contentful Paint）**：首屏圖片優先載入，改善 LCP
- ⚡ **FCP（First Contentful Paint）**：減少初始載入的圖片數量
- ⚡ **帶寬使用**：延遲載入非可見圖片，節省帶寬
- ⚡ **用戶體驗**：關鍵內容更快顯示

## 技術細節

### Priority 載入
- 用於首屏可見的關鍵圖片
- 瀏覽器會優先下載這些圖片
- 適用於：第一張角色卡片、ChatHeader 頭像、CharacterSelector

### Lazy Loading
- 用於非首屏圖片
- 當圖片進入視窗時才開始載入
- 適用於：第二、三張角色卡片、聊天訊息中的頭像

### Quality 設置
- **85%**：用於大圖（角色卡片），平衡畫質和檔案大小
- **75%**：用於小圖（頭像），檔案更小，載入更快

### Sizes 優化
- 更精確的響應式尺寸提示
- 幫助瀏覽器選擇合適的圖片尺寸
- 減少不必要的圖片下載

## 進一步優化建議（可選）

1. **圖片壓縮**：考慮使用工具如 `sharp` 或 `imagemin` 壓縮原始 PNG 檔案
2. **CDN 部署**：使用 CDN 加速圖片載入
3. **圖片預加載**：對於關鍵路徑，可以考慮使用 `<link rel="preload">`
4. **漸進式載入**：考慮添加 blur placeholder

## 注意事項

- 圖片檔案較大（4-5MB），建議後續考慮壓縮原始圖片
- Quality 設置已平衡畫質和速度，可根據需要調整
- Priority 圖片數量建議控制在 2-3 張以內

