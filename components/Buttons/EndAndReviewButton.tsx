"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { DialogTrigger } from "../ui/dialog";
import { Dialog } from "@radix-ui/react-dialog";
import { useQuestion } from "@/providers/QuestionsProvider";
import EndAndReviewCard from "../Cards/EndAndReviewCard";

export default function EndAndReviewButton() {
    const { currentQuestionData } = useQuestion();
    const isBtnActive = currentQuestionData?.isAttempted;
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    return (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger>
                <div
                    className={cn(
                        "py-[5px] px-6 rounded-full",
                        isBtnActive
                            ? "bg-red-600/10 text-red-600"
                            : "cursor-not-allowed text-gray-400 bg-gray-100"
                    )}
                >
                    End & Review
                </div>
                <EndAndReviewCard onCancel={() => setModalOpen(false)} />
            </DialogTrigger>
        </Dialog>
    );
}
