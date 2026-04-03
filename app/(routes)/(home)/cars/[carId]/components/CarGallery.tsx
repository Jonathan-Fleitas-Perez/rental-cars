"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface CarGalleryProps {
  mainPhoto: string
  images: { id: string, url: string }[]
}

export function CarGallery({ mainPhoto, images }: CarGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(mainPhoto)

  const allImages = [mainPhoto, ...images.map(img => img.url)]

  return (
    <div className="space-y-4">
      <div className="aspect-16/10 relative overflow-hidden rounded-2xl border shadow-sm bg-muted">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            <Image
              src={selectedImage}
              alt="Car Image"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
        {allImages.map((url, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(url)}
            className={cn(
              "relative shrink-0 w-24 h-24 rounded-lg border-2 overflow-hidden transition-all",
              selectedImage === url ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
            )}
          >
            <Image 
                src={url} 
                alt={`Thumbnail ${index}`} 
                fill 
                sizes="96px"
                className="object-cover" 
            />
          </button>
        ))}
      </div>
    </div>
  )
}
