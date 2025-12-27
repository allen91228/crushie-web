// Character definitions and data

export interface Character {
  id: string
  name: string
  description: string
  image: string
  personality: string
  initialMessage: Record<string, string> // Language -> message
  responses: Record<string, string[]> // Language -> responses array
}

export const characters: Character[] = [
  {
    id: 'ethan',
    name: 'Ethan',
    description: 'Cold on the outside, obsessed with you on the inside.',
    image: 'https://placehold.co/300x400/6B46C1/FFFFFF?text=Ethan',
    personality: 'tsundere',
    initialMessage: {
      'en': "You messaged me. What do you want?",
      'zh-TW': "你傳訊息給我了。你想要什麼？",
      'zh-CN': "你给我发消息了。你想要什么？",
      'zh': "你傳訊息給我了。你想要什麼？",
    },
    responses: {
      'en': [
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
      'zh-TW': [
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
      'zh-CN': [
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
      'zh': [
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
  },
  {
    id: 'alex',
    name: 'Alex',
    description: 'Warm and caring, always there for you.',
    image: 'https://placehold.co/300x400/EC4899/FFFFFF?text=Alex',
    personality: 'sweet',
    initialMessage: {
      'en': "Hey! I'm so glad you messaged me. How are you doing?",
      'zh-TW': "嘿！很高興你傳訊息給我。你好嗎？",
      'zh-CN': "嘿！很高兴你给我发消息。你好吗？",
      'zh': "嘿！很高興你傳訊息給我。你好嗎？",
    },
    responses: {
      'en': [
        "I've been thinking about you all day!",
        "You make me so happy when you message me.",
        "Tell me more about yourself, I want to know everything.",
        "I'm here for you, always.",
        "You're so special to me.",
        "I can't stop smiling when I talk to you.",
        "What would you like to do together?",
        "I love spending time with you.",
        "You're the best thing that's happened to me.",
        "I'm so lucky to have you in my life.",
      ],
      'zh-TW': [
        "我一整天都在想你！",
        "你傳訊息給我的時候，我真的很開心。",
        "告訴我更多關於你的事，我想知道一切。",
        "我會一直在這裡陪著你。",
        "你對我來說很特別。",
        "和你聊天時，我總是忍不住微笑。",
        "你想一起做什麼？",
        "我喜歡和你在一起的時光。",
        "你是我遇到最美好的事。",
        "我的生活中有你真的很幸運。",
      ],
      'zh-CN': [
        "我一整天都在想你！",
        "你给我发消息的时候，我真的很开心。",
        "告诉我更多关于你的事，我想知道一切。",
        "我会一直在这里陪着你。",
        "你对我来说很特别。",
        "和你聊天时，我总是忍不住微笑。",
        "你想一起做什么？",
        "我喜欢和你在一起的时光。",
        "你是我遇到最美好的事。",
        "我的生活中有你真的很幸运。",
      ],
      'zh': [
        "我一整天都在想你！",
        "你傳訊息給我的時候，我真的很開心。",
        "告訴我更多關於你的事，我想知道一切。",
        "我會一直在這裡陪著你。",
        "你對我來說很特別。",
        "和你聊天時，我總是忍不住微笑。",
        "你想一起做什麼？",
        "我喜歡和你在一起的時光。",
        "你是我遇到最美好的事。",
        "我的生活中有你真的很幸運。",
      ],
    },
  },
  {
    id: 'kaito',
    name: 'Kaito',
    description: 'Mysterious and intriguing, full of secrets.',
    image: 'https://placehold.co/300x400/8B5CF6/FFFFFF?text=Kaito',
    personality: 'mysterious',
    initialMessage: {
      'en': "So you found me... Interesting. What brings you here?",
      'zh-TW': "所以你找到我了... 有趣。是什麼把你帶到這裡？",
      'zh-CN': "所以你找到我了... 有趣。是什么把你带到这里？",
      'zh': "所以你找到我了... 有趣。是什麼把你帶到這裡？",
    },
    responses: {
      'en': [
        "There's something about you that intrigues me...",
        "You're not like the others. I like that.",
        "I have many secrets. Care to discover them?",
        "The night holds many mysteries, just like you.",
        "I've been waiting for someone like you.",
        "You're curious about me, aren't you?",
        "Let's explore the unknown together.",
        "There's more to me than meets the eye.",
        "You've caught my attention, and that's rare.",
        "I don't trust easily, but you're different.",
      ],
      'zh-TW': [
        "你身上有某些東西讓我感到好奇...",
        "你和別人不同。我喜歡這樣。",
        "我有很多秘密。想發現它們嗎？",
        "夜晚隱藏著許多謎團，就像你一樣。",
        "我一直在等待像你這樣的人。",
        "你對我感到好奇，對吧？",
        "讓我們一起探索未知。",
        "我比表面上看起來更複雜。",
        "你引起了我的注意，這很罕見。",
        "我不輕易信任別人，但你不一樣。",
      ],
      'zh-CN': [
        "你身上有某些东西让我感到好奇...",
        "你和别人不同。我喜欢这样。",
        "我有很多秘密。想发现它们吗？",
        "夜晚隐藏着许多谜团，就像你一样。",
        "我一直在等待像你这样的人。",
        "你对我感到好奇，对吧？",
        "让我们一起探索未知。",
        "我比表面看起来更复杂。",
        "你引起了我的注意，这很罕见。",
        "我不轻易信任别人，但你不一样。",
      ],
      'zh': [
        "你身上有某些東西讓我感到好奇...",
        "你和別人不同。我喜歡這樣。",
        "我有很多秘密。想發現它們嗎？",
        "夜晚隱藏著許多謎團，就像你一樣。",
        "我一直在等待像你這樣的人。",
        "你對我感到好奇，對吧？",
        "讓我們一起探索未知。",
        "我比表面上看起來更複雜。",
        "你引起了我的注意，這很罕見。",
        "我不輕易信任別人，但你不一樣。",
      ],
    },
  },
]

export const getCharacterById = (id: string): Character | undefined => {
  return characters.find(char => char.id === id)
}

export const getDefaultCharacter = (): Character => {
  return characters[0] // Ethan
}

