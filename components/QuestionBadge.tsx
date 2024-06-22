"use client";

import { ChevronRight } from "lucide-react";
import { useQuestion } from "@/providers/QuestionsProvider";

export default function QuestionBadge() {
    const { questionNumber } = useQuestion();
    return (
        <div className="border bg-gray-100 py-[5px] px-3 rounded-full flex items-center gap-4 hover:bg-gray-200 justify-end relative w-[185px]">
            <p className="center">Question {questionNumber}</p>
            <ChevronRight className="h-5 w-5 text-gray-400" />
        </div>
    );
}
