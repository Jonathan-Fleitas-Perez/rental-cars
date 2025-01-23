import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server"
import Link from "next/link";
import { redirect } from "next/navigation";
import { TableReserves } from "./components/TableReserves";

export default async function pageReserves() {
    const {userId}= await auth();
    if(!userId) return redirect("/");

    const orders= await db.order.findMany({
        where:{userId:userId},
        orderBy:{createAt:"desc"}
    })

     
  return (
    <div>
        <h2 className="mb-4 text-3xl">Reserves Page</h2>
        {orders.length===0?
        (
            <div className="flex flex-col justify-center gap-4 ">
                <h3>No tienes ningun pedido</h3>
                <p>Haz tus pedidos a traves de la pagina de pedidos</p>
                <Link href="/cars">
                    <Button>Lista de Vehiculos</Button>
                </Link>
            </div>
        )
        :(
            <TableReserves orders={orders}/>
        )
    }
    </div>
  )
}
