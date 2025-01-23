import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { ListCar } from "./components/ListCar";

export default async function DashboardPage() {
  const {userId}= await auth();
  if(!userId) redirect("/");

  const cars= await db.car.findMany({
    where:{isPublish:true},
    orderBy:{createdAt:"desc"}
  })

  return (
    <div>
        <div className="flex justify-between">
         <h2 className="text-2xl font-bold">List of cars</h2>
        </div>
        <ListCar cars={cars} />
    </div>
  )
}
