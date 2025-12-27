import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import { LanguageProvider } from './contexts/LanguageContext'

export const metadata: Metadata = {
  title: 'Crushie Web - Your AI Crush',
  description: 'Chat with your AI boyfriend Ethan',
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

