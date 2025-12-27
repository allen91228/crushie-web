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
  close: string
  blogPost1Title: string
  blogPost1Excerpt: string
  blogPost1Content: string
  blogPost2Title: string
  blogPost2Excerpt: string
  blogPost2Content: string
  blogPost3Title: string
  blogPost3Excerpt: string
  blogPost3Content: string
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
      close: "Close",
      blogPost1Title: "The Secret Side of Gu Chengze",
      blogPost1Excerpt: "Behind the cold exterior of the CEO lies a heart that beats only for you. Discover how this dominant character shows his affection in ways that will make your heart race...",
      blogPost1Content: "Gu Chengze, the CEO known for his cold and commanding presence, hides a secret that only those closest to him ever see. Behind the boardroom doors and calculated business decisions lies a man whose heart beats only for one person.\n\nWhen he's with you, his dominant nature transforms into something more—a protective, possessive love that shows itself in unexpected ways. He might order food for you late at night, send you home in his car after a long day, or simply demand that you rest when you've been working too hard.\n\nHis love language is action, not words. He shows his affection through taking care of you, even when his tone remains stern. Every gesture, from booking your favorite restaurant to making sure you're safe, speaks volumes about how much you mean to him. This is the secret side of Gu Chengze—a man who loves fiercely, completely, and without reservation.",
      blogPost2Title: "Understanding Ray's Wild Heart",
      blogPost2Excerpt: "The bad boy with a golden heart. Learn how Ray's rebellious nature hides deep emotions and how he expresses love in his own unique way that will leave you breathless...",
      blogPost2Content: "Ray might come across as the rebellious bad boy, but those who truly know him understand that beneath that wild exterior lies a heart of gold. His rebellious nature isn't about causing trouble—it's about living life on his own terms and protecting what matters most.\n\nWhen he loves, he loves with everything he has. He's the one who will pick you up on his motorcycle when you're feeling down, take you on spontaneous adventures, and make you forget all your worries. His way of expressing love is through freedom and adventure—showing you a side of life you've never seen before.\n\nDon't let his rough exterior fool you. When you're with Ray, you'll discover a man who's fiercely loyal, incredibly protective, and unapologetically genuine. He doesn't say \"I love you\" with flowers and grand gestures. Instead, he shows it by being there when you need him most, making you laugh when you want to cry, and giving you the freedom to be yourself. This is Ray's wild heart—raw, real, and completely devoted to you.",
      blogPost3Title: "Su Mo's Intellectual Romance",
      blogPost3Excerpt: "When logic meets emotion. Explore how the intellectual character expresses love through scientific concepts and philosophical thoughts, creating a romance that's both deep and intriguing...",
      blogPost3Content: "Su Mo approaches love the same way he approaches everything in life—with curiosity, analysis, and a deep desire to understand. His intellectual nature doesn't mean he's cold or unfeeling. Instead, it means he loves with a profound intensity that goes beyond surface-level attraction.\n\nWhen he falls for you, he'll try to rationalize it through scientific theories and philosophical concepts. He'll talk about dopamine and serotonin, attachment theory, and the mathematics of attraction. But beneath all that intellectual discourse, you'll find something beautiful: a man who's completely fascinated by you, who wants to understand every aspect of your being, and who expresses his feelings in the most unique and thoughtful ways.\n\nHis love manifests through intellectual connection—deep conversations that last for hours, shared interests in knowledge and discovery, and a mutual respect for each other's minds. With Su Mo, romance isn't just about passion—it's about connection, understanding, and the beautiful intersection where logic meets emotion. This is Su Mo's intellectual romance—a love story written in equations and whispered through theories, but felt with the heart.",
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
      close: "關閉",
      blogPost1Title: "顧承澤的秘密一面",
      blogPost1Excerpt: "在霸道總裁冷峻的外表下，隱藏著一顆只為你跳動的心。探索這位控制型角色如何用讓人心跳加速的方式表達他的愛意...",
      blogPost1Content: "顧承澤，這位以冷峻和強勢聞名的總裁，隱藏著一個只有最親近的人才能看到的秘密。在會議室的大門和精明的商業決策背後，是一個只為一個人跳動的心。\n\n當他和妳在一起時，他強勢的本性會轉變為更深刻的東西——一種保護性的、佔有性的愛，以意想不到的方式展現。他可能會在深夜為妳訂餐，在漫長的一天後送妳回家，或者只是簡單地要求妳在過度工作時休息。\n\n他的愛的語言是行動，而不是言語。他通過照顧妳來表達愛意，即使他的語氣仍然嚴厲。每一個手勢，從預訂妳最喜歡的餐廳到確保妳的安全，都在訴說著妳對他來說有多重要。這就是顧承澤的秘密一面——一個愛得激烈、完全、毫無保留的男人。",
      blogPost2Title: "解讀雷杰的狂野內心",
      blogPost2Excerpt: "壞男孩的外表下藏著一顆金子般的心。了解雷杰的叛逆性格如何掩飾深刻的情感，以及他如何用獨特的方式表達愛，讓你無法呼吸...",
      blogPost2Content: "雷杰可能看起來像個叛逆的壞男孩，但真正了解他的人明白，在那狂野的外表下藏著一顆金子般的心。他的叛逆不是為了製造麻煩，而是為了按照自己的方式生活，保護最重要的事物。\n\n當他愛的時候，他會用全部去愛。他會在你沮喪的時候用摩托車接你，帶你去自發性的冒險，讓你忘記所有的煩惱。他表達愛的方式是通過自由和冒險——向你展示你從未見過的生活的另一面。\n\n不要被他粗獷的外表所迷惑。當你和雷杰在一起時，你會發現一個極其忠誠、令人難以置信地保護，並且毫不掩飾地真誠的男人。他不會用鮮花和盛大的手勢說「我愛你」。相反，他通過在你最需要的時候出現，在你想哭的時候讓你笑，給你做自己的自由來表達。這就是雷杰的狂野內心——原始、真實，完全為你奉獻。",
      blogPost3Title: "蘇墨的智性浪漫",
      blogPost3Excerpt: "當邏輯遇上情感。探索這位智性角色如何通過科學概念和哲學思考表達愛意，創造出一段既深刻又迷人的浪漫關係...",
      blogPost3Content: "蘇墨以他對生活中一切事物的方式來接近愛情——帶著好奇心、分析和深刻的渴望去理解。他的智性本質並不意味著他冷漠或無情。相反，這意味著他以一種深刻的強度去愛，超越表面層面的吸引力。\n\n當他愛上你時，他會試圖通過科學理論和哲學概念來合理化它。他會談論多巴胺和血清素、依戀理論，以及吸引力的數學。但在所有這些知識性的論述之下，你會發現一些美麗的東西：一個完全被你迷住的男人，他想要了解你存在的每一個方面，並以最獨特和深思熟慮的方式表達他的感情。\n\n他的愛通過知識連接展現——持續數小時的深度對話，對知識和發現的共同興趣，以及對彼此心靈的相互尊重。與蘇墨在一起，浪漫不僅僅是關於激情——它是關於連接、理解，以及邏輯與情感相遇的美麗交叉點。這就是蘇墨的智性浪漫——一個用方程式書寫、通過理論低語的愛情故事，但用心感受。",
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
      close: "关闭",
      blogPost1Title: "顾承泽的秘密一面",
      blogPost1Excerpt: "在霸道总裁冷峻的外表下，隐藏着一颗只为你跳动的心。探索这位控制型角色如何用让人心跳加速的方式表达他的爱意...",
      blogPost1Content: "顾承泽，这位以冷峻和强势闻名的总裁，隐藏着一个只有最亲近的人才能看到的秘密。在会议室的大门和精明的商业决策背后，是一个只为一个人跳动的心。\n\n当他和你在一起时，他强势的本性会转变为更深刻的东西——一种保护性的、占有性的爱，以意想不到的方式展现。他可能会在深夜为你订餐，在漫长的一天后送你回家，或者只是简单地要求你在过度工作时休息。\n\n他的爱的语言是行动，而不是言语。他通过照顾你来表达爱意，即使他的语气仍然严厉。每一个手势，从预订你最喜欢的餐厅到确保你的安全，都在诉说着你对他来说有多重要。这就是顾承泽的秘密一面——一个爱得激烈、完全、毫无保留的男人。",
      blogPost2Title: "解读雷杰的狂野内心",
      blogPost2Excerpt: "坏男孩的外表下藏着一颗金子般的心。了解雷杰的叛逆性格如何掩饰深刻的情感，以及他如何用独特的方式表达爱，让你无法呼吸...",
      blogPost2Content: "雷杰可能看起来像个叛逆的坏男孩，但真正了解他的人明白，在那狂野的外表下藏着一颗金子般的心。他的叛逆不是为了制造麻烦，而是为了按照自己的方式生活，保护最重要的事物。\n\n当他爱的时候，他会用全部去爱。他会在你沮丧的时候用摩托车接你，带你去自发性的冒险，让你忘记所有的烦恼。他表达爱的方式是通过自由和冒险——向你展示你从未见过的生活的另一面。\n\n不要被他粗犷的外表所迷惑。当你和雷杰在一起时，你会发现一个极其忠诚、令人难以置信地保护，并且毫不掩饰地真诚的男人。他不会用鲜花和盛大的手势说「我爱你」。相反，他通过在你最需要的时候出现，在你想哭的时候让你笑，给你做自己的自由来表达。这就是雷杰的狂野内心——原始、真实，完全为你奉献。",
      blogPost3Title: "苏墨的智性浪漫",
      blogPost3Excerpt: "当逻辑遇上情感。探索这位智性角色如何通过科学概念和哲学思考表达爱意，创造出一段既深刻又迷人的浪漫关系...",
      blogPost3Content: "苏墨以他对生活中一切事物的方式来接近爱情——带着好奇心、分析和深刻的渴望去理解。他的智性本质并不意味着他冷漠或无情。相反，这意味着他以一种深刻的强度去爱，超越表面层面的吸引力。\n\n当他爱上你时，他会试图通过科学理论和哲学概念来合理化它。他会谈论多巴胺和血清素、依恋理论，以及吸引力的数学。但在所有这些知识性的论述之下，你会发现一些美丽的东西：一个完全被你迷住的男人，他想要了解你存在的每一个方面，并以最独特和深思熟虑的方式表达他的感情。\n\n他的爱通过知识连接展现——持续数小时的深度对话，对知识和发现的共同兴趣，以及对彼此心灵的相互尊重。与苏墨在一起，浪漫不仅仅是关于激情——它是关于连接、理解，以及逻辑与情感相遇的美丽交叉点。这就是苏墨的智性浪漫——一个用方程式书写、通过理论低语的爱情故事，但用心感受。",
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
      close: "關閉",
      blogPost1Title: "顧承澤的秘密一面",
      blogPost1Excerpt: "在霸道總裁冷峻的外表下，隱藏著一顆只為你跳動的心。探索這位控制型角色如何用讓人心跳加速的方式表達他的愛意...",
      blogPost1Content: "顧承澤，這位以冷峻和強勢聞名的總裁，隱藏著一個只有最親近的人才能看到的秘密。在會議室的大門和精明的商業決策背後，是一個只為一個人跳動的心。\n\n當他和妳在一起時，他強勢的本性會轉變為更深刻的東西——一種保護性的、佔有性的愛，以意想不到的方式展現。他可能會在深夜為妳訂餐，在漫長的一天後送妳回家，或者只是簡單地要求妳在過度工作時休息。\n\n他的愛的語言是行動，而不是言語。他通過照顧妳來表達愛意，即使他的語氣仍然嚴厲。每一個手勢，從預訂妳最喜歡的餐廳到確保妳的安全，都在訴說著妳對他來說有多重要。這就是顧承澤的秘密一面——一個愛得激烈、完全、毫無保留的男人。",
      blogPost2Title: "解讀雷杰的狂野內心",
      blogPost2Excerpt: "壞男孩的外表下藏著一顆金子般的心。了解雷杰的叛逆性格如何掩飾深刻的情感，以及他如何用獨特的方式表達愛，讓你無法呼吸...",
      blogPost2Content: "雷杰可能看起來像個叛逆的壞男孩，但真正了解他的人明白，在那狂野的外表下藏著一顆金子般的心。他的叛逆不是為了製造麻煩，而是為了按照自己的方式生活，保護最重要的事物。\n\n當他愛的時候，他會用全部去愛。他會在你沮喪的時候用摩托車接你，帶你去自發性的冒險，讓你忘記所有的煩惱。他表達愛的方式是通過自由和冒險——向你展示你從未見過的生活的另一面。\n\n不要被他粗獷的外表所迷惑。當你和雷杰在一起時，你會發現一個極其忠誠、令人難以置信地保護，並且毫不掩飾地真誠的男人。他不會用鮮花和盛大的手勢說「我愛你」。相反，他通過在你最需要的時候出現，在你想哭的時候讓你笑，給你做自己的自由來表達。這就是雷杰的狂野內心——原始、真實，完全為你奉獻。",
      blogPost3Title: "蘇墨的智性浪漫",
      blogPost3Excerpt: "當邏輯遇上情感。探索這位智性角色如何通過科學概念和哲學思考表達愛意，創造出一段既深刻又迷人的浪漫關係...",
      blogPost3Content: "蘇墨以他對生活中一切事物的方式來接近愛情——帶著好奇心、分析和深刻的渴望去理解。他的智性本質並不意味著他冷漠或無情。相反，這意味著他以一種深刻的強度去愛，超越表面層面的吸引力。\n\n當他愛上你時，他會試圖通過科學理論和哲學概念來合理化它。他會談論多巴胺和血清素、依戀理論，以及吸引力的數學。但在所有這些知識性的論述之下，你會發現一些美麗的東西：一個完全被你迷住的男人，他想要了解你存在的每一個方面，並以最獨特和深思熟慮的方式表達他的感情。\n\n他的愛通過知識連接展現——持續數小時的深度對話，對知識和發現的共同興趣，以及對彼此心靈的相互尊重。與蘇墨在一起，浪漫不僅僅是關於激情——它是關於連接、理解，以及邏輯與情感相遇的美麗交叉點。這就是蘇墨的智性浪漫——一個用方程式書寫、通過理論低語的愛情故事，但用心感受。",
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

