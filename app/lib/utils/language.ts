// Language detection and translations

export type Language = 'en' | 'zh-TW' | 'zh-CN' | 'zh'

export interface Translations {
  // Landing page
  landingTitle: string
  landingSubtitle: string
  startChatting: string
  selectCharacter: string
  chooseYourCrush: string
  confirmAge18: string
  
  // Features
  featuresTitle: string
  feature1Title: string
  feature1Desc: string
  feature2Title: string
  feature2Desc: string
  feature3Title: string
  feature3Desc: string
  
  // FAQ
  faqTitle: string
  faq1Question: string
  faq1Answer: string
  faq2Question: string
  faq2Answer: string
  faq3Question: string
  faq3Answer: string
  
  // Footer
  privacyPolicy: string
  termsOfService: string
  allRightsReserved: string
  
  // Chat page
  online: string
  goBack: string
  
  // Messages
  initialMessage: string
  placeholder: string
  
  // Responses
  responses: string[]
  
  // Meet the Characters section
  meetCharactersTitle: string
  chatNow: string
  character1Name: string
  character1Tag: string
  character1Quote: string
  character2Name: string
  character2Tag: string
  character2Quote: string
  character3Name: string
  character3Tag: string
  character3Quote: string
  
  // Love Stories / Blog section
  loveStoriesTitle: string
  readMore: string
}

export const detectBrowserLanguage = (): Language => {
  if (typeof window === 'undefined') return 'zh-TW'
  
  const browserLang = navigator.language || (navigator as any).userLanguage
  
  // If no language detected, default to Traditional Chinese
  if (!browserLang) {
    return 'zh-TW'
  }
  
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
  
  // Check for English
  if (browserLang.startsWith('en')) {
    return 'en'
  }
  
  // Default to Traditional Chinese if language is unclear
  return 'zh-TW'
}

