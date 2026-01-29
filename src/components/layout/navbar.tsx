
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Home, Briefcase, User, Mail, Star } from "lucide-react"

const navLinks = [
    { name: "Home", href: "#home", icon: Home },
    { name: "Portfolio", href: "#portfolio", icon: Briefcase },
    { name: "Reviews", href: "#reviews", icon: Star },
    { name: "About", href: "#services", icon: User },
    { name: "Contact", href: "#contact", icon: Mail },
]

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [activeTab, setActiveTab] = useState("Home")

    useEffect(() => {
        const handleScroll = () => {
            // Simple active state logic based on scroll position could be added here
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="pointer-events-auto bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 flex items-center gap-1 shadow-2xl shadow-black/50"
            >
                <Link href="/" className="px-4 py-2 font-bold font-heading text-lg tracking-tight mr-2 text-white/90 hover:text-white transition-colors">
                    Pingu<span className="text-primary">.</span>
                </Link>

                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setActiveTab(link.name)}
                            className="relative px-4 py-2 rounded-full text-sm font-medium transition-colors text-white/70 hover:text-white"
                        >
                            {activeTab === link.name && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute inset-0 bg-white/10 rounded-full z-0"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10 flex items-center gap-2">
                                {link.name}
                            </span>
                        </Link>
                    ))}
                </div>

                <div className="md:hidden">
                    {/* Mobile Menu Trigger - Simplified for now */}
                    <button className="p-2 text-white/70 hover:text-white">
                        <Menu size={20} />
                    </button>
                </div>

                <div className="ml-2 pl-2 border-l border-white/10">
                    <button
                        onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-primary/90 hover:bg-primary text-white text-sm font-medium px-5 py-2 rounded-full transition-all hover:scale-105 active:scale-95"
                    >
                        Hire Me
                    </button>
                </div>
            </motion.div>
        </nav>
    )
}
