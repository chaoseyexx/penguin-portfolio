"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface LoadingImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  priority?: boolean
  className?: string
  style?: React.CSSProperties
  sizes?: string
  quality?: number
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down"
}

export function LoadingImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className,
  style,
  sizes,
  quality = 85,
  objectFit = "cover",
}: LoadingImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={cn("overflow-hidden", fill ? "relative w-full h-full" : "", className)}>
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        quality={quality}
        sizes={sizes}
        className={cn(
          "transition-all duration-500",
          isLoading ? "scale-105 blur-sm" : "scale-100 blur-0",
          objectFit === "cover" ? "object-cover" : "",
          objectFit === "contain" ? "object-contain" : "",
          objectFit === "fill" ? "object-fill" : "",
          objectFit === "none" ? "object-none" : "",
          objectFit === "scale-down" ? "object-scale-down" : "",
        )}
        style={style}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  )
}
