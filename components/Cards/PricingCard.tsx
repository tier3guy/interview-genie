"use client";

import { cn } from "@/lib/utils";
import Badge from "../Badge";
import ShimmerButton from "../magicui/shimmer-button";
import { useAuth } from "@/providers/AuthProvider";

interface Props {
    plan: "Basic" | "Pro";
    description: string;
    price: number;
}

export default function PricingCard({ plan, description, price }: Props) {
    const { user } = useAuth();

    return (
        <div
            className={cn(
                "rounded-md w-full md:w-[400px] h-[320px]  border border-gray-400 shadow",
                plan === "Pro" && "bg-slate-50 border-green-500 border"
            )}
        >
            <div className="flex flex-col justify-end items-center gap-4 h-full pb-6">
                {plan === "Pro" && (
                    <Badge
                        label="Recommended"
                        className="font-normal border border-green-500 text-sm"
                    />
                )}
                <div className="flex flex-col gap-1 items-center text-center">
                    <h3 className="text-xl font-bold">{plan}</h3>
                    <p className="w-3/4">{description}</p>
                </div>
                <div className="flex items-center justify-center gap-1 mt-8">
                    <h1 className="text-4xl font-bold text-black">${price}</h1>
                    <p>/ month</p>
                </div>
                <div>
                    {plan === "Basic" ? (
                        <button className="bg-gray-50 rounded-full py-1 px-8">
                            Current Plan
                        </button>
                    ) : (
                        <ShimmerButton className="py-1 px-6">
                            {user?.clerkId
                                ? "Upgrade to Pro"
                                : "Login to Upgrade"}
                        </ShimmerButton>
                    )}
                </div>
            </div>
        </div>
    );
}
