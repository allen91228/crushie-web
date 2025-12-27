# Refactoring Plan - Clean Architecture

## Proposed Structure

```
app/
├── api/                    # API routes (keep as is)
│   ├── chat/
│   └── summarize/
├── chat/
│   └── page.tsx           # Simplified - just renders ChatInterface
├── components/
│   ├── ui/                # Reusable UI components
│   │   └── Avatar.tsx     # Clean avatar component using next/image
│   ├── chat/              # Chat-specific components
│   │   ├── ChatInterface.tsx  # Main chat component (new)
│   │   ├── ChatHeader.tsx     # Header component
│   │   ├── ChatInput.tsx      # Input area component
│   │   ├── ChatMessage.tsx    # Message bubble component
│   │   └── CharacterSelector.tsx  # Moved from components/
│   └── layout/            # Layout components
│       ├── Footer.tsx         # Moved from components/
│       └── AdBanner.tsx       # Moved from components/
├── contexts/              # React contexts (keep as is)
│   └── LanguageContext.tsx
├── lib/                   # Libraries, utilities, types
│   ├── types/
│   │   ├── character.ts
│   │   └── message.ts
│   ├── data/
│   │   └── characters.ts      # Moved from utils/
│   └── utils/
│       ├── cookieStorage.ts
│       ├── language.ts
│       └── summarizer.ts
└── hooks/                 # Custom React hooks
    ├── useChat.ts         # Chat state management
    └── useCharacter.ts    # Character selection logic
```

## Files to Move/Rename

### Move Operations:
1. `app/components/CharacterSelector.tsx` → `app/components/chat/CharacterSelector.tsx`
2. `app/components/Footer.tsx` → `app/components/layout/Footer.tsx`
3. `app/components/AdBanner.tsx` → `app/components/layout/AdBanner.tsx`
4. `app/utils/characters.ts` → `app/lib/data/characters.ts`
5. `app/utils/cookieStorage.ts` → `app/lib/utils/cookieStorage.ts`
6. `app/utils/language.ts` → `app/lib/utils/language.ts`
7. `app/utils/summarizer.ts` → `app/lib/utils/summarizer.ts`

### Delete Operations:
1. `app/components/ProgressiveImage.tsx` (replace with direct next/image usage in Avatar.tsx)

### Create New Files:
1. `app/components/ui/Avatar.tsx` (clean avatar component)
2. `app/components/chat/ChatInterface.tsx` (main chat logic)
3. `app/components/chat/ChatHeader.tsx`
4. `app/components/chat/ChatInput.tsx`
5. `app/components/chat/ChatMessage.tsx`
6. `app/lib/types/character.ts`
7. `app/lib/types/message.ts`
8. `app/hooks/useChat.ts`

## Import Updates Required

All files importing from old paths need to be updated:
- `app/page.tsx`
- `app/chat/page.tsx`
- `app/components/**/*.tsx`
- Any API routes using utils

