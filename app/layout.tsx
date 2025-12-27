import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Crushie Web - Your AI Crush',
  description: 'Chat with your AI boyfriend Ethan',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}

