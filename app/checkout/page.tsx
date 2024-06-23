"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutCard from "@/components/Cards/CheckoutCard";
import BillingAddressComponent from "@/components/Cards/BillingAddressCard";
import { Bricolage_Grotesque as BricolageGrotesque } from "next/font/google";

const font = BricolageGrotesque({ subsets: ["latin"] });

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Checkout() {
    const [formState, setFormState] = useState({
        name: "",
        country: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
    });

    const APPLICATION_FEES = parseInt(
        process.env.NEXT_PUBLIC_APPLICATION_FEES!
    );

    const handleChange = (field: string, value: string) => {
        setFormState((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    return (
        <main className="py-10">
            <div className="m-auto lg:w-[50%] md:w-[80%] flex flex-col items-center justify-center gap-8">
                <div className="flex items-center text-center justify-center flex-col">
                    <h1
                        className={cn(
                            "text-3xl text-black font-bold",
                            font.className
                        )}
                    >
                        Checkout
                    </h1>
                    <p className="mt-1">
                        Complete Your Purchase Securely and Easily
                    </p>
                </div>

                <div className="flex flex-col w-full gap-4">
                    <BillingAddressComponent
                        formState={formState}
                        handleChange={handleChange}
                    />
                    <Elements
                        stripe={stripePromise}
                        options={{
                            mode: "payment",
                            currency: "inr",
                            amount: APPLICATION_FEES * 100,
                            fonts: [
                                {
                                    src: "url(https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap)",
                                    family: "Inter",
                                    style: "normal",
                                },
                            ],
                        }}
                    >
                        <CheckoutCard formState={formState} />
                    </Elements>
                </div>
            </div>
        </main>
    );
}
