"use client";

import {
    useStripe,
    useElements,
    PaymentElement,
} from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import { updateUserField } from "@/actions/users";
import { useAuth } from "@/providers/AuthProvider";
import ShimmerButton from "../magicui/shimmer-button";
import { BillingFormType } from "@/types/billing-form.type";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface Props {
    formState: BillingFormType;
}

export default function CheckoutCard({ formState }: Props) {
    const { user } = useAuth();
    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [clientSecret, setClientSecret] = useState<string>("");

    const APPLICATION_FEES = parseInt(
        process.env.NEXT_PUBLIC_APPLICATION_FEES!
    );

    const handleSubmitCheckout = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        const { error: submitError } = await elements.submit();

        if (submitError) {
            setError(submitError?.message as string);
            return;
        }

        try {
            setLoading(true);

            const return_url = `${window.location.origin}/payment-success?amount=${APPLICATION_FEES}`;

            await updateUserField(user?.clerkId!, "isSubscribed", true);
            const { error } = await stripe.confirmPayment({
                elements,
                clientSecret,
                confirmParams: {
                    return_url,
                },
            });

            if (error) {
                await updateUserField(user?.clerkId!, "isSubscribed", false);
                setError(error.message as string);
            } else {
            }
        } catch (error) {
            setError(error as string);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchClientSecret = async () => {
            try {
                const resp = await fetch("/api/create-payment-intent", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        amount: APPLICATION_FEES * 100,
                        line1: formState.address1 + "\n" + formState.address2,
                        city: formState.city,
                        state: formState.state,
                        country: formState.country,
                        zip: formState.zip,
                    }),
                });
                const { clientSecret } = await resp.json();

                setClientSecret(clientSecret);
            } catch (error) {
                console.log(error);
            }
        };

        fetchClientSecret();
    }, [APPLICATION_FEES, formState]);

    if (!clientSecret || !stripe || !elements || !window) {
        return (
            <div className="flex items-center justify-center">
                <div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                    role="status"
                >
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            <Card>
                <CardHeader>
                    <CardTitle>Payment Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onClick={handleSubmitCheckout}>
                        {clientSecret && <PaymentElement />}
                        <ShimmerButton
                            className="m-auto px-8 w-full mt-4"
                            type="submit"
                            disabled={!stripe || !elements}
                        >
                            {loading ? "Processing ..." : "Pay & Checkout"}
                        </ShimmerButton>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
