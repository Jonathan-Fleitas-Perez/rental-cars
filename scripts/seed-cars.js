const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const adminId = process.env.NEXT_PUBLIC_ADMINISTRATOR || "admin_user_id";

  const cars = [
    {
      name: "Ferrari SF90 Stradale",
      cv: "1000",
      transmission: "automatico",
      people: "2",
      photo: "/images/cars/ferrari.png",
      priceDay: "1200",
      engine: "hibrido",
      type: "luxe",
      userId: adminId,
      isPublish: true,
    },
    {
      name: "Porsche 911 GT3 RS",
      cv: "525",
      transmission: "automatico",
      people: "2",
      photo: "/images/cars/porsche.png",
      priceDay: "800",
      engine: "gasoil",
      type: "luxe",
      userId: adminId,
      isPublish: true,
    },
    {
      name: "Lamborghini Aventador",
      cv: "770",
      transmission: "automatico",
      people: "2",
      photo: "/images/cars/lamborghini.png",
      priceDay: "1500",
      engine: "gasoil",
      type: "luxe",
      userId: adminId,
      isPublish: true,
    },
    {
      name: "Tesla Model S Plaid",
      cv: "1020",
      transmission: "automatico",
      people: "5",
      photo: "/images/cars/tesla.png",
      priceDay: "400",
      engine: "electric",
      type: "sedan",
      userId: adminId,
      isPublish: true,
    },
  ];

  console.log("Seeding cars...");

  for (const car of cars) {
    await prisma.car.create({
      data: car,
    });
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
