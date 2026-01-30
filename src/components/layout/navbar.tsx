
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Home, Briefcase, User, Mail, Star } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

const navLinks = [
    { name: "Home", id: "home", icon: Home },
    { name: "Portfolio", id: "portfolio", icon: Briefcase },
    { name: "Skills", id: "skills", icon: Star },
    { name: "Reviews", id: "reviews", icon: User },
    { name: "About", id: "about", icon: User },
    { name: "Contact", id: "contact", icon: Mail },
]

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState("home")
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)

            const sections = navLinks.map(link => document.getElementById(link.id))
            const scrollPosition = window.scrollY + 100

            sections.forEach((section, index) => {
                if (section) {
                    const offsetTop = section.offsetTop
                    const height = section.offsetHeight
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
                        setActiveSection(navLinks[index].id)
                    }
                }
            })
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const scrollToSection = (sectionId: string) => {
        setIsOpen(false)
        const element = document.getElementById(sectionId)
        if (element) {
            const headerOffset = 80
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset
            window.scrollTo({ top: offsetPosition, behavior: "smooth" })
        }
    }

    return (
        <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="pointer-events-auto bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 flex items-center gap-1 shadow-2xl shadow-black/50"
            >
                <Link href="/" className="text-2xl font-bold font-heading text-white">
                    Pingu<span className="text-primary">.</span>
                </Link>

                <div className="hidden md:flex items-center gap-1 mx-4">
                    {navLinks.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => scrollToSection(link.id)}
                            className="relative px-4 py-2 rounded-full text-sm font-medium transition-colors text-white/70 hover:text-white"
                        >
                            {activeSection === link.id && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute inset-0 bg-white/10 rounded-full z-0"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10 flex items-center gap-2">
                                {link.name}
                            </span>
                        </button>
                    ))}
                </div>

                <div className="md:hidden flex items-center">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/5">
                                <Menu size={24} />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="bg-black/95 backdrop-blur-2xl border-white/10 p-0 overflow-hidden">
                            <div className="flex flex-col h-full pt-20 px-8 pb-10">
                                <SheetTitle className="sr-only">Menu</SheetTitle>
                                <SheetDescription className="sr-only">Navigation links</SheetDescription>
                                <nav className="flex flex-col gap-6">
                                    {navLinks.map((link) => (
                                        <button
                                            key={link.id}
                                            onClick={() => scrollToSection(link.id)}
                                            className={`text-2xl font-bold font-heading text-left transition-all duration-300 ${activeSection === link.id ? "text-primary translate-x-2" : "text-white/50 hover:text-white"
                                                }`}
                                        >
                                            {link.name}
                                        </button>
                                    ))}
                                </nav>
                                <div className="mt-auto">
                                    <Button
                                        onClick={() => scrollToSection("contact")}
                                        className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-lg font-bold"
                                    >
                                        Hire Me
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                <div className="hidden md:block ml-2 pl-2 border-l border-white/10">
                    <Button
                        onClick={() => scrollToSection("contact")}
                        className="bg-primary hover:bg-primary/90 text-white text-sm font-semibold px-6 py-2 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
                    >
                        Hire Me
                    </Button>
                </div>
            </motion.div>
        </nav>
    )
}
