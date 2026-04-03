"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export function DriveToday() {
  return (
    <section 
      id="cta"
      className="w-full bg-white dark:bg-zinc-950 py-12 lg:py-24 overflow-hidden"
    >
        <div className="max-w-[1200px] mx-auto px-6">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                className="bg-zinc-950 border border-white/10 rounded-[3rem] p-8 lg:p-20 relative overflow-hidden group shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]"
            >
                {/* Ambient decorative elements */}
                <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-transparent to-transparent opacity-40 pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none group-hover:bg-primary/20 transition-colors duration-1000" />
                
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16 lg:gap-24 relative z-10">
                    {/* Content Column */}
                    <div className="space-y-10 text-center lg:text-left">
                        <div className="space-y-4">
                            <motion.p 
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                                className="text-primary font-black uppercase tracking-[0.4em] text-xs"
                            >
                                Final Step
                            </motion.p>
                            <motion.h3 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                                className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase italic tracking-tighter leading-tight"
                            >
                                Drive your <br />
                                <span className="text-primary">dream car</span> today
                            </motion.h3>
                        </div>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 1 }}
                            className="text-zinc-400 text-lg lg:text-xl font-medium leading-relaxed max-w-sm mx-auto lg:mx-0"
                        >
                            Join our exclusive circle. Register now and gain immediate access to our premium fleet.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            <Link href="/sign-up" className="block w-fit mx-auto lg:mx-0">
                                <Button size="lg" className="rounded-full px-12 py-8 text-xl font-black uppercase italic tracking-tighter shadow-2xl shadow-primary/30 bg-primary hover:scale-105 transition-all active:scale-95">
                                    Register Now
                                </Button>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Image Column */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
                        className="flex justify-center lg:justify-end relative"
                    >
                        <div className="relative w-full aspect-16/10 transform transition-transform duration-1000 group-hover:scale-105">
                            <div className="absolute inset-x-12 bottom-0 h-4 bg-black/60 blur-3xl rounded-full scale-x-75" />
                            <Image 
                                src="/images/car2.png"
                                alt="Luxury Car CTA"
                                fill
                                sizes="(max-width: 1024px) 100vw, 600px"
                                className="object-contain drop-shadow-[0_45px_65px_rgba(0,0,0,0.9)]"
                            />
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    </section>
  )
}
