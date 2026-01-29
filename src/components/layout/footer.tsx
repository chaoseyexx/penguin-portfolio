
import Link from "next/link"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-secondary/20 border-t border-border/50 pt-20 pb-10">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="text-2xl font-bold font-heading text-primary tracking-tighter mb-4 block">
                            BMG<span className="text-foreground">.</span>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                            Crafting immersive digital experiences and high-fidelity Roblox environments for the next generation of gaming.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Navigation</h4>
                        <ul className="space-y-4">
                            <li><Link href="#home" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
                            <li><Link href="#portfolio" className="text-sm text-muted-foreground hover:text-primary transition-colors">Portfolio</Link></li>
                            <li><Link href="#services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Services</Link></li>
                            <li><Link href="#reviews" className="text-sm text-muted-foreground hover:text-primary transition-colors">Reviews</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Legal</h4>
                        <ul className="space-y-4">
                            <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Connect</h4>
                        <div className="flex gap-4">
                            <Link href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all">
                                <Twitter className="w-4 h-4" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all">
                                <Github className="w-4 h-4" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all">
                                <Linkedin className="w-4 h-4" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all">
                                <Mail className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground text-center md:text-left">
                        © {new Date().getFullYear()} Pingu. All rights reserved.
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                        Designed by <span className="text-primary font-medium">ChaosLabs</span>
                    </p>
                </div>
            </div>
        </footer>
    )
}
