# AI Chat API - LLM Integration Guide

這個 API 路由處理所有 AI 角色的對話回應，並將完整的對話歷史傳遞給大語言模型。

## 當前實現

目前使用基於關鍵字的智能回應選擇，會分析對話上下文來選擇最合適的回應。

## 整合真實 LLM API

### 步驟 1: 選擇 LLM 服務

支援的服務：
- OpenAI (GPT-4, GPT-3.5)
- Anthropic (Claude)
- Google (Gemini)
- 其他兼容 OpenAI API 格式的服務

### 步驟 2: 添加環境變數

在 `.env.local` 文件中添加：

```env
OPENAI_API_KEY=your_api_key_here
# 或
ANTHROPIC_API_KEY=your_api_key_here
```

### 步驟 3: 更新 API 路由

在 `app/api/chat/route.ts` 中，取消註釋並修改 `callLLMAPI` 函數：

```typescript
async function callLLMAPI(
  messages: ChatMessage[],
  character: Character,
  language: string
): Promise<string> {
  const systemPrompt = `You are ${character.name}, ${character.description}. 
    Your personality is: ${character.personality}.
    Respond in ${language === 'zh-TW' ? 'Traditional Chinese' : language === 'zh-CN' ? 'Simplified Chinese' : 'English'}.
    Stay in character and respond naturally based on the conversation history.
    Keep responses concise (under 100 words).`

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages.slice(-10), // Keep last 10 messages for context
      ],
      temperature: 0.7,
      max_tokens: 150,
    }),
  })

  const data = await response.json()
  return data.choices[0].message.content
}
```

然後在 `POST` 函數中調用：

```typescript
const response = await callLLMAPI(formattedMessages, character, language)
```

## 對話歷史處理

API 會自動：
1. 接收完整的對話歷史（所有之前的訊息）
2. 轉換為 LLM 格式（user/assistant roles）
3. 傳遞給 LLM 以生成上下文相關的回應
4. 保持角色個性和語言設定

## 優化建議

1. **限制對話歷史長度**：只傳遞最後 N 條訊息（例如 10-20 條）以節省 tokens
2. **緩存系統提示**：角色描述可以緩存，不需要每次都傳遞
3. **錯誤處理**：實現重試機制和降級策略
4. **速率限制**：防止 API 濫用

## 測試

在整合 LLM API 之前，當前實現已經可以：
- 根據對話上下文選擇回應
- 避免重複使用相同的回應
- 根據情緒和問題類型調整回應

