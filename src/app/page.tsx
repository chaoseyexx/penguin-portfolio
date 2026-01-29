"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { useLenis } from 'lenis/react'
import Image from "next/image"
import Link from "next/link"
import {
    ArrowRight,
    Download,
    Menu,
    ExternalLink,
    Star,
    Code,
    Zap,
    Mail,
    Github,
    MessageSquare,
    Quote,
    ChevronLeft,
    ChevronRight,
    ZoomIn,
    Cuboid,
    Palette,
    Box,
    Layout,
    Smartphone,
    Lock
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollAnimation } from "@/components/scroll-animation"
import { SoundCloudPlayer } from "@/components/soundcloud-player"
import { ImageModal } from "@/components/image-modal"
import { TermsModal } from "@/components/terms-modal"

// Types
import { PortfolioItem, PortfolioData as IPortfolioData } from "@/lib/db"
import { Review } from "@/lib/db"
import { Skill } from "@/lib/db"
import { Settings } from "@/lib/db"

interface PortfolioData {
    environments: PortfolioItem[]
    structures: PortfolioItem[]
    interiors: PortfolioItem[]
    models: PortfolioItem[]
}

// Default fallback image
const DEFAULT_IMAGE = "/placeholder.svg?height=600&width=800"

// Items per page
const ITEMS_PER_PAGE = 6

// Icon mapping
const iconMap: Record<string, any> = {
    Code, Zap, Star, ExternalLink, Cuboid, Palette, Box, Layout, Smartphone, Lock,
    code: Code, zap: Zap, star: Star, externallink: ExternalLink, cuboid: Cuboid, palette: Palette, box: Box, layout: Layout, smartphone: Smartphone, lock: Lock
}

// Pagination component
const Pagination = ({
    category,
    totalPages,
    currentPage,
    onPageChange
}: {
    category: "environments" | "structures" | "interiors" | "models";
    totalPages: number;
    currentPage: number;
    onPageChange: (category: "environments" | "structures" | "interiors" | "models", page: number) => void;
}) => {
    if (totalPages <= 1) return null
    return (
        <div className="flex justify-center items-center gap-2 mt-8">
            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(category, Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="h-8 w-8"
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => onPageChange(category, page)}
                    className="h-8 w-8 p-0"
                >
                    {page}
                </Button>
            ))}
            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(category, Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="h-8 w-8"
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    )
}

