import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { carFormSchema } from "@/lib/car-form.schema";
export async function PATCH(req:Request,{params}:{params:Promise<{carId:string}>}) {

    try {
        const {userId}=await auth();
        const {carId}= await params;
        const values= await req.json();
        
        if(!userId || !carId) return new NextResponse("Unauthorized",{status:401});

        const validatedData = carFormSchema.safeParse(values);
        if(!validatedData.success) return new NextResponse("Invalid data",{status:400});

        const car = await db.car.update({
            where:{
                id:carId,
                userId:userId,
            },
            data:{
                ...validatedData.data,
            }
        })
        return NextResponse.json(car);

    } catch (error) {
        console.error("[CAR FORM ID]",error);
        return new NextResponse("Internal Error",{status:500})
    }

}