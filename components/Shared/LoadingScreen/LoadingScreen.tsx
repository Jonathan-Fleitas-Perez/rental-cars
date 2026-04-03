"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"

export function LoadingScreen() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ 
                        opacity: 0,
                        transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }
                    }}
                    className="fixed inset-0 z-[999] flex items-center justify-center bg-background backdrop-blur-3xl overflow-hidden"
                >
                    <div className="relative flex flex-col items-center gap-12">
                        {/* Background glow animation */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" 
                        />
                        
                        <div className="relative">
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ 
                                    scale: [0.9, 1.05, 1],
                                    opacity: 1 
                                }}
                                transition={{ 
                                    duration: 1.5,
                                    ease: "easeOut",
                                }}
                                className="relative w-32 h-32 lg:w-48 lg:h-48"
                            >
                                <Image 
                                    src="/logo.svg" 
                                    alt="Rental Cars Logo" 
                                    fill
                                    priority
                                    className="object-contain drop-shadow-[0_0_30px_rgba(var(--primary),0.3)] brightness-0 dark:invert"
                                />
                            </motion.div>
                            
                            {/* Orbital Ring animation */}
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                className="absolute -inset-8 border border-primary/10 rounded-full"
                            />
                        </div>

                        <div className="flex flex-col items-center gap-4 z-10">
                             <div className="w-[120px] h-[1px] bg-primary/20 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ x: "-100%" }}
                                    animate={{ x: "0%" }}
                                    transition={{ duration: 2.5, ease: "easeInOut" }}
                                    className="h-full bg-primary"
                                />
                             </div>
                             <motion.span 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 1 }}
                                className="text-[10px] font-black uppercase tracking-[0.8em] text-muted-foreground ml-[0.8em]"
                             >
                                Excellence Awaits
                             </motion.span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
