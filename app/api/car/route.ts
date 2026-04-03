import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { carFormSchema } from "@/lib/car-form.schema";
export async function GET() {
    try {
        const cars = await db.car.findMany({
            where: {
                isPublish: true
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        return NextResponse.json(cars);

    } catch (error) {
        console.error("[CARS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req:Request) {
    try {
        const {userId} = await auth();
        const data = await req.json();

        if(!userId) return new NextResponse("Unautorized",{status:401});

        const validatedData = carFormSchema.safeParse(data);
        if(!validatedData.success) return new NextResponse("Invalid data",{status:400});

        const car= await db.car.create({
            data:{
                userId,
                ...validatedData.data
            },
        });

        return NextResponse.json(car);

    } catch (error) {
        console.error("[CAR]",error)
        return new NextResponse("Interal Error",{status:500})
    }
}