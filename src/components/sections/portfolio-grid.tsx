
"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { portfolioItems, PortfolioItem } from "@/data/portfolio"
import { ZoomIn, ExternalLink } from "lucide-react"
import { ImageModal } from "@/components/image-modal"

// Categories
const categories = [
    { id: "environments", label: "Environments" },
    { id: "structures", label: "Structures" },
    { id: "interiors", label: "Interiors" },
    { id: "models", label: "Models" },
]

export function PortfolioGrid() {
    const [activeCategory, setActiveCategory] = useState("environments")
    const [itemsToShow, setItemsToShow] = useState(6)

    // Modal State
    const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)
    const [modalOpen, setModalOpen] = useState(false)

    // Get current items
    const currentItems = (portfolioItems as any)[activeCategory] as PortfolioItem[] || []
    const visibleItems = currentItems.slice(0, itemsToShow)

    const handleImageClick = (item: PortfolioItem) => {
        setSelectedItem(item)
        setModalOpen(true)
    }

    return (
        <section id="portfolio" className="py-24 bg-background relative">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="flex flex-col items-center text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">Selected <span className="text-primary">Works</span></h2>
                    <p className="text-muted-foreground text-lg max-w-2xl">
                        A curated collection of my best Roblox builds, ranging from atmospheric environments to intricate mechanical models.
                    </p>
                </div>

                <Tabs defaultValue="environments" className="w-full flex flex-col items-center" onValueChange={(val) => {
                    setActiveCategory(val)
                    setItemsToShow(6) // Reset pagination on category switch
                }}>
                    <TabsList className="mb-12 bg-secondary/30 p-1 rounded-full border border-white/5 flex-wrap h-auto justify-center gap-2">
                        {categories.map((cat) => (
                            <TabsTrigger
                                key={cat.id}
                                value={cat.id}
                                className="rounded-full px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
                            >
                                {cat.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="w-full"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[300px] gap-4 w-full">
                                {visibleItems.map((item: PortfolioItem, i) => (
                                    <PortfolioCard
                                        key={item.id}
                                        item={item}
                                        index={i}
                                        onClick={() => handleImageClick(item)}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {visibleItems.length < currentItems.length && (
                        <div className="mt-12">
                            <Button
                                variant="outline"
                                size="lg"
                                className="rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-primary transition-all backdrop-blur-md"
                                onClick={() => setItemsToShow(prev => prev + 6)}
                            >
                                Load More Projects
                            </Button>
                        </div>
                    )}
                </Tabs>
            </div>

            <ImageModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                imageSrc={selectedItem?.image || ""}
                imageAlt={selectedItem?.title || ""}
            />
        </section>
    )
}

function PortfolioCard({ item, index, onClick }: { item: PortfolioItem, index: number, onClick: () => void }) {
    // Bento Logic: Every 4th item spans 2 columns (0, 3, 6...) - simplified pattern
    const isLarge = index % 4 === 0 || index % 4 === 3;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`group relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 shadow-lg cursor-pointer hover:border-primary/50 transition-colors duration-500 ${isLarge ? "md:col-span-2" : "md:col-span-1"}`}
            onClick={onClick}
        >
            <div className="absolute inset-0 z-0">
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                    sizes={isLarge ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 z-10" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <div className="mb-2">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">{item.category}</span>
                </div>
                <h3 className="font-bold font-heading text-2xl text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-300 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{item.description}</p>
            </div>

            {/* Hover Icon */}
            <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <ZoomIn className="w-5 h-5 text-white" />
                </div>
            </div>
        </motion.div>
    )
}
