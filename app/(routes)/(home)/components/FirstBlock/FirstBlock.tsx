"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function FirstBlock() {
  return (
    <section className="w-full relative bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 py-12 lg:py-24">
        <div className="grid lg:grid-cols-2 items-center gap-12 min-h-[600px]">
          <div className="space-y-10 text-center lg:text-left z-10">
            <div className="space-y-4">
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-primary font-black uppercase tracking-[0.4em] text-xs lg:text-sm"
              >
                Exclusive Experience
              </motion.p>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                className="text-5xl md:text-7xl lg:text-[8rem] font-black leading-[0.8] tracking-tighter flex z-50 flex-col uppercase"
              >
                <span className="block italic text-transparent bg-clip-text bg-linear-to-b from-foreground to-foreground/50">Luxury</span>
                <span className="block">Fleet</span>
              </motion.h1>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="space-y-8 max-w-lg mx-auto lg:mx-0"
            >
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed font-medium">
                Redefining the art of travel. Access the world's most <span className="text-foreground font-bold">prestigious automotive masterpieces</span> with a service that exceeds every expectation.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary text-primary-foreground px-10 py-5 rounded-full font-black uppercase italic tracking-tighter text-lg shadow-2xl shadow-primary/40"
                >
                  Book Your Drive
                </motion.button>
                <motion.button 
                  whileHover={{ backgroundColor: "var(--muted)" }}
                  className="border border-border bg-background/50 backdrop-blur-md text-foreground px-10 py-5 rounded-full font-black uppercase italic tracking-tighter text-lg transition-colors"
                >
                  The Collection
                </motion.button>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="flex justify-center items-center"
          >
            {/* Ambient Background Blur */}
            <div className="absolute w-full h-full bg-primary/10 rounded-full blur-[100px]  animate-pulse" />
            
            <motion.div 
              animate={{ 
                y: [0, -25, 0],
                rotate: [3, 2, 3]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="relative w-full aspect-square lg:aspect-video flex items-center justify-center pointer-events-none select-none"
            >
              <Image 
                src="/images/ca1.png" 
                alt="Premium Car" 
                fill
                priority 
                sizes="(max-width: 668px) 100vw, 800px"
                className="object-contain drop-shadow-[0_45px_55px_rgba(0,0,0,0.6)] scale-110 lg:scale-125"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
