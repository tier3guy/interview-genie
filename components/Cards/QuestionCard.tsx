"use client";

import { useEffect, useState } from "react";
import AnswerArea from "../AnswerArea";
import { useMockTest } from "@/providers/MockTestProvider";
import QuestionCardAccordion from "../QuestionCardAccordion";
import ShimmerButton from "../magicui/shimmer-button";
import TypingAnimation from "../magicui/typing-animation";

export default function QuestionCard() {
    const {
        currentQuestionData,
        generateFeedback,
        loading,
        currentQuestionIndex,
        nextQuestion,
    } = useMockTest();
    const [transcript, setTranscript] = useState<string>("");

    const handleGetAIFeedback = async () => {
        if (!transcript) {
            return;
        }
        generateFeedback({
            question: currentQuestionData?.question?.question!,
            answer: transcript,
        });
    };

    useEffect(() => {
        setTranscript("");
    }, [currentQuestionIndex]);

    return (
        <div className="rounded-md border-2 shadow-lg w-full overflow-hidden">
            <div className="p-6 flex flex-col items-center justify-center">
                <h2 className="text-xl font-bold mb-2 text-center text-black">
                    {currentQuestionData?.question.question}
                </h2>
                <AnswerArea
                    transcript={transcript}
                    setTranscript={setTranscript}
                />
                {!currentQuestionData?.isAttempted && (
                    <button className="cursor-pointer underline m-auto">
                        Or, record your answer
                    </button>
                )}
                {loading ? (
                    <TypingAnimation
                        text="Working on it ..."
                        className="text-lg font-normal mt-4"
                    />
                ) : currentQuestionData?.isAttempted ? (
                    <ShimmerButton
                        className="mt-4 py-2 px-8 shadow"
                        onClick={nextQuestion}
                    >
                        Next Question
                    </ShimmerButton>
                ) : (
                    <ShimmerButton
                        className="mt-4 py-2 px-8 shadow"
                        onClick={handleGetAIFeedback}
                    >
                        Get AI Feedback
                    </ShimmerButton>
                )}
            </div>
            <div className="bg-slate-50">
                <QuestionCardAccordion />
            </div>
        </div>
    );
}
