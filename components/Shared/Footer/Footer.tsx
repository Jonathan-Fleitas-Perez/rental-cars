"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Car } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full bg-background border-t border-border mt-20 pt-16 pb-8">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="space-y-6">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform">
                        <Car className="w-6 h-6" />
                    </div>
                    <span className="text-xl font-black uppercase italic tracking-tighter">Rental <span className="text-primary">Cars</span></span>
                </Link>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                    Providing the most exclusive automotive experiences since 2024. Elevate your journey with our premier fleet.
                </p>
                <div className="flex gap-4">
                    <Link href="#" className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                        <Facebook className="w-4 h-4" />
                    </Link>
                    <Link href="#" className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                        <Instagram className="w-4 h-4" />
                    </Link>
                    <Link href="#" className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                        <Twitter className="w-4 h-4" />
                    </Link>
                    <Link href="#" className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                        <Youtube className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            <div className="space-y-6">
                <h4 className="font-black uppercase italic tracking-widest text-xs text-primary">Discover</h4>
                <div className="flex flex-col gap-3">
                    <Link href="/cars" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Our Fleet</Link>
                    <Link href="/reserves" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Reservations</Link>
                    <Link href="/loved-cars" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Favorites</Link>
                    <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Dashboard</Link>
                </div>
            </div>

            <div className="space-y-6">
                <h4 className="font-black uppercase italic tracking-widest text-xs text-primary">Support</h4>
                <div className="flex flex-col gap-3">
                    <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Help Center</Link>
                    <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Safety</Link>
                    <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
                    <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
                </div>
            </div>

            <div className="space-y-6">
                <h4 className="font-black uppercase italic tracking-widest text-xs text-primary">Join the Elite</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    Subscribe to get exclusive access to our newest luxury additions and special offers.
                </p>
                <div className="flex gap-2">
                    <input 
                        type="email" 
                        placeholder="Email" 
                        className="bg-muted border border-transparent rounded-xl px-4 py-3 text-sm focus:border-primary outline-none transition-all flex-1"
                    />
                    <button className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">
                        Join
                    </button>
                </div>
            </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-[0.2em]">
                © 2024 Rental Cars Premium. All rights reserved.
            </span>
            <div className="flex gap-6">
                <span className="text-[10px] font-black uppercase italic tracking-tighter text-muted-foreground/50">Excellence in Motion</span>
            </div>
        </div>
    </footer>
  )
}
