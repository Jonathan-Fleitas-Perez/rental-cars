"use client"

import { motion } from "framer-motion"

export default function Loading() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/80 backdrop-blur-md"
    >
      <div className="w-64 h-1 bg-muted rounded-full overflow-hidden relative">
        <motion.div 
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute inset-0 bg-primary w-full"
        />
      </div>
      <p className="mt-4 text-[10px] font-black animate-pulse text-muted-foreground uppercase tracking-[0.4em]">
        Excellence is arriving
      </p>
    </motion.div>
  )
}
