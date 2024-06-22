"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { TestType } from "@/types/test.type";
import { getTestById } from "@/actions/tests";
import { usePathname } from "next/navigation";
import SummaryCard from "@/components/Cards/SummaryCard";
import { Bricolage_Grotesque as BricolageGrotesque } from "next/font/google";

const font = BricolageGrotesque({ subsets: ["latin"] });

export default function Summary() {
    const pathname = usePathname();
    const testId = pathname.split("/")[2] || null;
    const [test, setTest] = useState<TestType | null>(null);
    const [questionloading, setQuestionsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!testId) return;
        const fetchQuestions = async () => {
            try {
                setQuestionsLoading(true);

                const resp = await getTestById(testId);

                setTest(resp as TestType);
            } catch (error) {
                console.log(error);
            } finally {
                setQuestionsLoading(false);
            }
        };
        fetchQuestions();
    }, [testId]);

    return (
        <main className="py-10">
            <div className="m-auto lg:w-[70%] flex flex-col items-center justify-center gap-8">
                <div className="flex items-center text-center justify-center flex-col">
                    <h1
                        className={cn(
                            "text-3xl text-black font-bold",
                            font.className
                        )}
                    >
                        Summary
                    </h1>
                </div>
                <SummaryCard
                    summary={test?.summary?.summary as string}
                    isPositive={test?.summary?.isPositive as boolean}
                    questions={test?.questions || []}
                />
            </div>
        </main>
    );
}
