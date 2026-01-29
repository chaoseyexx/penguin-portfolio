
"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MessageSquare, Calendar, Send } from "lucide-react"

export function Contact() {
    return (
        <section id="contact" className="py-24 relative overflow-hidden bg-black">
            {/* Background elements */}
            <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
            <div className="absolute -left-20 top-40 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -right-20 bottom-40 w-72 h-72 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight"
                    >
                        Let's <span className="text-gradient">Collaborate</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-muted-foreground text-lg"
                    >
                        Ready to bring your vision to life? Whether you need a full map, a specific structure, or just some advice, I'm here to help.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-4 col-span-1"
                    >
                        <Card className="bg-white/5 border-white/10 backdrop-blur-md">
                            <CardContent className="p-6 flex items-start gap-4">
                                <div className="bg-primary/20 p-3 rounded-lg text-primary">
                                    <Mail className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold mb-1 text-white">Discord</h3>
                                    <p className="text-sm text-muted-foreground break-all">penguin57746</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card
                            className="bg-white/5 border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors cursor-pointer group"
                            onClick={() => window.open('https://discord.gg/nAFq5RzajF', '_blank')}
                        >
                            <CardContent className="p-6 flex items-start gap-4">
                                <div className="bg-[#5865F2]/20 p-3 rounded-lg text-[#5865F2] group-hover:scale-110 transition-transform">
                                    <MessageSquare className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold mb-1 text-white">Discord Server</h3>
                                    <p className="text-sm text-muted-foreground">Join for Commissions</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-emerald-900/10 border-emerald-500/20 backdrop-blur-md">
                            <CardContent className="p-6 flex items-start gap-4">
                                <div className="bg-emerald-500/20 p-3 rounded-lg text-emerald-500">
                                    <Calendar className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold mb-1 text-emerald-500">Available</h3>
                                    <p className="text-sm text-emerald-500/80">Open for new projects</p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="col-span-1 md:col-span-2"
                    >
                        <Card className="bg-white/5 border-white/10 backdrop-blur-md h-full">
                            <CardContent className="p-8">
                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-muted-foreground">Name</label>
                                            <Input placeholder="John Doe" className="bg-black/20 border-white/10 focus:border-primary/50 text-white placeholder:text-white/20 h-11" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-muted-foreground">Email</label>
                                            <Input placeholder="john@example.com" className="bg-black/20 border-white/10 focus:border-primary/50 text-white placeholder:text-white/20 h-11" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">Project Type</label>
                                        <Input placeholder="Map Design, Scripting, Full Game..." className="bg-black/20 border-white/10 focus:border-primary/50 text-white placeholder:text-white/20 h-11" />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">Message</label>
                                        <Textarea
                                            placeholder="Tell me about your project..."
                                            className="min-h-[150px] bg-black/20 border-white/10 focus:border-primary/50 text-white placeholder:text-white/20 resize-none"
                                        />
                                    </div>

                                    <Button className="w-full h-12 text-lg bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25">
                                        Send Message <Send className="ml-2 h-4 w-4" />
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
