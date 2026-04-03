"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MoveRight, Star, Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Car } from "@prisma/client"
import { CarDetailsDialog } from "./CarDetailsDialog"

const DEFAULT_CARS: Car[] = [
    {
        id: "1",
        userId: "admin",
        name: "Ferrari F8 Tributo",
        cv: "720",
        transmission: "Automatic",
        people: "2",
        photo: "/images/cars/ferrari.png",
        priceDay: "1200",
        engine: "Gasoline",
        type: "Luxe",
        isPublish: true,
        isSold: false,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "2",
        userId: "admin",
        name: "Lamborghini Huracán",
        cv: "640",
        transmission: "Automatic",
        people: "2",
        photo: "/images/cars/lamborghini.png",
        priceDay: "1100",
        engine: "Gasoline",
        type: "Luxe",
        isPublish: true,
        isSold: false,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "3",
        userId: "admin",
        name: "Porsche 911 Turbo S",
        cv: "650",
        transmission: "Automatic",
        people: "4",
        photo: "/images/cars/porsche.png",
        priceDay: "900",
        engine: "Gasoline",
        type: "Coupe",
        isPublish: true,
        isSold: false,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "4",
        userId: "admin",
        name: "Tesla Model S Plaid",
        cv: "1020",
        transmission: "Automatic",
        people: "5",
        photo: "/images/cars/tesla.png",
        priceDay: "600",
        engine: "Electric",
        type: "Sedan",
        isPublish: true,
        isSold: false,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "5",
        userId: "admin",
        name: "Mercedes AMG GT",
        cv: "585",
        transmission: "Automatic",
        people: "2",
        photo: "/images/OurFleetCars/OurFleet5.png",
        priceDay: "750",
        engine: "Gasoline",
        type: "Luxe",
        isPublish: true,
        isSold: false,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "6",
        userId: "admin",
        name: "Audi R8 Performance",
        cv: "620",
        transmission: "Automatic",
        people: "2",
        photo: "/images/OurFleetCars/OurFleet1.png",
        priceDay: "800",
        engine: "Gasoline",
        type: "Luxe",
        isPublish: true,
        isSold: false,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
}

export function OurFleet() {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    fetch("/api/car")
      .then(res => res.json())
      .then(data => {
          const published = data.filter((c: Car) => c.isPublish);
          if (published.length === 0) {
              setCars(DEFAULT_CARS);
          } else {
              setCars(published.slice(0, 6));
          }
      })
      .catch(() => {
          setCars(DEFAULT_CARS);
      });
  }, []);

  return (
    <section 
      id="fleet"
      className="w-full bg-zinc-950 py-24 lg:py-40 overflow-hidden"
    >
        <div className="max-w-[1200px] mx-auto px-6">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="space-y-6 mb-20 text-center lg:text-left"
            >
                <div className="space-y-2">
                    <p className="text-primary font-black uppercase tracking-[0.4em] text-xs">Selection Excellence</p>
                    <h2 className="text-4xl lg:text-8xl font-black tracking-tighter leading-none uppercase italic text-white">
                        Top <span className="text-zinc-800">Demanded</span>
                    </h2>
                </div>
                <p className="text-lg lg:text-xl text-zinc-400 max-w-2xl font-medium leading-relaxed">
                    Discover our most sought-after masterpieces. These vehicles define the peak of our collection and are favored by our most discerning clients.
                </p>
            </motion.div>

            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                {cars.map((car) => (
                    <motion.article 
                        key={car.id} 
                        variants={cardVariants}
                        onClick={() => setSelectedCar(car)}
                        whileHover={{ y: -10 }}
                        className="fleet-card group cursor-pointer relative p-8 rounded-[3rem] bg-zinc-900/50 border border-white/5 hover:bg-zinc-900 transition-all duration-500 overflow-hidden shadow-2xl"
                    >
                        <div className="absolute top-6 left-6 flex items-center gap-1 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/5 z-10">
                            <Star className="w-3 h-3 fill-primary text-primary" />
                            <span className="text-[10px] font-black uppercase tracking-tighter italic text-white">Top choice</span>
                        </div>

                        <div className="relative aspect-video mb-8 transform group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                            <Image 
                                src={car.photo} 
                                alt={car.name} 
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
                            />
                        </div>

                        <div className="space-y-4 text-center lg:text-left">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">{car.type}</span>
                                <h3 className="text-2xl font-black uppercase italic tracking-tighter leading-none text-white">{car.name}</h3>
                            </div>
                            
                            <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                <div className="flex gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest leading-none">Power</span>
                                        <span className="text-xs font-black italic text-zinc-300">{car.cv} CV</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest leading-none">Price</span>
                                        <span className="text-xs font-black italic text-zinc-300">{car.priceDay}€</span>
                                    </div>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/30">
                                    <Plus className="w-5 h-5" />
                                </div>
                            </div>
                        </div>
                    </motion.article>
                ))}
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-20 text-center"
            >
                <Link href="/cars">
                    <Button size="lg" className="rounded-full px-12 py-8 text-xl font-black uppercase italic tracking-tighter hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/40">
                        Explore Full Catalog <MoveRight className="ml-3 w-6 h-6" />
                    </Button>
                </Link>
            </motion.div>
        </div>

        <CarDetailsDialog 
            car={selectedCar} 
            isOpen={!!selectedCar} 
            onClose={() => setSelectedCar(null)} 
        />
    </section>
  )
}
