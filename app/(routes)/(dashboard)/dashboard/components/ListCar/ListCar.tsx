"use client"
import Image from "next/image";
import { ListCarProps } from "./ListCar.types";
import { Car } from "@prisma/client";
import { Heart } from "lucide-react";
import { ModalAddReservation } from "@/components/Shared/ModalAddReservation";
import { CarCard } from "@/components/Shared/CarCard";
import { useLovedCars } from "@/hooks/use-loved-cars";

export  function ListCar(props:ListCarProps) {
    const {cars}=props;
    const {addLovedItem,lovedItems,removeLovedItem}=useLovedCars();

  return (
    <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-4">
        {cars.map((car : Car)=>{
            const {priceDay,photo,cv ,engine,name,people,transmission,id,type}=car;
            const likedCar=lovedItems.some((item)=>item.id===car.id);

            return (
                <CarCard key={car.id} car={car}>
                  <div className="flex items-center justify-center gap-x-3 mt-2">
                        <ModalAddReservation car={car}/>
                      <Heart 
                      className={`mt-2 cursor-pointer ${likedCar && "fill-black"}`} 
                      onClick={
                          likedCar
                          ?()=>removeLovedItem(car.id)
                          :()=>addLovedItem(car)
                          }/>
                  </div>
                </CarCard>
            );
        })}
    </div>
  )
}
