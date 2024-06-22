"use client";

import { cn } from "@/lib/utils";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import { useQuestion } from "@/providers/QuestionsProvider";

export default function QuestionCardAccordion() {
    const { currentQuestionData } = useQuestion();
    const [openItems, setOpenItems] = useState<string[]>([]);

    useEffect(() => {
        if (currentQuestionData?.feedback)
            setOpenItems((prev) => [...prev, "feedback"]);
        if (currentQuestionData?.sampleResponse)
            setOpenItems((prev) => [...prev, "sample_response"]);
    }, [currentQuestionData]);

    return (
        <Accordion type="multiple" className={cn("w-full")} value={openItems}>
            <AccordionItem
                value="feedback"
                className={cn(openItems.length === 0 && "cursor-not-allowed")}
            >
                <AccordionTrigger>Feedback</AccordionTrigger>
                <AccordionContent>
                    {currentQuestionData?.feedback}
                </AccordionContent>
            </AccordionItem>
            <AccordionItem
                value="sample_response"
                className={cn(openItems.length === 0 && "cursor-not-allowed")}
            >
                <AccordionTrigger>Sample Response</AccordionTrigger>
                <AccordionContent>
                    {currentQuestionData?.sampleResponse}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
