"use client";
import { useLovedCars } from "@/hooks/use-loved-cars";
import { Car } from "@prisma/client";
import { Heart } from "lucide-react";
import { ModalAddReservation } from "@/components/Shared/ModalAddReservation";
import { CarCard } from "@/components/Shared/CarCard";

export function ListLovedCars() {
  const { lovedItems, removeLovedItem } = useLovedCars();

  return (
    <>
      {lovedItems.length === 0 ? (
        <h2>Aun no dispones de coches que te gustan</h2>
      ) : (
        <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-4">
          {lovedItems.map((car: Car) => {
            const {
              priceDay,
              photo,
              cv,
              engine,
              name,
              people,
              transmission,
              id,
              type,
            } = car;

            return (
              <CarCard key={car.id} car={car}>
                <div className="flex items-center justify-center gap-x-3 mt-2">
                  <ModalAddReservation car={car} />
                  <Heart
                    className={`mt-2 cursor-pointer fill-black`}
                    onClick={() => removeLovedItem(car.id)}
                  />
                </div>
              </CarCard>
            );
          })}
        </div>
      )}
    </>
  );
}
