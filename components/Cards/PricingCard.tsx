"use client";

import Badge from "../Badge";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import ShimmerButton from "../magicui/shimmer-button";

interface Props {
    plan: string;
    description: string;
    price: number;
    recommended: boolean;
    validity?: string;
    pro: boolean;
}

export default function PricingCard({
    plan,
    description,
    price,
    validity,
    recommended,
    pro,
}: Props) {
    const router = useRouter();
    const { user } = useAuth();
    const currentPlan = user?.isSubscribed ? "Pro" : "Basic";

    const handleUpgrade = () => {
        if (user?.clerkId) {
            router.push("/checkout");
        } else {
            router.push("/sign-in");
        }
    };

    return (
        <div
            className={cn(
                "rounded-md w-full md:w-[400px] h-[320px]  border border-gray-400 shadow",
                recommended && "bg-slate-50 border-green-500 border-2"
            )}
        >
            <div className="flex flex-col justify-end items-center gap-4 h-full pb-6">
                {recommended && (
                    <Badge
                        label="Recommended"
                        className="font-normal border border-green-500 text-sm"
                    />
                )}
                <div className="flex flex-col gap-1 items-center text-center">
                    <h3 className="text-2xl font-bold">{plan}</h3>
                    <p>{description}</p>
                </div>
                <div className="flex items-center justify-center gap-1 mt-8">
                    <h1 className="text-4xl font-bold text-black">₹{price}</h1>
                    {validity && <p>/ lifetime</p>}
                </div>
                <div>
                    {currentPlan === plan && (
                        <button className="bg-gray-50 rounded-full py-1 px-8 border">
                            Current Plan
                        </button>
                    )}

                    {!user?.isSubscribed && pro && (
                        <ShimmerButton
                            className="py-1 px-6"
                            onClick={handleUpgrade}
                        >
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