// Portfolio item component
const PortfolioItemCard = ({
    build,
    index,
    delay,
    onOpenModal
}: {
    build: PortfolioItem;
    index: number;
    delay: any;
    onOpenModal: (src: string, alt: string) => void;
}) => (
    <ScrollAnimation key={index} animation="scale-in" duration="duration-700" delay={delay}>
        <Card className="group overflow-hidden h-full bg-card-gradient border-neutral-800/50 hover:border-primary/30 transition-all duration-300">
            <div
                className="relative h-56 overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                onClick={() => onOpenModal(build.image || DEFAULT_IMAGE, build.title)}
            >
                <Image
                    src={build.image || DEFAULT_IMAGE}
                    alt={build.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {/* Zoom indicator */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-primary/80 rounded-full p-3 transform transition-transform duration-300 hover:scale-110">
                        <ZoomIn className="h-6 w-6 text-white" />
                    </div>
                </div>
            </div>
            <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-2 text-white group-hover:text-primary transition-colors font-heading">
                    {build.title}
                </h3>
                <p className="text-neutral-300 line-clamp-2">{build.desc}</p>
            </CardContent>
        </Card>
    </ScrollAnimation>
)

export default function Home() {
    const [scrolled, setScrolled] = useState(false)
    const lenis = useLenis()
    const [activeSection, setActiveSection] = useState("home")
    const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({})

    // Data States
    const [portfolio, setPortfolio] = useState<PortfolioData>({ environments: [], structures: [], interiors: [], models: [] })
    const [skills, setSkills] = useState<Skill[]>([])
    const [reviews, setReviews] = useState<Review[]>([])
    const [settings, setSettings] = useState<Settings | null>(null)
    const [loading, setLoading] = useState(true)

    // Fetch Data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [portfolioRes, skillsRes, reviewsRes, settingsRes] = await Promise.all([
                    fetch('/api/portfolio?cachebust=1'),
                    fetch('/api/skills?cachebust=1'),
                    fetch('/api/reviews?cachebust=1'),
                    fetch('/api/settings?cachebust=1')
                ])

                const portfolioData = await portfolioRes.json()
                const skillsData = await skillsRes.json()
                const reviewsData = await reviewsRes.json()
                const settingsData = await settingsRes.json()

                setPortfolio(portfolioData)
                setSkills(skillsData)
                setReviews(reviewsData)
                setSettings(settingsData)
            } catch (error) {
                console.error("Failed to fetch data:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    // Modal states
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedImage, setSelectedImage] = useState({ src: "", alt: "" })
    const [termsModalOpen, setTermsModalOpen] = useState(false)

    // Function to open modal
    const openImageModal = (src: string, alt: string) => {
        setSelectedImage({ src, alt })
        setModalOpen(true)
    }

    // Pagination state
    const [currentPage, setCurrentPage] = useState({
        environments: 1,
        structures: 1,
        interiors: 1,
        models: 1,
    })

    // Calculate total pages
    const totalPages = {
        environments: Math.ceil((portfolio.environments?.length || 0) / ITEMS_PER_PAGE),
        structures: Math.ceil((portfolio.structures?.length || 0) / ITEMS_PER_PAGE),
        interiors: Math.ceil((portfolio.interiors?.length || 0) / ITEMS_PER_PAGE),
        models: Math.ceil((portfolio.models?.length || 0) / ITEMS_PER_PAGE),
    }

    // Get paginated items
    const getPaginatedItems = (category: "environments" | "structures" | "interiors" | "models") => {
        const items = portfolio[category] || []
        const startIndex = (currentPage[category] - 1) * ITEMS_PER_PAGE
        const endIndex = startIndex + ITEMS_PER_PAGE
        return items.slice(startIndex, endIndex)
    }

    // Handle page change
    const handlePageChange = (category: "environments" | "structures" | "interiors" | "models", page: number) => {
        setCurrentPage((prev) => ({
            ...prev,
            [category]: page,
        }))
    }

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)

            // Determine active section
            const scrollPosition = window.scrollY + 100

            Object.entries(sectionsRef.current).forEach(([id, element]) => {
                if (!element) return
                const offsetTop = element.offsetTop
                const height = element.offsetHeight
                if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
                    setActiveSection(id)
                }
            })
        }
        window.addEventListener("scroll", handleScroll)
        handleScroll()
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Register section refs
    const registerSection = (id: string, ref: HTMLElement | null) => {
        if (ref) sectionsRef.current[id] = ref
    }

    // Smooth scroll
    const scrollToSection = (sectionId: string, e: React.MouseEvent) => {
        e.preventDefault()
        const element = document.getElementById(sectionId)
        if (element) {
            if (lenis) {
                lenis.scrollTo(element, { offset: -80 })
            } else {
                const headerOffset = 80
                const elementPosition = element.getBoundingClientRect().top
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset
                window.scrollTo({ top: offsetPosition, behavior: "smooth" })
            }
            setActiveSection(sectionId)
        }
    }



    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>
    }

    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/30 selection:text-white">
            <SoundCloudPlayer className="bottom-6 right-6" />

            {/* Image Modal */}
            <ImageModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                imageSrc={selectedImage.src}
                imageAlt={selectedImage.alt}
            />

            {/* Terms Modal */}
            <TermsModal isOpen={termsModalOpen} onClose={() => setTermsModalOpen(false)} />

            {/* Header */}
            <header
                className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? "bg-background/80 backdrop-blur-lg border-b border-neutral-800/50" : "bg-transparent"
                    }`}
            >
                <div className="container flex h-20 items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/" className="text-2xl font-bold font-heading text-white">
                            {settings?.site?.title.split(' ')[0] || 'Pingu'}<span className="text-primary">.</span>
                        </Link>
                    </div>

                    <nav className="hidden md:flex gap-8">
                        {["home", "portfolio", "skills", "reviews", "about", "contact"].map((section) => (
                            <Link
                                key={section}
                                href={`#${section}`}
                                onClick={(e) => scrollToSection(section, e)}
                                className={`nav-link ${activeSection === section ? "nav-link-active" : ""}`}
                            >
                                {section.charAt(0).toUpperCase() + section.slice(1)}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4">
                        <Button className="hidden sm:flex" onClick={(e) => scrollToSection("contact", e)}>
                            Hire Me
                        </Button>

                        <Sheet>
                            <SheetTrigger asChild className="md:hidden">
                                <Button variant="outline" size="icon" className="border-neutral-700/50 text-primary bg-transparent">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="bg-background/95 backdrop-blur-xl border-neutral-800/50">
                                <div className="flex flex-col h-full">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl font-bold font-heading text-white">{settings?.site?.title.split(' ')[0] || 'Pingu'}.</span>
                                        </div>
                                    </div>
                                    <nav className="flex flex-col gap-6">
                                        {["home", "portfolio", "skills", "reviews", "about", "contact"].map((section) => (
                                            <Link
                                                key={section}
                                                href={`#${section}`}
                                                onClick={(e) => scrollToSection(section, e)}
                                                className={`text-lg font-medium transition-colors ${activeSection === section ? "text-primary" : "text-neutral-300 hover:text-white"
                                                    }`}
                                            >
                                                {section.charAt(0).toUpperCase() + section.slice(1)}
                                            </Link>
                                        ))}
                                    </nav>
                                    <div className="mt-auto pt-8">
                                        <Button className="w-full" onClick={(e) => scrollToSection("contact", e)}>
                                            Hire Me
                                        </Button>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </header>

            <main className="flex-1 pt-20">
                {/* Hero Section */}
                <section
                    id="home"
                    ref={(el) => registerSection("home", el)}
                    className="relative min-h-[95vh] flex items-center overflow-hidden"
                >
                    {/* Background elements */}
                    <div className="absolute inset-0 z-0">
                        <div className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-primary/10 blur-[100px] animate-pulse-slow"></div>
                        <div className="absolute bottom-20 left-[5%] w-96 h-96 rounded-full bg-primary/10 blur-[100px] animate-pulse-slow"></div>

                        {/* Grid pattern overlay */}
                        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
                    </div>

                    <div className="container relative z-10 py-16 md:py-32">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
                            <ScrollAnimation animation="fade-in-left" duration="duration-1000">
                                <div className="space-y-6 md:space-y-8">
                                    <div>
                                        <h2 className="text-primary font-bold tracking-widest text-xl md:text-2xl mb-4 flex items-center">
                                            <span className="inline-block w-8 md:w-12 h-[2px] bg-primary mr-3 md:mr-4"></span>
                                            {settings?.hero?.subtitle}
                                        </h2>
                                        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.95] md:leading-[0.9] font-heading mb-6">
                                            {settings?.hero?.title === "Building Immersive Worlds" ? (
                                                <>
                                                    Building <br />
                                                    <span className="text-gradient">Immersive</span> <br />
                                                    Worlds
                                                </>
                                            ) : (
                                                settings?.hero?.title
                                            )}
                                        </h1>
                                    </div>

                                    <p className="text-lg md:text-2xl text-neutral-400 max-w-xl font-light leading-relaxed">
                                        {settings?.hero?.description}
                                    </p>

                                    <div className="flex flex-wrap gap-4 pt-4">
                                        <Button size="lg" className="h-14 px-8 text-base font-semibold tracking-wide" onClick={(e) => scrollToSection("portfolio", e)}>
                                            View Work <ArrowRight className="ml-2 h-5 w-5" />
                                        </Button>
                                        <Button
                                            size="lg"
                                            variant="outline"
                                            className="h-14 px-8 text-base font-semibold tracking-wide bg-transparent border-neutral-800 hover:bg-white/5"
                                        >
                                            <Download className="mr-2 h-5 w-5" /> Download CV
                                        </Button>
                                    </div>
                                </div>
                            </ScrollAnimation>

                            <ScrollAnimation animation="fade-in-right" duration="duration-1000">
                                <div className="relative animate-float">
                                    <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl blur-3xl transform scale-95 translate-y-8"></div>
                                    <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm shadow-2xl shadow-black/50">
                                        <Image
                                            src="/hero-piano-new.jpg"
                                            alt="Grand Piano Build"
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>


                                    </div>
                                </div>
                            </ScrollAnimation>
                        </div>
                    </div>
                </section>

                {/* Portfolio Section */}
                <section
                    id="portfolio"
                    ref={(el) => registerSection("portfolio", el)}
                    className="py-16 md:py-32 relative"
                >
                    <div className="absolute inset-0 z-0">
                        <div className="absolute top-1/4 left-[10%] w-96 h-96 rounded-full bg-primary/5 blur-[120px]"></div>
                        <div className="absolute bottom-1/3 right-[5%] w-64 h-64 rounded-full bg-primary/5 blur-[100px]"></div>
                        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
                    </div>

                    <div className="container relative z-10 space-y-16 md:space-y-20">
                        <ScrollAnimation animation="fade-in-up" duration="duration-700">
                            <div className="max-w-3xl mx-auto text-center space-y-6">
                                <h2 className="text-primary font-mono text-sm tracking-widest uppercase flex items-center justify-center">
                                    <span className="inline-block w-8 h-[1px] bg-primary mr-4"></span>
                                    MY PORTFOLIO
                                    <span className="inline-block w-8 h-[1px] bg-primary ml-4"></span>
                                </h2>
                                <h3 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-white font-heading">
                                    Selected Works
                                </h3>
                            </div>
                        </ScrollAnimation>

                        <Tabs defaultValue="environments" className="w-full">
                            <div className="flex justify-center mb-12 md:mb-16 overflow-x-auto px-4 py-2">
                                <TabsList className="bg-neutral-900/80 backdrop-blur-md p-1.5 rounded-full border border-neutral-800 h-auto">
                                    <TabsTrigger
                                        value="environments"
                                        className="rounded-full px-6 py-2.5 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-white text-neutral-400 transition-all"
                                    >
                                        Environments
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="structures"
                                        className="rounded-full px-6 py-2.5 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-white text-neutral-400 transition-all"
                                    >
                                        Structures
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="interiors"
                                        className="rounded-full px-6 py-2.5 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-white text-neutral-400 transition-all"
                                    >
                                        Interiors
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="models"
                                        className="rounded-full px-6 py-2.5 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-white text-neutral-400 transition-all"
                                    >
                                        Models
                                    </TabsTrigger>
                                </TabsList>
                            </div>

                            {["environments", "structures", "interiors", "models"].map((category) => (
                                <TabsContent key={category} value={category} className="space-y-12">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {getPaginatedItems(category as any).map((build, index) => (
                                            <PortfolioItemCard
                                                key={index}
                                                build={build}
                                                index={index}
                                                delay={`delay-${Math.min(index * 100, 500)}` as any}
                                                onOpenModal={openImageModal}
                                            />
                                        ))}
                                    </div>
                                    <Pagination
                                        category={category as any}
                                        totalPages={(totalPages as any)[category]}
                                        currentPage={(currentPage as any)[category]}
                                        onPageChange={handlePageChange}
                                    />
                                </TabsContent>
                            ))}
                        </Tabs>
                    </div>
                </section>

                {/* Skills Section */}
                <section
                    id="skills"
                    ref={(el) => registerSection("skills", el)}
                    className="py-16 md:py-32 relative bg-neutral-950/50"
                >
                    <div className="absolute inset-0 z-0">
                        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent"></div>
                        <div className="absolute top-1/3 right-[10%] w-96 h-96 rounded-full bg-primary/5 blur-[120px]"></div>
                    </div>

                    <div className="container relative z-10 space-y-16 md:space-y-20">
                        <ScrollAnimation animation="fade-in-up" duration="duration-700">
                            <div className="max-w-3xl mx-auto text-center space-y-6">
                                <h2 className="text-primary font-mono text-sm tracking-widest uppercase flex items-center justify-center">
                                    <span className="inline-block w-8 h-[1px] bg-primary mr-4"></span>
                                    EXPERTISE
                                    <span className="inline-block w-8 h-[1px] bg-primary ml-4"></span>
                                </h2>
                                <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-white font-heading">
                                    My Building Skills
                                </h3>
                            </div>
                        </ScrollAnimation>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {skills.map((skillSet, index) => {
                                const IconComponent = iconMap[skillSet.icon.toLowerCase()] || Zap
                                return (
                                    <ScrollAnimation
                                        key={index}
                                        animation="fade-in-up"
                                        duration="duration-700"
                                        delay={`delay-${Math.min(index * 100, 500)}` as any}
                                    >
                                        <Card className="h-full bg-neutral-900/40 border-neutral-800/50 backdrop-blur-sm overflow-hidden group hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2">
                                            <CardContent className="p-10 space-y-6">
                                                <div className="w-14 h-14 rounded-2xl bg-neutral-800/50 border border-neutral-700/50 flex items-center justify-center text-xl group-hover:bg-primary group-hover:border-primary transition-all duration-500 shadow-lg">
                                                    <IconComponent className="h-7 w-7 text-white group-hover:scale-110 transition-transform duration-500" />
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-bold mb-3 text-white font-heading">
                                                        {skillSet.title}
                                                    </h3>
                                                    <p className="text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors">{skillSet.desc}</p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </ScrollAnimation>
                                )
                            })}
                        </div>
                    </div>
                </section>

                {/* Reviews Section */}
                <section
                    id="reviews"
                    ref={(el) => registerSection("reviews", el)}
                    className="py-16 md:py-32 relative"
                >
                    <div className="absolute inset-0 z-0">
                        <div className="absolute bottom-1/3 left-[10%] w-72 h-72 rounded-full bg-primary/5 blur-[100px]"></div>
                        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
                    </div>

                    <div className="container relative z-10 space-y-16 md:space-y-20">
                        <ScrollAnimation animation="fade-in-up" duration="duration-700">
                            <div className="max-w-3xl mx-auto text-center space-y-6">
                                <h2 className="text-primary font-mono text-sm tracking-widest uppercase flex items-center justify-center">
                                    <span className="inline-block w-8 h-[1px] bg-primary mr-4"></span>
                                    TESTIMONIALS
                                    <span className="inline-block w-8 h-[1px] bg-primary ml-4"></span>
                                </h2>
                                <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-white font-heading">
                                    Client Reviews
                                </h3>
                            </div>
                        </ScrollAnimation>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {reviews.map((review, index) => (
                                <ScrollAnimation
                                    key={index}
                                    animation="fade-in-up"
                                    duration="duration-700"
                                    delay={`delay-${Math.min(index * 100, 500)}` as any}
                                >
                                    <Card className="h-full bg-neutral-900/30 border-neutral-800 backdrop-blur-sm p-8 hover:border-primary/30 transition-all duration-300 flex flex-col">
                                        <div className="flex items-center gap-1 mb-6 text-primary">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-current" : "text-neutral-700"}`} />
                                            ))}
                                        </div>
                                        <div className="mb-6 flex-1">
                                            <Quote className="h-8 w-8 text-neutral-700 mb-4 opacity-50" />
                                            <p className="text-neutral-300 italic leading-relaxed text-lg">"{review.content}"</p>
                                        </div>
                                        <div className="flex items-center justify-between mt-auto pt-6 border-t border-neutral-800/50">
                                            <div className="flex items-center gap-4">
                                                <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${review.avatarColor || "from-neutral-700 to-neutral-600"} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                                                    {review.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-white leading-tight">{review.name}</h4>
                                                    <p className="text-xs text-primary font-medium tracking-wide uppercase">{review.role}</p>
                                                </div>
                                            </div>

                                            {(review.project || review.price) && (
                                                <div className="text-right flex flex-col gap-0.5">
                                                    {review.project && <p className="text-xs text-neutral-400">Project: <span className="text-neutral-200">{review.project}</span></p>}
                                                    {review.price && <p className="text-xs text-neutral-400">Amount: <span className="text-neutral-200">{review.price}</span></p>}
                                                </div>
                                            )}
                                        </div>
                                    </Card>
                                </ScrollAnimation>
                            ))}
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" ref={(el) => registerSection("about", el)} className="py-16 md:py-32 relative">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute bottom-1/4 left-[5%] w-80 h-80 rounded-full bg-primary/5 blur-[100px]"></div>
                    </div>

                    <div className="container relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
                            <ScrollAnimation
                                animation="fade-in-left"
                                duration="duration-1000"
                                className="relative order-2 lg:order-1"
                            >
                                <div className="absolute -inset-4 -z-10 bg-gradient-to-tr from-primary/10 to-transparent rounded-3xl blur-3xl transform scale-95 translate-y-4"></div>
                                <div className="relative aspect-square overflow-hidden rounded-3xl border border-neutral-800 shadow-2xl shadow-black/50 bg-neutral-900">
                                    <Image
                                        src={settings?.about?.profileImage || "/pingu-profile.png"}
                                        alt="Pingu Profile"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full">
                                        <div className="inline-flex px-4 py-1.5 rounded-full bg-primary/20 backdrop-blur-md border border-primary/20 text-xs font-bold text-white mb-4 tracking-wider">
                                            EST. 2020
                                        </div>
                                        <h3 className="text-3xl md:text-4xl font-bold text-white font-heading mb-2">{settings?.about?.name}</h3>
                                        <p className="text-neutral-300">{settings?.about?.experience} Experience</p>
                                    </div>
                                </div>
                            </ScrollAnimation>

                            <ScrollAnimation
                                animation="fade-in-right"
                                duration="duration-1000"
                                className="space-y-8 md:space-y-10 order-1 lg:order-2"
                            >
                                <div>
                                    <h2 className="text-primary font-mono text-sm tracking-widest uppercase flex items-center mb-4">
                                        <span className="inline-block w-8 h-[1px] bg-primary mr-4"></span>
                                        ABOUT ME
                                    </h2>
                                    <h3 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-white font-heading leading-tight">
                                        Passionate Creator. <br />
                                        <span className="text-neutral-500">Dedicated Builder.</span>
                                    </h3>
                                </div>
                                <div className="space-y-6 text-lg text-neutral-400 font-light leading-relaxed">
                                    <p>
                                        Hi, I'm <strong className="text-white font-semibold">{settings?.about?.name}</strong>, a passionate Roblox developer.
                                    </p>
                                    {settings?.about?.bio?.map((paragraph, i) => (
                                        <p key={i}>{paragraph}</p>
                                    ))}
                                </div>

                                <div className="pt-6">
                                    <h4 className="text-lg font-bold text-white font-heading mb-6 uppercase tracking-wider">Why Work With Me?</h4>
                                    <ul className="grid grid-cols-1 gap-4">
                                        {settings?.about?.whyHireMe?.map((item, index) => (
                                            <ScrollAnimation
                                                key={index}
                                                animation="fade-in-left"
                                                duration="duration-500"
                                                delay={`delay-${Math.min(index * 100, 500)}` as any}
                                            >
                                                <li className="flex items-center gap-4 p-4 rounded-xl bg-neutral-900/30 border border-neutral-800/50 hover:bg-neutral-800/50 transition-colors">
                                                    <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                                                    <span className="text-neutral-300">{item}</span>
                                                </li>
                                            </ScrollAnimation>
                                        ))}
                                    </ul>
                                </div>
                            </ScrollAnimation>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section
                    id="contact"
                    ref={(el) => registerSection("contact", el)}
                    className="py-16 md:py-32 relative"
                >
                    <div className="absolute inset-0 z-0">
                        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent"></div>
                        <div className="absolute top-1/4 right-[15%] w-64 h-64 rounded-full bg-primary/5 blur-[100px]"></div>
                        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
                    </div>

                    <div className="container relative z-10 space-y-12 md:space-y-24">
                        <ScrollAnimation animation="fade-in-up" duration="duration-700">
                            <div className="max-w-3xl mx-auto text-center space-y-6">
                                <h2 className="text-primary font-mono text-sm tracking-widest uppercase flex items-center justify-center">
                                    <span className="inline-block w-8 h-[1px] bg-primary mr-4"></span>
                                    GET IN TOUCH
                                    <span className="inline-block w-8 h-[1px] bg-primary ml-4"></span>
                                </h2>
                                <h3 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-white font-heading">
                                    Let's Work Together
                                </h3>
                                <p className="text-xl text-neutral-400 max-w-xl mx-auto font-light">
                                    Have a project in mind? Reach out to discuss how I can help bring your Roblox vision to life.
                                </p>
                            </div>
                        </ScrollAnimation>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
                            {/* Contact Info */}
                            <ScrollAnimation animation="fade-in-left" duration="duration-700">
                                <Card className="h-full bg-neutral-900/30 border-neutral-800 backdrop-blur-md overflow-hidden hover:border-primary/30 transition-all duration-500">
                                    <CardContent className="p-10 space-y-10 flex flex-col h-full">
                                        <div>
                                            <h3 className="text-3xl font-bold mb-3 text-white font-heading">Contact Information</h3>
                                            <p className="text-neutral-400 text-lg">Direct channels for commissions and inquiries.</p>
                                        </div>

                                        <div className="space-y-8 flex-1">
                                            <div className="flex items-center gap-6 group">
                                                <div className="w-16 h-16 rounded-2xl bg-neutral-800/80 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                                    {/* Email Icon */}
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 text-white group-hover:text-primary transition-colors">
                                                        <rect width="20" height="16" x="2" y="4" rx="2" />
                                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-neutral-500 uppercase tracking-wider font-semibold mb-1">Email</p>
                                                    <p className="font-bold text-white text-lg">{settings?.contact?.email || 'Unavailable'}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-6 group">
                                                <div className="w-16 h-16 rounded-2xl bg-neutral-800/80 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                                    {/* Discord Logo */}
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127.14 96.36" className="h-7 w-7 fill-current text-white group-hover:text-primary transition-colors">
                                                        <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.11,77.11,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.82,105.82,0,0,0,126.6,80.22c2.36-24.44-2.54-46.12-18.9-72.15ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-neutral-500 uppercase tracking-wider font-semibold mb-1">Discord</p>
                                                    <p className="font-bold text-white text-lg">{settings?.contact?.discordUsername || 'Unavailable'}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-6 border-t border-neutral-800">
                                            <div className="flex items-center gap-3">
                                                <div className="relative flex h-3 w-3">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                                </div>
                                                <p className="text-neutral-300 font-medium">Currently {settings?.contact?.availability || 'Available'}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </ScrollAnimation>

                            {/* Discord Button */}
                            <ScrollAnimation animation="fade-in-right" duration="duration-700">
                                <Card className="h-full bg-neutral-900/30 border-neutral-800 backdrop-blur-md overflow-hidden hover:border-primary/30 transition-all duration-500 flex flex-col text-center justify-center">
                                    <CardContent className="p-10 space-y-8">
                                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 animate-pulse-slow">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127.14 96.36" className="h-10 w-10 fill-current text-primary">
                                                <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.11,77.11,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.82,105.82,0,0,0,126.6,80.22c2.36-24.44-2.54-46.12-18.9-72.15ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
                                            </svg>
                                        </div>

                                        <div>
                                            <h3 className="text-3xl font-bold mb-3 text-white font-heading">Join Discord Server</h3>
                                            <p className="text-neutral-400 text-lg">The fastest way to get a quote and see more updates.</p>
                                        </div>

                                        <div className="pt-4">
                                            <Button
                                                size="lg"
                                                className="w-full h-16 text-lg font-bold uppercase tracking-wide flex items-center justify-center gap-3"
                                                onClick={() => {
                                                    window.open(settings?.contact?.discordLink || "https://discord.gg/nAFq5RzajF", "_blank")
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127.14 96.36" className="h-6 w-6 fill-current">
                                                    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.11,77.11,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.82,105.82,0,0,0,126.6,80.22c2.36-24.44-2.54-46.12-18.9-72.15ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
                                                </svg> Join Server
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </ScrollAnimation>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-neutral-800/50 py-8 md:py-12">
                    <div className="container px-4 sm:px-6 md:px-0">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
                            <div className="flex items-center gap-3">
                                <span className="text-lg font-bold font-heading text-white">{settings?.site?.title.split(' ')[0] || 'Pingu'}.</span>
                                <button
                                    onClick={() => setTermsModalOpen(true)}
                                    className="text-xs md:text-sm text-neutral-300 hover:text-white transition-colors"
                                >
                                    Terms
                                </button>
                            </div>

                            <p className="text-center text-xs md:text-sm text-neutral-300 md:text-left">
                                © {new Date().getFullYear()} {settings?.site?.title || 'Pingu'}. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    )
}
