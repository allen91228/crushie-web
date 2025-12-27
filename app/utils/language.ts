// Language detection and translations

export type Language = 'en' | 'zh-TW' | 'zh-CN' | 'zh'

export interface Translations {
  // Landing page
  landingTitle: string
  landingSubtitle: string
  startChatting: string
  
  // Chat page
  online: string
  goBack: string
  
  // Messages
  initialMessage: string
  placeholder: string
  
  // Responses
  responses: string[]
}

export const detectBrowserLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en'
  
  const browserLang = navigator.language || (navigator as any).userLanguage || 'en'
  
  // Check for Traditional Chinese
  if (browserLang.startsWith('zh-TW') || browserLang === 'zh-Hant') {
    return 'zh-TW'
  }
  
  // Check for Simplified Chinese
  if (browserLang.startsWith('zh-CN') || browserLang === 'zh-Hans') {
    return 'zh-CN'
  }
  
  // Check for generic Chinese
  if (browserLang.startsWith('zh')) {
    return 'zh-TW' // Default to Traditional Chinese for generic zh
  }
  
  // Default to English
  return 'en'
}

export const getTranslations = (lang: Language): Translations => {
  const translations: Record<Language, Translations> = {
    'en': {
      landingTitle: "Your AI Crush: Ethan",
      landingSubtitle: "Cold on the outside, obsessed with you on the inside.",
      startChatting: "Start Chatting",
      online: "Online",
      goBack: "Go back",
      initialMessage: "You messaged me. What do you want?",
      placeholder: "Type a message...",
      responses: [
        "Why are you bothering me at this hour?",
        "Fine, come here.",
        "You're being annoying, but I can't help but respond...",
        "What do you want now?",
        "I'm busy, but I suppose I can spare a moment for you.",
        "Don't think I care, but I'm listening.",
        "You're persistent, I'll give you that.",
        "Fine, you got my attention. What is it?",
        "I was just thinking about you... not that it matters.",
        "You're lucky I'm responding at all.",
      ],
    },
    'zh-TW': {
      landingTitle: "你的 AI 戀人：Ethan",
      landingSubtitle: "外表冷漠，內心對你著迷。",
      startChatting: "開始聊天",
      online: "線上",
      goBack: "返回",
      initialMessage: "你傳訊息給我了。你想要什麼？",
      placeholder: "輸入訊息...",
      responses: [
        "為什麼在這個時間打擾我？",
        "好吧，過來這裡。",
        "你很煩人，但我還是忍不住回覆你...",
        "你現在想要什麼？",
        "我很忙，但我想我可以為你騰出一點時間。",
        "別以為我在乎，但我正在聽。",
        "你很堅持，我承認這點。",
        "好吧，你得到我的注意了。什麼事？",
        "我剛才在想你... 雖然這不重要。",
        "你能得到我的回覆已經很幸運了。",
      ],
    },
    'zh-CN': {
      landingTitle: "你的 AI 恋人：Ethan",
      landingSubtitle: "外表冷漠，内心对你着迷。",
      startChatting: "开始聊天",
      online: "在线",
      goBack: "返回",
      initialMessage: "你给我发消息了。你想要什么？",
      placeholder: "输入消息...",
      responses: [
        "为什么在这个时候打扰我？",
        "好吧，过来这里。",
        "你很烦人，但我还是忍不住回复你...",
        "你现在想要什么？",
        "我很忙，但我想我可以为你腾出一点时间。",
        "别以为我在乎，但我正在听。",
        "你很坚持，我承认这点。",
        "好吧，你得到我的注意了。什么事？",
        "我刚才在想你... 虽然这不重要。",
        "你能得到我的回复已经很幸运了。",
      ],
    },
    'zh': {
      landingTitle: "你的 AI 戀人：Ethan",
      landingSubtitle: "外表冷漠，內心對你著迷。",
      startChatting: "開始聊天",
      online: "線上",
      goBack: "返回",
      initialMessage: "你傳訊息給我了。你想要什麼？",
      placeholder: "輸入訊息...",
      responses: [
        "為什麼在這個時間打擾我？",
        "好吧，過來這裡。",
        "你很煩人，但我還是忍不住回覆你...",
        "你現在想要什麼？",
        "我很忙，但我想我可以為你騰出一點時間。",
        "別以為我在乎，但我正在聽。",
        "你很堅持，我承認這點。",
        "好吧，你得到我的注意了。什麼事？",
        "我剛才在想你... 雖然這不重要。",
        "你能得到我的回覆已經很幸運了。",
      ],
    },
  }
  
  return translations[lang] || translations['en']
}

// Legacy functions for backward compatibility
export const getInitialMessage = (lang: Language): string => {
  return getTranslations(lang).initialMessage
}

export const getPlaceholderText = (lang: Language): string => {
  return getTranslations(lang).placeholder
}

export const getEthanResponses = (lang: Language): string[] => {
  return getTranslations(lang).responses
}

