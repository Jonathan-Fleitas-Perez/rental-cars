"use client"

import { motion } from "framer-motion"
import { RevealProps } from "./Reveal.types"

export function Reveal({ children, position, classname, delay = 0.2 }: RevealProps) {
    return (
        <motion.div
            className={classname}
            initial={{ 
                opacity: 0, 
                y: position === "bottom" ? 40 : 0,
                x: position === "right" ? 40 : 0
            }}
            whileInView={{ 
                opacity: 1, 
                y: 0,
                x: 0
            }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
                duration: 0.8, 
                delay: delay,
                ease: [0.21, 0.47, 0.32, 0.98]
            }}
        >
            {children}
        </motion.div>
    )
}
