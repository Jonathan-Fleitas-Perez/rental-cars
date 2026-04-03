import Stripe from "stripe";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { carId, priceDay, startDate, endDate, carName } = body;

    if (!carId) return new NextResponse("Car id is required", { status: 400 });
    if (!priceDay) return new NextResponse("Price is required", { status: 400 });
    if (!startDate || !endDate) return new NextResponse("Dates are required", { status: 400 });

    const start = new Date(startDate);
    const end = new Date(endDate);
    const numberOfDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

    if (numberOfDays <= 0) {
      return new NextResponse("End date must be after start date", { status: 400 });
    }

    const totalAmount = Number(priceDay) * numberOfDays;
    const totalAmountStripe = totalAmount * 100; // Stripe uses cents

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: "eur",
          product_data: { name: carName },
          unit_amount: totalAmountStripe,
        },
      },
    ];

    const order = await db.order.create({
      data: {
        carId: carId,
        carName: carName,
        userId: userId,
        status: "confirmed",
        totalAmount: totalAmount.toString(),
        orderDate: startDate,
        orderEndDate: endDate,
      },
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      billing_address_collection: "required",
      phone_number_collection: { enabled: true },
      success_url: `${process.env.NEXT_PUBLIC_FRONTEND_STORE_URL}/order-confirmation`,
      cancel_url: `${process.env.NEXT_PUBLIC_FRONTEND_STORE_URL}/order-error`,
      metadata: {
        order: order.id,
        carId,
        startDate: startDate.toString(),
        endDate: endDate.toString(),
        numberOfDays,
      },
    });

    return NextResponse.json({ url: session.url }, { headers: corsHeaders });
  } catch (error) {
    console.error("[CHECKOUT POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}