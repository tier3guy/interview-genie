"use client";

import { useState } from "react";
import Badge from "../Buttons/Badge";
import AlertBadge from "../AlertBadge";
import { useRouter } from "next/navigation";
import callGemini from "@/actions/callGemini";
import { updateTestField } from "@/actions/tests";
import { DialogContent } from "@/components/ui/dialog";
import { useQuestion } from "@/providers/QuestionsProvider";
import TypingAnimation from "../magicui/typing-animation";

interface Props {
    onCancel: () => void;
}

export default function EndAndReviewCard({ onCancel }: Props) {
    const router = useRouter();
    const { testId, questions } = useQuestion();
    const [loading, setLoading] = useState<boolean>(false);

    const handleEndAndReview = async () => {
        setLoading(true);
        // Step 1: Generate Summary and store it,
        const feedbacks = questions
            .map((question, index) => {
                if (question.isAttempted)
                    return `${index + 1} ${question.feedback}`;
            })
            .join("\n\n");

        const prompt = `Feedbacks:\n\n${feedbacks}\n\nAbove are the feedbacks given to an interviewee during an interview for each of the questions asked. Summarize the feedbacks and also return if the overall performance was good or bad. Return the answer in a JSON format with attributes summary and isPositive to be there. The summary attribute will contain the summarized feedback while isPositive will be boolean value which will be true if the overall feedback is positve else it would be false. Also keep in mind the summary should in second person form example, You are good at speacking, Your answer sometimes lags in specific area, etc.`;

        callGemini({ prompt }).then((data) => {
            // Step 2: Store the resp into the db
            updateTestField(testId, "summary", data).then(() => {
                // Step 3: Navigate to summary
                router.push(`/launch/${testId}/summary`);
            });
        });
    };

    return (
        <DialogContent className="flex flex-col text-center items-center gap-4">
            <AlertBadge />
            <div>
                <h3 className="text-xl font-bold">End & Review</h3>
                <p className="text-gray-500">
                    Are you sure you want to end this interview and go to the
                    summary page?
                </p>
            </div>
            {!loading ? (
                <div className="flex items-center gap-2">
                    <Badge
                        label="Cancel"
                        onClick={onCancel}
                        className="bg-slate-100 text-gray-500 px-4 border-none focus:bg-slate-100 focus:text-gray-500 hover:bg-slate-200"
                    />
                    <Badge
                        label="Confirm"
                        onClick={handleEndAndReview}
                        className="bg-red-600/10 text-red-600 px-4 border-none focus:bg-red-600/10 focus:text-red-600 hover:bg-red-600/20"
                    />
                </div>
            ) : (
                <div className="text-center m-auto">
                    <TypingAnimation
                        text="Working on it ..."
                        className="text-lg font-normal mt-4"
                    />
                </div>
            )}
        </DialogContent>
    );
}
