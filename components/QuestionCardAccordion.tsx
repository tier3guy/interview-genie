"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { useMockTest } from "@/providers/MockTestProvider";
import { useEffect, useState } from "react";

export default function QuestionCardAccordion() {
    const { currentSolutionData } = useMockTest();
    const [openItems, setOpenItems] = useState<string[]>([]);

    useEffect(() => {
        if (currentSolutionData?.feedback)
            setOpenItems((prev) => [...prev, "feedback"]);
        if (currentSolutionData?.sampleResponse)
            setOpenItems((prev) => [...prev, "sample_response"]);
    }, [currentSolutionData]);

    return (
        <Accordion type="multiple" className={cn("w-full")} value={openItems}>
            <AccordionItem
                value="feedback"
                className={cn(openItems.length === 0 && "cursor-not-allowed")}
            >
                <AccordionTrigger>Feedback</AccordionTrigger>
                <AccordionContent>
                    {currentSolutionData?.feedback}
                </AccordionContent>
            </AccordionItem>
            <AccordionItem
                value="sample_response"
                className={cn(openItems.length === 0 && "cursor-not-allowed")}
            >
                <AccordionTrigger>Sample Response</AccordionTrigger>
                <AccordionContent>
                    {currentSolutionData?.sampleResponse}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
