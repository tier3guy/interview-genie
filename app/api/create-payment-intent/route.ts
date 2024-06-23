import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// Secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest) {
    try {
        const { amount, line1, zip, city, state, country } = await req.json();
        const user = await currentUser();

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "inr",
            automatic_payment_methods: {
                enabled: true,
            },
            description: "AI Based Mock Interview Services",
            shipping: {
                name: user?.fullName,
                address: {
                    line1,
                    postal_code: zip,
                    city,
                    state,
                    country,
                },
            },
        });

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: `Internal Server Error: ${error}` },
            { status: 500 }
        );
    }
}
