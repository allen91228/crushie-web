'use client'

import Image from 'next/image'

interface AvatarProps {
  src: string
  alt: string
  size?: number
  className?: string
  ring?: boolean
  ringColor?: string
}

export default function Avatar({
  src,
  alt,
  size = 40,
  className = '',
  ring = false,
  ringColor = 'ring-pink-300',
}: AvatarProps) {
  return (
    <div
      className={`relative rounded-full overflow-hidden flex-shrink-0 ${
        ring ? `ring-2 ${ringColor}` : ''
      } ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes={`${size}px`}
      />
    </div>
  )
}

