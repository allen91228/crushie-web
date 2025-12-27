'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

interface AdBannerProps {
  adSlot?: string
  adFormat?: string
  fullWidthResponsive?: boolean
}

export default function AdBanner({
  adSlot = '', // Replace with your ad slot ID when ready
  adFormat = 'auto',
  fullWidthResponsive = true,
}: AdBannerProps) {
  useEffect(() => {
    try {
      if (adSlot && typeof window !== 'undefined') {
        window.adsbygoogle = window.adsbygoogle || []
        window.adsbygoogle.push({})
      }
    } catch (err) {
      console.error('AdSense error:', err)
    }
  }, [adSlot])

  // For now, show placeholder until ad slot ID is configured
  if (!adSlot) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-dark-gray/95 border-t border-purple-900 px-4 py-2">
        <div className="text-center text-xs md:text-sm text-gray-400">
          [Google AdSense Banner Placeholder]
        </div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-dark-gray/95 border-t border-purple-900 px-4 py-2">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-8866496999245624"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
      />
    </div>
  )
}