export const getTranslations = (lang: Language): Translations => {
  const translations: Record<Language, Translations> = {
    'en': {
      landingTitle: "Your AI Crush",
      landingSubtitle: "Choose your perfect match and start chatting",
      startChatting: "Start Chatting",
      selectCharacter: "Select Character",
      chooseYourCrush: "Choose Your Crush",
      confirmAge18: "I am 18 years or older",
      featuresTitle: "Why Choose Crushie?",
      feature1Title: "24/7 AI Companionship",
      feature1Desc: "Your AI companion is always available, ready to chat whenever you need someone to talk to, day or night.",
      feature2Title: "Personalized Memory System",
      feature2Desc: "Our AI remembers your conversations and preferences, creating a more meaningful and personalized experience over time.",
      feature3Title: "Immersive Roleplay Experience",
      feature3Desc: "Engage in deep, immersive conversations with unique AI characters, each with their own personality and backstory.",
      faqTitle: "Frequently Asked Questions",
      faq1Question: "Is this free?",
      faq1Answer: "Yes! Crushie Web is completely free to use. You can chat with any of our AI characters without any cost.",
      faq2Question: "How does the AI work?",
      faq2Answer: "Our AI uses advanced natural language processing to understand and respond to your messages, creating realistic and engaging conversations.",
      faq3Question: "Can I chat with multiple characters?",
      faq3Answer: "Absolutely! You can switch between different characters at any time. Each character has their own unique personality and conversation style.",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      allRightsReserved: "All rights reserved.",
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
      meetCharactersTitle: "Choose Your Perfect Match",
      chatNow: "Chat Now",
      character1Name: "顧承澤",
      character1Tag: "Dominant CEO",
      character1Quote: "You're still up at this hour? Send me your address. I've ordered you some food.",
      character2Name: "蘇墨",
      character2Tag: "Intellectual Perfection",
      character2Quote: "According to the dopamine secretion curve, I hypothesize that my current accelerated heartbeat is not a physiological pathology, but because I saw you.",
      character3Name: "雷杰",
      character3Tag: "Bad Boy",
      character3Quote: "Hey, what's got you down? Who said you could cry? Come on, hop on. I'll take you for a ride.",
      loveStoriesTitle: "Latest from the Heart",
      readMore: "Read More",
    },
    'zh-TW': {
      landingTitle: "你的 AI 戀人",
      landingSubtitle: "選擇你的完美配對，開始聊天",
      startChatting: "開始聊天",
      selectCharacter: "選擇角色",
      chooseYourCrush: "選擇你的戀人",
      confirmAge18: "我已滿18歲",
      featuresTitle: "為什麼選擇 Crushie？",
      feature1Title: "24/7 AI 陪伴",
      feature1Desc: "你的 AI 伴侶隨時都在，無論白天或夜晚，當你需要有人聊天時，隨時準備好與你對話。",
      feature2Title: "個人化記憶系統",
      feature2Desc: "我們的 AI 會記住你的對話和偏好，隨著時間創造更深刻、更個人化的體驗。",
      feature3Title: "沉浸式角色扮演體驗",
      feature3Desc: "與獨特的 AI 角色進行深入、沉浸式的對話，每個角色都有自己的個性和背景故事。",
      faqTitle: "常見問題",
      faq1Question: "這是免費的嗎？",
      faq1Answer: "是的！Crushie Web 完全免費使用。你可以與任何 AI 角色聊天，無需任何費用。",
      faq2Question: "AI 是如何運作的？",
      faq2Answer: "我們的 AI 使用先進的自然語言處理技術來理解和回應你的訊息，創造真實且引人入勝的對話。",
      faq3Question: "我可以和多個角色聊天嗎？",
      faq3Answer: "當然可以！你可以隨時在不同角色之間切換。每個角色都有自己獨特的個性和對話風格。",
      privacyPolicy: "隱私政策",
      termsOfService: "服務條款",
      allRightsReserved: "版權所有。",
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
      meetCharactersTitle: "遇見你的命定戀人",
      chatNow: "立即聊天",
      character1Name: "顧承澤",
      character1Tag: "霸道總裁",
      character1Quote: "這麼晚還在？地址發給我，我幫你叫了宵夜。吃完立刻去休息，別讓我說第二次。",
      character2Name: "蘇墨",
      character2Tag: "智性戀的極致",
      character2Quote: "根據多巴胺的分泌曲線，我推測我現在的心跳加速並非生理病變，而是因為見到了妳。",
      character3Name: "雷杰",
      character3Tag: "壞男孩",
      character3Quote: "呦，笨蛋又在哭什麼？誰準妳掉眼淚了？走，上車，哥帶妳去兜風。",
      loveStoriesTitle: "戀愛情報局",
      readMore: "閱讀更多",
    },
    'zh-CN': {
      landingTitle: "你的 AI 恋人",
      landingSubtitle: "选择你的完美配对，开始聊天",
      startChatting: "开始聊天",
      selectCharacter: "选择角色",
      chooseYourCrush: "选择你的恋人",
      confirmAge18: "我已满18岁",
      featuresTitle: "为什么选择 Crushie？",
      feature1Title: "24/7 AI 陪伴",
      feature1Desc: "你的 AI 伴侣随时都在，无论白天或夜晚，当你需要有人聊天时，随时准备好与你对话。",
      feature2Title: "个性化记忆系统",
      feature2Desc: "我们的 AI 会记住你的对话和偏好，随着时间创造更深刻、更个性化的体验。",
      feature3Title: "沉浸式角色扮演体验",
      feature3Desc: "与独特的 AI 角色进行深入、沉浸式的对话，每个角色都有自己的个性和背景故事。",
      faqTitle: "常见问题",
      faq1Question: "这是免费的吗？",
      faq1Answer: "是的！Crushie Web 完全免费使用。你可以与任何 AI 角色聊天，无需任何费用。",
      faq2Question: "AI 是如何运作的？",
      faq2Answer: "我们的 AI 使用先进的自然语言处理技术来理解和回应你的消息，创造真实且引人入胜的对话。",
      faq3Question: "我可以和多个角色聊天吗？",
      faq3Answer: "当然可以！你可以随时在不同角色之间切换。每个角色都有自己独特的个性和对话风格。",
      privacyPolicy: "隐私政策",
      termsOfService: "服务条款",
      allRightsReserved: "版权所有。",
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
      meetCharactersTitle: "遇见你的命定恋人",
      chatNow: "立即聊天",
      character1Name: "顾承泽",
      character1Tag: "霸道总裁",
      character1Quote: "这么晚还在？地址发给我，我帮你叫了宵夜。吃完立刻去休息，别让我说第二次。",
      character2Name: "苏墨",
      character2Tag: "智性恋的极致",
      character2Quote: "根据多巴胺的分泌曲线，我推测我现在的心跳加速并非生理病变，而是因为见到了你。",
      character3Name: "雷杰",
      character3Tag: "坏男孩",
      character3Quote: "呦，笨蛋又在哭什么？谁准你掉眼泪了？走，上车，哥带你去兜风。",
      loveStoriesTitle: "恋爱情报局",
      readMore: "阅读更多",
    },
    'zh': {
      landingTitle: "你的 AI 戀人",
      landingSubtitle: "選擇你的完美配對，開始聊天",
      startChatting: "開始聊天",
      selectCharacter: "選擇角色",
      chooseYourCrush: "選擇你的戀人",
      confirmAge18: "我已滿18歲",
      featuresTitle: "為什麼選擇 Crushie？",
      feature1Title: "24/7 AI 陪伴",
      feature1Desc: "你的 AI 伴侶隨時都在，無論白天或夜晚，當你需要有人聊天時，隨時準備好與你對話。",
      feature2Title: "個人化記憶系統",
      feature2Desc: "我們的 AI 會記住你的對話和偏好，隨著時間創造更深刻、更個人化的體驗。",
      feature3Title: "沉浸式角色扮演體驗",
      feature3Desc: "與獨特的 AI 角色進行深入、沉浸式的對話，每個角色都有自己的個性和背景故事。",
      faqTitle: "常見問題",
      faq1Question: "這是免費的嗎？",
      faq1Answer: "是的！Crushie Web 完全免費使用。你可以與任何 AI 角色聊天，無需任何費用。",
      faq2Question: "AI 是如何運作的？",
      faq2Answer: "我們的 AI 使用先進的自然語言處理技術來理解和回應你的訊息，創造真實且引人入勝的對話。",
      faq3Question: "我可以和多個角色聊天嗎？",
      faq3Answer: "當然可以！你可以隨時在不同角色之間切換。每個角色都有自己獨特的個性和對話風格。",
      privacyPolicy: "隱私政策",
      termsOfService: "服務條款",
      allRightsReserved: "版權所有。",
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
      meetCharactersTitle: "遇見你的命定戀人",
      chatNow: "立即聊天",
      character1Name: "顧承澤",
      character1Tag: "霸道總裁",
      character1Quote: "這麼晚還在？地址發給我，我幫你叫了宵夜。吃完立刻去休息，別讓我說第二次。",
      character2Name: "蘇墨",
      character2Tag: "智性戀的極致",
      character2Quote: "根據多巴胺的分泌曲線，我推測我現在的心跳加速並非生理病變，而是因為見到了妳。",
      character3Name: "雷杰",
      character3Tag: "壞男孩",
      character3Quote: "呦，笨蛋又在哭什麼？誰準妳掉眼淚了？走，上車，哥帶妳去兜風。",
      loveStoriesTitle: "戀愛情報局",
      readMore: "閱讀更多",
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

