import { Navbar } from "@/components/Shared/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function orderConfirmationPage() {
  return (
    <div>
        <Navbar/>
        <div className="p-6 mx-auto max-w-7xl">
            <div className="flex flex-col items-center justify-center gap-4 text-center">
                <h2 className="text-2xl"> !Muchas gracias por confiar en nosotros!</h2>
                <p>En momentos breves recibira toda la informacion a traves de su correo electronico</p>
                <p> Puedes visualisar todas tus reservas dentro de tu Area de cliente</p>

                <Link href="/">
                    <Button>Volver a ver los Productos</Button>
                </Link>
            </div>

        </div>
    </div>
  )
}
