'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface ProgressiveImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  priority?: boolean
}

export default function ProgressiveImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className = '',
  priority = false,
}: ProgressiveImageProps) {
  const [imageError, setImageError] = useState(false)
  const useFill = fill || (!width || !height)

  // Reset error state when src changes
  useEffect(() => {
    setImageError(false)
  }, [src])

  if (imageError) {
    // Fallback: show a placeholder div
    return (
      <div 
        className={`bg-gray-800 flex items-center justify-center ${className}`}
        style={useFill ? undefined : { width, height }}
      >
        <span className="text-gray-500 text-sm">圖片載入失敗</span>
      </div>
    )
  }

  return (
    <div 
      className={`relative ${className}`} 
      style={!useFill && width && height ? { width, height } : undefined}
    >
      <Image
        src={src}
        alt={alt}
        fill={useFill}
        width={useFill ? undefined : width}
        height={useFill ? undefined : height}
        className="object-cover"
        priority={priority}
        quality={90}
        sizes={useFill ? "100vw" : width ? `${width}px` : undefined}
        unoptimized={true}
        onError={() => {
          console.error('Image load error:', src)
          setImageError(true)
        }}
      />
    </div>
  )
}
