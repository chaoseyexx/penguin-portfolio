import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { SmoothScroll } from "@/components/smooth-scroll"

// Initialize fonts
const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
})

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
    variable: "--font-poppins",
})

export const metadata: Metadata = {
    title: "Pingu Portfolio | Professional Roblox Developer",
    description:
        "Expert Roblox builder specializing in immersive environments, detailed structures, and game assets. Portfolio designed by ChaosLabs.",
    generator: "ChaosLabs",
    metadataBase: new URL("https://penguin.chaoslabs.cc/"),
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={`scroll-smooth ${inter.variable} ${poppins.variable}`}>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </head>
            <body className={inter.className}>
                <SmoothScroll>
                    {children}
                </SmoothScroll>
            </body>
        </html>
    )
}
