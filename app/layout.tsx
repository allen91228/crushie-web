import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import { LanguageProvider } from './contexts/LanguageContext'

export const metadata: Metadata = {
  title: 'Crushie - Free AI Boyfriend & Romantic Chat | 免費 AI 戀人對話',
  description: 'Chat with AI characters like Dominant CEO, Gentle Doctor, and Bad Boy. Free, immersive, and personalized romantic roleplay. 24/7 companionship. 與霸道總裁、溫柔醫生、壞男孩等 AI 角色聊天。免費、沉浸式、個人化的浪漫角色扮演。24/7 陪伴。',
  keywords: ['AI boyfriend', 'virtual lover', 'otome game', 'AI chat', 'free roleplay', '乙女遊戲', '虛擬男友', 'AI 聊天', 'romantic chat', 'AI companion', '角色扮演', '戀愛遊戲'],
  authors: [{ name: 'Crushie' }],
  creator: 'Crushie',
  publisher: 'Crushie',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://crushie-web.vercel.app'),
  openGraph: {
    title: 'Crushie - Free AI Boyfriend & Romantic Chat | 免費 AI 戀人對話',
    description: 'Chat with AI characters like Dominant CEO, Gentle Doctor, and Bad Boy. Free, immersive, and personalized romantic roleplay. 24/7 companionship.',
    url: '/',
    siteName: 'Crushie',
    images: [
      {
        url: '/characters/GuCheng-ze.png',
        width: 1200,
        height: 1600,
        alt: 'Crushie - AI Boyfriend Chat | 顧承澤',
      },
    ],
    locale: 'zh_TW',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crushie - Free AI Boyfriend & Romantic Chat',
    description: 'Chat with AI characters like Dominant CEO, Gentle Doctor, and Bad Boy. Free, immersive, and personalized romantic roleplay.',
    images: ['/characters/GuCheng-ze.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'google-adsense-account': 'ca-pub-8866496999245624',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <LanguageProvider>
          <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8866496999245624"
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}

