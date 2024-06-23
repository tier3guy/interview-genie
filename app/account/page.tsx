"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { Bricolage_Grotesque as BricolageGrotesque } from "next/font/google";
import { useAuth } from "@/providers/AuthProvider";
import { Plans } from "@/constants";

const font = BricolageGrotesque({ subsets: ["latin"] });

export default function Account() {
    const { user: usr } = useAuth();
    const { isLoaded, user } = useUser();
    const mailId = user?.emailAddresses?.[0].emailAddress;
    const currentPlan = usr?.isSubscribed ? Plans[1] : Plans[0];

    return (
        <main className="py-10">
            <div className="m-auto lg:w-[50%] md:w-[80%] flex flex-col items-center justify-center gap-8">
                <div className="text-center">
                    <h1
                        className={cn(
                            "text-3xl text-black font-bold",
                            font.className
                        )}
                    >
                        Accounts
                    </h1>
                    <p className="mt-1">
                        Manage your account, email preferences, and billing.
                    </p>
                </div>

                {isLoaded ? (
                    <div className="w-full flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <h3
                                className={cn(
                                    "text-black text-xl font-bold",
                                    font.className
                                )}
                            >
                                Profile
                            </h3>
                            <SignOutButton>
                                <p className="underline text-sm cursor-pointer">
                                    Sign Out
                                </p>
                            </SignOutButton>
                        </div>
                        <p className="font-semibold">Email preferences </p>
                        <p>
                            You are logged in as <span>{mailId}</span>.
                        </p>
                        <div className="border mt-2 p-4 flex items-center gap-3 rounded-md">
                            <Checkbox />
                            <p className="font-medium">
                                Yes, I want to receive updates about new
                                features, promotions, and news.
                            </p>
                        </div>
                    </div>
                ) : (
                    <Skeleton className="w-full h-[200px] bg-gray-200" />
                )}

                {isLoaded ? (
                    <div className="w-full flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <h3
                                className={cn(
                                    "text-black text-xl font-bold",
                                    font.className
                                )}
                            >
                                Plan
                            </h3>
                            {!usr?.isSubscribed && (
                                <Link href={"/pricing"}>
                                    <p className="underline text-sm cursor-pointer">
                                        Upgrade to Pro
                                    </p>
                                </Link>
                            )}
                        </div>
                        <p className="font-semibold">Current plan</p>
                        <div className="border mt-2 p-4 flex flex-col md:flex-row md:items-center gap-8 justify-between rounded-md">
                            <div>
                                <h2 className="font-bold text-lg text-black">
                                    {currentPlan?.planName}
                                </h2>
                                <p>{currentPlan?.description}</p>
                            </div>
                            <div>
                                <p className="flex items-center">
                                    <span className="text-4xl font-bold text-black me-1">
                                        ₹{currentPlan?.price}
                                    </span>
                                    {" / " + currentPlan?.validity}
                                </p>
                            </div>
                        </div>
                        <p>
                            * Plan price may not reflect any promo codes used -
                            check your billing.
                        </p>
                    </div>
                ) : (
                    <Skeleton className="w-full h-[200px] bg-gray-200" />
                )}
            </div>
        </main>
    );
}
