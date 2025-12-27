# AI Chat API - DeepSeek Integration

這個 API 路由處理所有 AI 角色的對話回應，並將完整的對話歷史傳遞給 DeepSeek 大語言模型。

## 當前實現

✅ **已整合 DeepSeek API**

系統現在使用 DeepSeek Chat 模型來生成智能、上下文相關的回應。如果 API 調用失敗，會自動降級到基於關鍵字的智能回應選擇系統。

## API 端點

**POST** `/api/chat`

### 請求格式

```json
{
  "characterId": "gu-chengze",
  "messages": [
    {
      "id": "1",
      "text": "你好",
      "sender": "user",
      "timestamp": "2024-01-01T00:00:00.000Z"
    },
    {
      "id": "2",
      "text": "你好，有什麼事嗎？",
      "sender": "character",
      "timestamp": "2024-01-01T00:00:01.000Z"
    }
  ],
  "language": "zh-TW"
}
```

### 回應格式

```json
{
  "response": "角色生成的回應文字"
}
```

## 環境變數配置

在 `.env.local` 文件中配置：

```env
DEEPSEEK_API_KEY=your_deepseek_api_key_here
```

**重要**：`.env.local` 文件已加入 `.gitignore`，不會提交到 Git。在 Vercel 部署時，需要在 Vercel 的環境變數設定中添加 `DEEPSEEK_API_KEY`。

## DeepSeek API 整合詳情

### 使用的模型
- **模型**：`deepseek-chat`
- **API 端點**：`https://api.deepseek.com/v1/chat/completions`

### 系統提示詞

系統會根據角色自動生成提示詞，包含：
- 角色名稱和描述
- 性格特點（tsundere、sweet、intellectual、rebellious、gentle）
- 語言設定（繁體中文、簡體中文、英文）
- 說話風格指導

### 對話上下文處理

- **上下文長度**：傳遞最近 15 條訊息給 DeepSeek
- **訊息格式**：自動轉換為 `user`/`assistant` 角色格式
- **Token 限制**：`max_tokens: 200`（約 50-100 字回應）

### 參數設定

```typescript
{
  model: 'deepseek-chat',
  temperature: 0.7,      // 創造性平衡
  max_tokens: 200,        // 回應長度限制
  stream: false          // 非流式回應
}
```

## 錯誤處理與降級策略

1. **API 調用失敗**：自動降級到基於關鍵字的智能回應選擇
2. **API Key 未配置**：使用備用回應系統
3. **無效回應**：返回錯誤並使用備用系統
4. **網路錯誤**：記錄錯誤並使用備用系統

## 備用回應系統

當 DeepSeek API 不可用時，系統會使用 `generateContextualResponse` 函數：

- ✅ 關鍵字匹配（謝謝、對不起、想你等）
- ✅ 情緒檢測（正面/負面）
- ✅ 問題識別
- ✅ 避免重複回應
- ✅ 根據對話長度調整策略

## 角色個性支援

系統提示詞會根據角色個性自動調整：

- **tsundere（傲嬌）**：表面冷漠但實際關心
- **sweet（陽光）**：熱情、積極、正能量
- **intellectual（高冷）**：理性、學術性表達
- **rebellious（痞帥）**：隨性、不羈
- **gentle（溫柔）**：體貼、細心、照顧人

## 多語言支援

- **繁體中文 (zh-TW)**：預設語言
- **簡體中文 (zh-CN)**：自動識別
- **英文 (en)**：自動識別

系統會根據用戶的瀏覽器語言自動選擇回應語言。

## 優化建議

1. **對話歷史管理**：目前限制為最近 15 條訊息，可根據需要調整
2. **緩存系統提示**：角色描述可以緩存以減少 token 使用
3. **速率限制**：考慮添加速率限制以防止 API 濫用
4. **回應長度**：根據角色調整 `max_tokens` 參數
5. **溫度參數**：可根據角色個性調整 `temperature`（0.7 為平衡值）

## 測試

### 本地測試

1. 確保 `.env.local` 中有 `DEEPSEEK_API_KEY`
2. 啟動開發服務器：`npm run dev`
3. 訪問聊天頁面並發送訊息
4. 檢查控制台是否有錯誤

### 部署到 Vercel

1. 在 Vercel 項目設定中添加環境變數 `DEEPSEEK_API_KEY`
2. 重新部署項目
3. 測試 API 是否正常工作

## 監控與日誌

API 會記錄：
- DeepSeek API 調用錯誤
- 降級到備用系統的情況
- 無效回應的情況

檢查 Vercel 的函數日誌以查看詳細信息。

## 成本優化

- 限制對話歷史長度（15 條訊息）
- 限制回應長度（200 tokens）
- 使用非流式回應以減少連接時間
- 備用系統減少不必要的 API 調用
