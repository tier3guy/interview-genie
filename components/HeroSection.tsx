import { ChevronRight, Mic } from "lucide-react";
import BadgeButton from "./Buttons/Badge";
import Badge from "./Badge";
import ShimmerButton from "./magicui/shimmer-button";
import AvatarCircles from "./magicui/avatar-circles";
import { Bricolage_Grotesque as BricolageGrotesque } from "next/font/google";
import { cn } from "@/lib/utils";

const font = BricolageGrotesque({ subsets: ["latin"] });

export default function HeroSection() {
    const badges = [
        "Custom Job Description",
        "Business Analyst",
        "Product Manager",
        "Software Engineer",
        "Marketing Specialist",
        "Customer Service Representative",
    ];

    const avatarUrls = [
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVvcGxlfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGVvcGxlfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
    ];

    return (
        <section className="flex justify-between items-center py-10 gap-4">
            <div className="flex-1">
                <Badge label="#1 AI Interview Prep" />
                <div className="mt-6">
                    <h1
                        className={cn(
                            "text-5xl text-black font-bold",
                            font.className
                        )}
                    >
                        Boost your confidence,
                    </h1>
                    <h1
                        className={cn(
                            "text-5xl text-black font-bold  bg-green-600/10 w-fit p-1 px-3",
                            font.className
                        )}
                    >
                        ace the job interview
                    </h1>
                </div>
                <p
                    className={cn(
                        "font-semibold mt-4 text-xl w-4/5",
                        font.className
                    )}
                >
                    Practice job interview questions tailored to your job
                    description. Get instant AI feedback and suggestions to
                    improve your answers.
                </p>
                <div className="mt-4 flex flex-col gap-2">
                    <ShimmerButton className="shadow-2xl px-14">
                        <p>Try now for Free</p>
                    </ShimmerButton>
                    <p className="px-2">No credit card required</p>
                </div>

                <div className="mt-4 flex items-center gap-4">
                    <AvatarCircles avatarUrls={avatarUrls} />
                    <p className={cn("font-semibold", font.className)}>
                        Trusted by 36,000+ job seekers
                    </p>
                </div>
            </div>
            <div className="flex-1 bg-gray-50 rounded p-5 flex flex-col gap-6">
                <div>
                    <h1>
                        Turn a <span>job description</span> into{" "}
                        <span>interview questions</span> to practice with :{" "}
                    </h1>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
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
                            <h1 className="text-5xl font-bold">0:00 / 2:00</h1>
                            <div className="m-auto mt-6 bg-red-700 text-white h-12 w-12 rounded-full grid place-content-center">
                                <Mic />
                            </div>
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
