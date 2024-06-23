"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllTest } from "@/actions/tests";
import { jobDescriptions } from "@/constants";
import { Dialog } from "@/components/ui/dialog";
import { useAuth } from "@/providers/AuthProvider";
import { Textarea } from "@/components/ui/textarea";
import BadgeButton from "@/components/Buttons/Badge";
import { generateQuestions } from "@/actions/generateQuestion";
import ShimmerButton from "@/components/magicui/shimmer-button";
import LimitExceededCard from "@/components/Cards/LimitExeededCard";
import TypingAnimation from "@/components/magicui/typing-animation";
import { Bricolage_Grotesque as BricolageGrotesque } from "next/font/google";

const font = BricolageGrotesque({ subsets: ["latin"] });

type JobRole = keyof typeof jobDescriptions;

export default function LaunchInterview({ params }: any) {
    const { user } = useAuth();
    const router = useRouter();
    const jobRoles: JobRole[] = Object.keys(jobDescriptions) as JobRole[];
    const [selectedJobRole, setSelectedJobRole] = useState<JobRole>(
        jobRoles[0]
    );
    const [jd, setJd] = useState<string>(jobDescriptions[selectedJobRole]);
    const [loading, setLoading] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const generateQuestionsHandler = async () => {
        setLoading(true);

        const testsTaken = (await getAllTest(user?.clerkId!)).length;
        if (!user?.isSubscribed && testsTaken >= user?.testsLimit!) {
            setLoading(false);
            setModalOpen(true);
            return;
        }

        try {
            const resp = await generateQuestions({
                clerkId: user?.clerkId!,
                testId: params.id,
                title: selectedJobRole,
                jobDescription: jd,
            });
            if (resp?.status === 200) {
                router.push(`/launch/${params.id}/questions`);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        setJd(jobDescriptions[selectedJobRole]);
    }, [selectedJobRole]);

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
                        Select a Job description
                    </h1>
                    <div className="mt-5 flex items-center gap-2 flex-wrap justify-center">
                        {jobRoles.map((label) => (
                            <BadgeButton
                                key={label}
                                active={label === selectedJobRole}
                                onClick={() => {
                                    setSelectedJobRole(label);
                                }}
                            >
                                <p>{label}</p>
                            </BadgeButton>
                        ))}
                    </div>
                </div>
            </div>
            <div className="my-10 md:w-2/3 m-auto">
                <Textarea
                    className="h-[500px] resize-none focus-visible:ring-green-600 p-4 text-md"
                    placeholder="Select a job role from above or paste your own job description here."
                    value={jd}
                    onChange={(e) => {
                        setJd(e.target.value);
                    }}
                />
                <div className="m-auto mt-6 flex items-center justify-center">
                    {loading ? (
                        <TypingAnimation
                            text="Working on it ..."
                            className="text-lg font-normal"
                        />
                    ) : (
                        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                            <ShimmerButton onClick={generateQuestionsHandler}>
                                <p>Generate Questions</p>
                            </ShimmerButton>
                            <LimitExceededCard />
                        </Dialog>
                    )}
                </div>
            </div>
        </main>
    );
}
