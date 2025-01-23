import { auth } from "@clerk/nextjs/server";
import { ButtonAddCar } from "./components/ButtonAddCar";
import ListCars from "./components/ListCars/ListCars";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { isAdministrator } from "@/lib/isAdministrator";

export default async function CarsManagerPage() {

 const {userId}  = await auth();

    if (!userId || !isAdministrator(userId)) {
      console.log("Usuario no autenticado. Redireccionando...");
      return redirect('/dashboard');
    }
    const car = await db.car.findMany({
      where: { userId:userId },
      orderBy: { createdAt: "desc" },
    });


  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Manage yours cars</h2>
        <ButtonAddCar />
      </div>
      <ListCars cars={car}/>
    </div>
  );
}

