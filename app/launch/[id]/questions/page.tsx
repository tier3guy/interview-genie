import QuestionBadge from "@/components/QuestionBadge";
import QuestionCard from "@/components/Cards/QuestionCard";
import EndAndReviewButton from "@/components/Buttons/EndAndReviewButton";
import QuestionGenerationButton from "@/components/Buttons/QuestionGenerationButton";

export default function Questions() {
    return (
        <main className="py-10">
            <div className="m-auto lg:w-[50%] flex flex-col items-center justify-center gap-8">
                <div className="flex items-center justify-between w-full relative">
                    <QuestionGenerationButton />
                    <div className="center hidden md:block">
                        <QuestionBadge />
                    </div>
                    <EndAndReviewButton />
                </div>
                <div className="block md:hidden">
                    <QuestionBadge />
                </div>
                <QuestionCard />
            </div>
        </main>
    );
}
