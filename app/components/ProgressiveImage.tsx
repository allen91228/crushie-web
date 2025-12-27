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
  const [fullImageLoaded, setFullImageLoaded] = useState(false)
  const [useThumbnail, setUseThumbnail] = useState(true)

  // Generate thumbnail path (assuming same directory with -thumb suffix)
  const getThumbnailPath = (originalPath: string): string => {
    const lastDot = originalPath.lastIndexOf('.')
    if (lastDot === -1) return originalPath
    const base = originalPath.substring(0, lastDot)
    const ext = originalPath.substring(lastDot)
    return `${base}-thumb${ext}`
  }

  const thumbnailSrc = getThumbnailPath(src)

  useEffect(() => {
    // Preload full image in the background
    const fullImage = new window.Image()
    fullImage.onload = () => {
      setFullImageLoaded(true)
    }
    fullImage.src = src

    // Check if thumbnail exists, if not, use original immediately
    const thumbImage = new window.Image()
    thumbImage.onerror = () => {
      // Thumbnail doesn't exist, use original
      setUseThumbnail(false)
    }
    thumbImage.src = thumbnailSrc
  }, [src, thumbnailSrc])

  const displaySrc = useThumbnail && !fullImageLoaded ? thumbnailSrc : src
  const showThumbnail = useThumbnail && !fullImageLoaded

  const useFill = fill || (!width || !height)
  
  return (
    <div className={`relative ${className}`} style={!useFill && width && height ? { width, height } : undefined}>
      {/* Thumbnail (low quality, fast load) - shown first */}
      {showThumbnail && (
        <Image
          src={thumbnailSrc}
          alt={alt}
          fill={useFill}
          width={useFill ? undefined : width}
          height={useFill ? undefined : height}
          className={`object-cover transition-opacity duration-300 ${
            fullImageLoaded ? 'opacity-0' : 'opacity-100'
          }`}
          priority={priority}
          unoptimized
        />
      )}
      
      {/* Full quality image - fades in when loaded */}
      <Image
        src={src}
        alt={alt}
        fill={useFill}
        width={useFill ? undefined : width}
        height={useFill ? undefined : height}
        className={`object-cover transition-opacity duration-500 ${
          fullImageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        priority={priority}
        quality={90}
        sizes={useFill ? "100vw" : width ? `${width}px` : undefined}
        onLoad={() => setFullImageLoaded(true)}
      />
    </div>
  )
}

