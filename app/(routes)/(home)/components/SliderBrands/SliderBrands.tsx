"use client"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
import {Carousel,CarouselContent,CarouselItem} from "@/components/ui/carousel"
import {dataBrands} from "./SliderBrands.data"
import { Reveal } from "@/components/Shared/Reveal"

export  function SliderBrands() {
  return (
    <Reveal classname="flex gap-x-20 justify-center lg:pb-20 mt-5 mb-10" position="bottom" >
        <Carousel 
        className="w-full max-w-6xl mx-auto"
        plugins={[
            Autoplay({
                delay:2500,
            })
        ]}
        >
            <CarouselContent>
                {dataBrands.map(({url})=>(
                    <CarouselItem key={url} className="basis-4/4 md:basis-2/4 lg:basis-1/6">
                        <Image src={`/images/logosCars/${url}`} alt="Brand" width={100} height={100} className="object-contain aspect-[3/2]" />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    </Reveal>
  )
}
