"use client"

import Head from "next/head"
import { useRouter } from "next/router"

interface SEOProps {
  title?: string
  description?: string
  canonicalUrl?: string
  ogType?: string
  ogImage?: string
}

export default function SEO({
  title = "BuilderManGuy | Professional Roblox Builder & Environment Designer",
  description = "Expert Roblox builder specializing in immersive environments, detailed structures, and optimized game assets. Hire me for your next Roblox project.",
  canonicalUrl,
  ogType = "website",
  ogImage = "/wayne-tower-night.webp",
}: SEOProps) {
  const router = useRouter()
  const fullUrl = canonicalUrl || `https://roblox.kickpower.cc${router.asPath}`

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      {/* Canonical Link */}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
    </Head>
  )
}
