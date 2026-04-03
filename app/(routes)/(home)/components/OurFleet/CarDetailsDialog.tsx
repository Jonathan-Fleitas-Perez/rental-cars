"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Car } from "@prisma/client"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Zap, Users, Gauge, Fuel } from "lucide-react"

interface CarDetailsDialogProps {
  car: Car | null
  isOpen: boolean
  onClose: () => void
}

export function CarDetailsDialog({ car, isOpen, onClose }: CarDetailsDialogProps) {
  if (!car) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden bg-background/80 backdrop-blur-xl border-border/50">
        <div className="grid md:grid-cols-2">
          <div className="relative h-[300px] md:h-full bg-muted/20">
            <Image
              src={car.photo}
              alt={car.name}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-contain p-8 drop-shadow-2xl"
            />
          </div>
          <div className="p-8 space-y-8">
            <DialogHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge variant="outline" className="rounded-full uppercase tracking-widest text-[10px] font-black border-primary text-primary">
                  {car.type}
                </Badge>
                <span className="text-2xl font-black text-primary italic">
                  {car.priceDay}€<span className="text-sm text-muted-foreground not-italic font-medium ml-1">/day</span>
                </span>
              </div>
              <DialogTitle className="text-4xl font-black tracking-tighter uppercase italic leading-none">
                {car.name}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground pt-2 font-medium">
                Experience unparalleled performance and luxury in every mile. Our {car.name} is meticulously maintained for your ultimate driving pleasure.
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/50 border border-border/40 group hover:border-primary/30 transition-all">
                <Zap className="w-5 h-5 text-primary" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Power</span>
                  <span className="font-black italic text-[10px]">{car.cv} CV</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/50 border border-border/40 group hover:border-primary/30 transition-all">
                <Gauge className="w-5 h-5 text-primary" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Shift</span>
                  <span className="font-black italic uppercase text-[10px]">{car.transmission}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/50 border border-border/40 group hover:border-primary/30 transition-all">
                <Users className="w-5 h-5 text-primary" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Capacity</span>
                  <span className="font-black italic text-[11px]">{car.people} Pax</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/50 border border-border/40 group hover:border-primary/30 transition-all">
                <Fuel className="w-5 h-5 text-primary" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Fuel</span>
                  <span className="font-black italic uppercase text-[11px]">{car.engine}</span>
                </div>
              </div>
            </div>

            <button 
                onClick={onClose}
                className="w-full py-4 rounded-2xl bg-primary text-white font-black uppercase italic tracking-tighter hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/30"
            >
              Explore and Book
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
