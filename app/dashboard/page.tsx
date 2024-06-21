import Link from "next/link";
import { cn } from "@/lib/utils";
import { v4 as uuid4 } from "uuid";
import { MoveRight } from "lucide-react";
import ShimmerButton from "@/components/magicui/shimmer-button";
import { Bricolage_Grotesque as BricolageGrotesque } from "next/font/google";

const font = BricolageGrotesque({ subsets: ["latin"] });

export default function Dashboard() {
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
                        Dashboard
                    </h1>
                    <p className="mt-1">
                        Review your previous interviews and feedback.
                    </p>

                    <Link href={`/launch/${uuid4()}`}>
                        <ShimmerButton className="mt-4 flex items-center gap-2">
                            Or, Start a new Interview
                            <MoveRight />
                        </ShimmerButton>
                    </Link>
                </div>
            </div>
            <div className="py-10">
                <p className="text-center text-lg font-semibold">
                    You do not have any saved interviews yet.
                </p>
            </div>
        </main>
    );
}
