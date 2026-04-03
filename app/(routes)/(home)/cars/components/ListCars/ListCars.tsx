"use client"
import { ListCarsProps } from "./ListCars.types";
import { Button } from "@/components/ui/button";
import {Heart} from 'lucide-react';
import {useLovedCars} from '@/hooks/use-loved-cars'
import { CarCard } from '@/components/Shared/CarCard';
import { useAuth } from "@clerk/nextjs";
import { Car } from "@prisma/client";
import Link from "next/link";
import { ModalAddReservation } from "@/components/Shared/ModalAddReservation";
import { SkeletonCars } from "@/components/Shared/SkeletonCars";

export  function ListCars(props:ListCarsProps) {
    const {cars} = props;
    const {userId}=useAuth();
    const {addLovedItem,lovedItems,removeLovedItem}=useLovedCars();

    if(!cars){
        return <SkeletonCars/>
    }

  return (
    <>
    {cars.length===0 &&(<p>No se ha encontrado ningun vehiculo con estos filtros</p>)}
    <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-4">
        {cars.map((car:Car)=>{
            const {priceDay,photo,name,type,transmission,people,engine,cv,id}= car;
            const likedCar = lovedItems.some((item)=>item.id===car.id);

            return (
                <CarCard key={car.id} car={car}>
                  {userId
                  ?(
                      <div className="flex items-center justify-center gap-x-3 mt-2">
                          <ModalAddReservation car={car}/>
                          <Heart className={`mt-2 cursor-pointer ${likedCar ? "fill-black" : ""}`}
                          onClick={likedCar?()=>removeLovedItem(car.id):()=>addLovedItem(car)}
                          />
                      </div>    
                  )
                  :(
                      <div className="w-full mt-2 text-center">
                          <Link href="/sign-in">
                              <Button variant="outline">Inicia sesion para reservar</Button>
                          </Link>
                      </div>
                  )}
                </CarCard>
            )
        })}
    </div>
    </>
  )
}
