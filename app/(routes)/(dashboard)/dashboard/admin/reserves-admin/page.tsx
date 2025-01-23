import { db } from "@/lib/db";
import { auth ,currentUser} from "@clerk/nextjs/server"
import { redirect } from "next/navigation";
import { TableReserves } from "./components/TableReserves";
import { isAdministrator } from "@/lib/isAdministrator";

export default async function pageReservesAdmin() {
    const {userId}= await auth();
    const user= await currentUser();
    if(!userId || !user || !isAdministrator(userId)) return redirect('/');

    const orders = await db.order.findMany({orderBy:{createAt:"desc"}});
  return (
    <div>
        <h2 className="text-3xl mb-4">Reserves Page</h2>
        <TableReserves orders={orders}/> 
    </div>
  )
}
