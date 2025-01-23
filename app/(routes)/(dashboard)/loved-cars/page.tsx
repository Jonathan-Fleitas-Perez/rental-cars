import { auth } from "@clerk/nextjs/server";
import { ListLovedCars } from "./components/ListLovedCars";
import { redirect } from "next/navigation";

export default async function pageLovedCars() {
    const {userId} = await auth();
    if(!userId) return redirect('/');

  return (
    <div>
        <h2 className="text-2xl font-bold mb-4">Coches que te gustan</h2>
        <ListLovedCars/>
    </div>
  )
}

