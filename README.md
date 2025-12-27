# Crushie Web - AI Boyfriend Chat Simulator

A modern, mobile-responsive web app built with Next.js and Tailwind CSS for an immersive Otome game experience.

## Features

- 🎮 Landing page with romantic hero section
- 💬 Interactive chat interface with mock AI responses
- 📱 Fully responsive design (mobile-first)
- 🎨 Beautiful glassmorphism UI with dark, romantic theme
- 💰 Ad banner integration ready

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- TypeScript
- Lucide React (icons)

## Project Structure

```
app/
  ├── page.tsx          # Landing page
  ├── chat/
  │   └── page.tsx      # Chat interface
  ├── layout.tsx        # Root layout
  └── globals.css       # Global styles
```

## Customization

The AI responses are currently mocked in `app/chat/page.tsx`. You can easily replace the `getEthanResponse` function with a real API call when ready.

