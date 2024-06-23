import { cn } from "@/lib/utils";
import { Plans } from "@/constants";
import PricingCard from "@/components/Cards/PricingCard";
import { Bricolage_Grotesque as BricolageGrotesque } from "next/font/google";

const font = BricolageGrotesque({ subsets: ["latin"] });

export default function Pricing() {
    return (
        <main className="py-10">
            <div className="m-auto w-full lg:w-[50%] md:w-[80%] flex flex-col items-center justify-center gap-8">
                <div className="flex items-center text-center justify-center flex-col">
                    <h1
                        className={cn(
                            "text-3xl text-black font-bold",
                            font.className
                        )}
                    >
                        Pricing
                    </h1>
                    <p className="mt-1">Choose your plan.</p>
                </div>
                <div className="flex flex-col md:flex-row gap-4 w-full">
                    {Plans.map((plan) => {
                        return (
                            <PricingCard
                                key={plan.planName}
                                plan={plan.planName}
                                description={plan.description}
                                price={plan.price}
                                validity={plan.validity}
                                recommended={plan.recommended}
                                pro={plan?.pro ? true : false}
                            />
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
