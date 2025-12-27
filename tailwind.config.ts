import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'romantic-purple': '#6B46C1',
        'neon-pink': '#EC4899',
        'dark-gray': '#1F2937',
        'glass': 'rgba(255, 255, 255, 0.1)',
        purple: {
          400: '#C084FC',
          900: '#581C87',
        },
      },
      backgroundImage: {
        'gradient-purple': 'linear-gradient(135deg, #6B46C1 0%, #EC4899 100%)',
      },
    },
  },
  plugins: [],
}
export default config

