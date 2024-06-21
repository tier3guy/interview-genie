import Link from "next/link";
import { cn } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";
import Badge from "@/components/Badge";
import { fakeUsers } from "@/constants";
import { ChevronRight } from "lucide-react";
import BadgeButton from "@/components/Buttons/Badge";
import ShimmerButton from "@/components/magicui/shimmer-button";
import AvatarCircles from "@/components/magicui/avatar-circles";
import MicrophoneButton from "@/components/Buttons/MicrophoneButton";
import { Bricolage_Grotesque as BricolageGrotesque } from "next/font/google";

const font = BricolageGrotesque({ subsets: ["latin"] });

export default function Home() {
    const badges = [
        "Custom Job Description",
        "Business Analyst",
        "Product Manager",
        "Software Engineer",
        "Marketing Specialist",
        "Customer Service Representative",
    ];
    const avatarUrls = fakeUsers.map((user) => user.image);

    return (
        <section className="flex flex-col md:flex-row justify-between items-center py-10 gap-4">
            <div className="flex-1 flex flex-col items-center md:items-start justify-center md:justify-start">
                <Badge label="#1 AI Interview Prep" />
                <div className="mt-6">
                    <h1
                        className={cn(
                            "text-5xl text-black font-bold text-center md:text-start",
                            font.className
                        )}
                    >
                        Boost your confidence,
                    </h1>
                    <h1
                        className={cn(
                            "text-5xl text-black font-bold  bg-green-600/10 w-fit p-1 md:px-3 text-center md:text-start",
                            font.className
                        )}
                    >
                        ace the job interview
                    </h1>
                </div>
                <p
                    className={cn(
                        "font-semibold mt-4 text-xl w-4/5 text-center md:text-start",
                        font.className
                    )}
                >
                    Practice job interview questions tailored to your job
                    description. Get instant AI feedback and suggestions to
                    improve your answers.
                </p>
                <div className="mt-4 flex flex-col gap-2">
                    <Link href={`/launch/${uuidv4()}`}>
                        <ShimmerButton className="shadow-2xl px-14 flex items-center gap-2">
                            <p>Try now for Free</p>
                        </ShimmerButton>
                    </Link>
                    <p className="px-2 text-center md:text-start">
                        No credit card required
                    </p>
                </div>

                <div className="mt-4 flex items-center gap-4 flex-col md:flex-row">
                    <AvatarCircles avatarUrls={avatarUrls} />
                    <p className={cn("font-semibold", font.className)}>
                        Trusted by 36,000+ job seekers
                    </p>
                </div>
            </div>
            <div className="flex-1 bg-gray-50 rounded p-5 flex flex-col gap-6 mt-6 md:mt-0">
                <div>
                    <h1>
                        Turn a <span>job description</span> into{" "}
                        <span>interview questions</span> to practice with :{" "}
                    </h1>
                </div>

                <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
                    {badges.map((label) => (
                        <BadgeButton key={label}>
                            <p>{label}</p>
                        </BadgeButton>
                    ))}
                </div>

                <div className="border border-gray-200 rounded-md shadow-md bg-slate-50">
                    <div className="p-6 pb-10 flex items-center text-center flex-col justify-center">
                        <h1 className="font-bold text-xl text-black">
                            Could you recount a time when you faced a
                            challenging interaction with a customer and the
                            strategies you employed to resolve it?
                        </h1>
                        <div className="mt-10">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                0:00 / 2:00
                            </h1>
                            <MicrophoneButton />
                        </div>
                    </div>
                    <div className="p-4 border-t justify-between items-center flex">
                        <p className="font-semibold text-gray-300">Feedback</p>
                        <ChevronRight />
                    </div>
                    <div className="p-4 border-t justify-between items-center flex">
                        <p className="font-semibold text-gray-300">
                            Sample Response
                        </p>
                        <ChevronRight />
                    </div>
                </div>
            </div>
        </section>
    );
}
