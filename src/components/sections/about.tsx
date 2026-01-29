"use client"

import { motion } from "framer-motion"
import { Code, Cuboid, Layout, Palette, Zap } from "lucide-react"

const skills = [
    { name: "Map Design", icon: Layout, desc: "Immersive worlds designed for gameplay flow." },
    { name: "3D Modeling", icon: Cuboid, desc: "High-fidelity assets optimized for performance." },
    { name: "Lighting", icon: Zap, desc: "Atmospheric lighting that sets the mood." },
    { name: "Texturing", icon: Palette, desc: "Custom physically based rendering textures." },
    { name: "Scripting", icon: Code, desc: "Basic interactivity and game logic." },
]

export function About() {
    return (
        <section id="services" className="py-32 relative overflow-hidden bg-black/50">
            {/* Background Gradient */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight">
                                Crafting <span className="text-gradient">Digital Experiences</span>
                            </h2>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                I don't just build maps; I engineer experiences. With over 3 years of specialized development on the Roblox platform,
                                I bring a unique blend of architectural precision and artistic flair to every project.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <p className="text-muted-foreground">
                                My workflow combines industry-standard tools like Blender and Substance Painter with Roblox Studio's native capabilities
                                to push the boundaries of what's possible on the platform.
                            </p>
                            <div className="flex gap-4 pt-4">
                                <div className="flex flex-col">
                                    <span className="text-4xl font-bold text-white">50+</span>
                                    <span className="text-sm text-muted-foreground uppercase tracking-wider">Projects</span>
                                </div>
                                <div className="w-px h-12 bg-white/10" />
                                <div className="flex flex-col">
                                    <span className="text-4xl font-bold text-white">100%</span>
                                    <span className="text-sm text-muted-foreground uppercase tracking-wider">Satisfaction</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {skills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all duration-300"
                            >
                                <div className="mb-4 p-3 w-fit rounded-xl bg-primary/20 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                    <skill.icon size={24} />
                                </div>
                                <h3 className="font-bold text-lg text-white mb-2">{skill.name}</h3>
                                <p className="text-sm text-muted-foreground">{skill.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
