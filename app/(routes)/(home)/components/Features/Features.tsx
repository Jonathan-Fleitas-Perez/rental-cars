"use client"

import { motion } from "framer-motion"
import { dataFeatures } from "./Features.data"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
}

export function Features() {
  return (
    <section 
      id="features"
      className="w-full bg-white dark:bg-zinc-950 py-24 lg:py-40 overflow-hidden"
    >
        <div className="max-w-[1200px] mx-auto px-6">
            <motion.header 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="feature-header space-y-4 mb-16 lg:mb-24 text-center lg:text-left"
            >
                <p className="text-primary font-black uppercase tracking-[0.4em] text-xs">Excellence Guaranteed</p>
                <h2 className="text-4xl lg:text-8xl font-black tracking-tighter leading-none uppercase italic border-l-8 border-primary pl-6 py-2">
                    Premier <br /> 
                    <span className="text-muted-foreground/30 text-5xl lg:text-6xl">Standards</span>
                </h2>
                <p className="max-w-xl text-lg lg:text-xl text-muted-foreground leading-relaxed font-medium">
                    Our commitment to perfection ensures your journey is as remarkable as the vehicles you drive. Experience the peak of automotive hospitality.
                </p>
            </motion.header>

            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
            >
                {dataFeatures.map(({ icon: Icon, text }) => (
                    <motion.article 
                        key={text} 
                        variants={itemVariants}
                        whileHover={{ y: -10 }}
                        className="feature-card group relative p-10 rounded-[2.5rem] bg-zinc-50 dark:bg-white/5 border border-border/50 backdrop-blur-3xl hover:border-primary/30 hover:shadow-2xl transition-all duration-500 flex flex-col items-center lg:items-center text-left lg:text-center overflow-hidden"
                    >
                        <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all pointer-events-none" />
                        
                        <div className="rounded-3xl bg-primary/5 w-20 h-20 mb-8 flex justify-center items-center group-hover:scale-110 group-hover:bg-primary group-hover:rotate-6 transition-all duration-500 border border-primary/20 shadow-xl shadow-primary/5">
                            <Icon className="w-10 h-10 text-primary group-hover:text-white transition-colors duration-500"/>
                        </div>
                        
                        <div className="space-y-4 flex flex-col items-center justify-center text-center">
                            <h3 className="font-black text-2xl lg:text-3xl tracking-tighter leading-[1.1] uppercase italic">{text}</h3>
                            <div className="w-8 h-1 bg-primary/30 rounded-full lg:mx-auto group-hover:w-16 group-hover:bg-primary transition-all duration-500" />
                        </div>
                    </motion.article>
                ))}
            </motion.div>
        </div>
    </section>
  )
}
