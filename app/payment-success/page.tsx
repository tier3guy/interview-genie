import ShimmerButton from "@/components/magicui/shimmer-button";
import { cn } from "@/lib/utils";
import { Bricolage_Grotesque as BricolageGrotesque } from "next/font/google";
import Link from "next/link";

const font = BricolageGrotesque({ subsets: ["latin"] });

export default function PaymentSuccess() {
    return (
        <main className="py-10">
            <div className="m-auto w-full lg:w-[50%] md:w-[80%] flex flex-col items-center justify-center gap-8">
                <div className="flex items-center text-center justify-center flex-col">
                    <h1
                        className={cn(
                            "text-3xl font-bold text-green-600",
                            font.className
                        )}
                    >
                        Congratulations
                    </h1>
                    <p className="mt-1">Your Pro plan has been activated</p>
                </div>
            </div>
            <Link href={"/account"}>
                <ShimmerButton className="m-auto mt-6">
                    Go to the accounts
                </ShimmerButton>
            </Link>
        </main>
    );
}
