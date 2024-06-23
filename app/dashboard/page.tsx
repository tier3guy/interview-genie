"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { v4 as uuid4 } from "uuid";
import { MoveRight } from "lucide-react";
import { useEffect, useState } from "react";
import { getAllTest } from "@/actions/tests";
import { TestType } from "@/types/test.type";
import { useAuth } from "@/providers/AuthProvider";
import ShimmerButton from "@/components/magicui/shimmer-button";
import { Bricolage_Grotesque as BricolageGrotesque } from "next/font/google";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import DashboardTestCard from "@/components/Cards/DashboardTestCard";

const font = BricolageGrotesque({ subsets: ["latin"] });

export default function Dashboard() {
    const { user } = useAuth();
    const [tests, setTests] = useState<TestType[]>([]);

    useEffect(() => {
        if (!user?.clerkId) return;

        const fetchTests = async () => {
            const response = await getAllTest(user?.clerkId);

            setTests(response as any);
        };

        fetchTests();
    }, [user?.clerkId]);

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
            <div className="py-5">
                {tests.length === 0 ? (
                    <p className="text-center text-lg font-semibold py-5">
                        You do not have any saved interviews yet.
                    </p>
                ) : (
                    <div className="mt-10 w-full md:w-[60%] m-auto">
                        <Carousel>
                            <CarouselContent>
                                {tests?.map((test) => (
                                    <CarouselItem key={test.id}>
                                        <DashboardTestCard data={test} />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>
                )}
            </div>
        </main>
    );
}
