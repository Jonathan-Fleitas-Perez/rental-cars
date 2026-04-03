import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(3),
});

export async function POST(
  req: Request,
  { params }: { params: Promise<{ carId: string }> }
) {
  try {
    const { userId } = await auth();
    const user = await currentUser();
    const { carId } = await params;

    if (!userId || !user) {
      return new NextResponse("No autorizado", { status: 401 });
    }

    const body = await req.json();
    const validation = reviewSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error.issues, { status: 400 });
    }

    const { rating, comment } = validation.data;

    const car = await db.car.findUnique({
      where: { id: carId },
    });

    if (!car) {
      return new NextResponse("Coche no encontrado", { status: 404 });
    }

    const review = await db.review.create({
      data: {
        userId,
        carId,
        rating,
        comment,
        userName: `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Usuario",
        avatarUrl: user.imageUrl,
      },
    });

    return NextResponse.json(review);
  } catch (error) {
    console.log("[CAR_REVIEW_POST]", error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
}
