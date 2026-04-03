"use client"

import Image from "next/image";
import { Car } from "@prisma/client";
import { Fuel, Gauge, Users, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion } from "framer-motion";

interface CarCardProps {
  car: Car;
  className?: string;
  children?: React.ReactNode;
  badge?: React.ReactNode;
}

export function CarCard({ car, className, children, badge }: CarCardProps) {
  const { priceDay, photo, cv, engine, name, people, transmission, type } = car;

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className={cn(
        "group relative p-1 rounded-3xl shadow-sm transition-all bg-card text-card-foreground border border-border/50 overflow-hidden hover:shadow-2xl",
        className
      )}
    >
      <Link href={`/cars/${car.id}`}>
        <div className="relative w-full aspect-16/10 overflow-hidden rounded-2xl">
          <Image 
            src={photo} 
            alt={name} 
            fill 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            priority
          />
          {badge && <div className="absolute top-3 right-3 z-20">{badge}</div>}
        </div>
      </Link>

      <div className="p-5">
        <Link href={`/cars/${car.id}`}>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-black tracking-tighter truncate max-w-[150px] uppercase italic leading-none mb-1">{name}</h3>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{type}</p>
                </div>
                <div className="text-right">
                    <p className="text-xl font-black text-primary leading-none">{priceDay}€</p>
                    <p className="text-[9px] uppercase text-muted-foreground font-black tracking-widest">per day</p>
                </div>
            </div>
        </Link>


        <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-6 border-y border-border/20 py-4 mt-2">
            <div className="flex items-center text-[11px] font-bold text-muted-foreground uppercase tracking-tighter">
                <Users className="w-3.5 h-3.5 mr-2 text-primary opacity-60" strokeWidth={2.5} />
                <span>{people} Seats</span>
            </div>
            <div className="flex items-center text-[11px] font-bold text-muted-foreground uppercase tracking-tighter">
                <Wrench className="w-3.5 h-3.5 mr-2 text-primary opacity-60" strokeWidth={2.5} />
                <span className="truncate">{transmission}</span>
            </div>
            <div className="flex items-center text-[11px] font-bold text-muted-foreground uppercase tracking-tighter">
                <Fuel className="w-3.5 h-3.5 mr-2 text-primary opacity-60" strokeWidth={2.5} />
                <span className="truncate">{engine}</span>
            </div>
            <div className="flex items-center text-[11px] font-bold text-muted-foreground uppercase tracking-tighter">
                <Gauge className="w-3.5 h-3.5 mr-2 text-primary opacity-60" strokeWidth={2.5} />
                <span>{cv} CV</span>
            </div>
        </div>

        {children}
      </div>
    </motion.div>
  );
}
