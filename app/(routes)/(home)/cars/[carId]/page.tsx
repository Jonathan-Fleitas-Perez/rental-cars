import { Metadata } from "next";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { CarGallery } from "./components/CarGallery";
import { CarReviews } from "./components/CarReviews";
import { Navbar } from "@/components/Shared/Navbar";

export async function generateMetadata({ params }: { params: Promise<{ carId: string }> }): Promise<Metadata> {
  const { carId } = await params;
  const car = await db.car.findUnique({ where: { id: carId } });

  if (!car) return { title: "Coche no encontrado" };

  return {
    title: `${car.name} | Rental Cars Premium`,
    description: `Reserva el ${car.name} (${car.type}) por solo ${car.priceDay}€ al día. Vehículo con ${car.cv} CV y transmisión ${car.transmission}.`,
    openGraph: {
      images: [car.photo],
    },
  };
}

export default async function CarPage({ params }: { params: Promise<{ carId: string }> }) {
  const { carId } = await params;

  const car = await db.car.findUnique({
    where: { id: carId },
    include: {
      images: true,
      reviews: true,
    },
  });

  if (!car) {
    return notFound();
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto p-6 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Interactive Gallery */}
          <CarGallery mainPhoto={car.photo} images={car.images} />


          {/* Car info */}
          <div className="flex flex-col">
            <div className="mb-6">
                <h1 className="text-4xl font-extrabold tracking-tight">{car.name}</h1>
                <p className="text-muted-foreground text-lg uppercase tracking-widest mt-1">{car.type}</p>
            </div>

            <div className="flex items-baseline gap-2 mb-8">
                <span className="text-4xl font-bold text-primary">{car.priceDay}€</span>
                <span className="text-muted-foreground">/ día</span>
            </div>

            <Separator className="my-6" />

            <div className="grid grid-cols-2 gap-y-6 gap-x-12 mb-8">
                <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-tighter mb-1">Potencia</p>
                    <p className="text-lg font-medium">{car.cv} CV</p>
                </div>
                <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-tighter mb-1">Combustible</p>
                    <p className="text-lg font-medium capitalize">{car.engine}</p>
                </div>
                <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-tighter mb-1">Transmisión</p>
                    <p className="text-lg font-medium capitalize">{car.transmission}</p>
                </div>
                <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-tighter mb-1">Capacidad</p>
                    <p className="text-lg font-medium">{car.people} Personas</p>
                </div>
            </div>

          </div>
        </div>

        <CarReviews carId={car.id} reviews={car.reviews} />
      </div>
    </div>
  );
}
