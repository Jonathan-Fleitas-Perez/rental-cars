"use client"
import { Button } from "@/components/ui/button";
import { CardCarProps } from "./CardCar.types";
import { toast } from "@/hooks/use-toast";
import { Trash,Upload } from "lucide-react";
import { CarCard } from "@/components/Shared/CarCard";
import {useRouter} from "next/navigation"
import { ButtonEditCar } from "./ButtonEditCar";
import axios from "axios";

import { Badge } from "@/components/ui/badge";

export default function CardCar(props: CardCarProps) {
  const { car } = props;
  const router = useRouter();

  const deleteCar = async () => {
    try {
      await axios.delete(`/api/car/${car.id}`);
      toast({ title: "Car deleted" });
      router.refresh();
    } catch (error) {
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
      console.log(error);
    }
  };

  const handlerPublishCar = async (publish: boolean) => {
    try {
      await axios.patch(`/api/car/${car.id}`, { isPublish: publish });
      toast({ title: publish ? "Car Published" : "Car Unpublished" });
      router.refresh();
    } catch (error) {
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
      console.log(error);
    }
  };

  return (
    <div className="relative group">
      <CarCard 
        car={car} 
        className="h-full border-muted/40 hover:border-primary/50 transition-all duration-300"
        badge={
          <div className="absolute top-3 left-3 z-20">
            <Badge variant={car.isPublish ? "success" : "destructive"}>
              {car.isPublish ? "Published" : "Draft"}
            </Badge>
          </div>
        }
      >
        <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-muted/40">
          <div className="flex items-center justify-between gap-2">
            <ButtonEditCar carData={car} />
            <Button 
                variant="outline" 
                size="icon" 
                onClick={deleteCar}
                className="text-destructive hover:bg-destructive/10 hover:text-destructive shrink-0"
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>

          <Button
            className="w-full font-semibold"
            variant={car.isPublish ? "outline" : "default"}
            onClick={() => handlerPublishCar(!car.isPublish)}
          >
            {car.isPublish ? (
              <>
                Unpublish
                <Upload className="w-4 h-4 ml-2" />
              </>
            ) : (
              <>
                Publish to catalog
                <Upload className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </CarCard>
    </div>
  );
}

