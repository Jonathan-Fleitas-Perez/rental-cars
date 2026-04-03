"use client"

import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { dataBrands } from "./SliderBrands.data"
import { Reveal } from "@/components/Shared/Reveal"

export function SliderBrands() {
  return (
    <section className="w-full bg-zinc-50/50 dark:bg-zinc-950/50 py-12 lg:py-20 border-y border-border/50">
      <div className="max-w-[1200px] mx-auto px-6">
        <Reveal classname="flex items-center justify-center" position="bottom" delay={0.1}>
          <Carousel 
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 2000,
              })
            ]}
          >
            <CarouselContent className="-ml-4 flex items-center">
              {dataBrands.map(({ url }) => (
                <CarouselItem key={url} className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 flex justify-center items-center">
                  <div className="relative w-32 h-26  transition-all duration-500 cursor-pointer">
                    <Image 
                      src={`/images/logosCars/${url}`} 
                      alt="Brand Logo" 
                      fill
                      sizes="(max-width: 768px) 100px, 150px"
                      className="object-contain"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </Reveal>
      </div>
    </section>
  )
}
