import { cn } from "@/lib/utils";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { ExtendedQuestionType } from "@/types/extended-question.type";

interface Props {
    summary: string;
    isPositive: boolean;
    questions: ExtendedQuestionType[];
}
export default function SummaryCard({ summary, isPositive, questions }: Props) {
    return (
        <div className="rounded-md border-2 shadow-lg w-full overflow-hidden">
            <div className="p-6 flex flex-col items-center gap-4">
                <h2 className="font-bold text-xl text-black text-center">
                    Practice makes perfect! Good luck with your interviews.
                </h2>

                {summary && (
                    <div
                        className={cn(
                            "p-4 rounded border",
                            isPositive
                                ? "border-green-600 bg-green-600/10 text-green-600"
                                : "border-red-600 bg-red-600/10 text-red-600"
                        )}
                    >
                        <p className="font-semibold text-lg mb-2">
                            Your overall performance was{" "}
                            {isPositive ? "Positive 🤗 !" : "Negative ☹️ !"}
                        </p>
                        <p>{summary}</p>
                    </div>
                )}
            </div>
            <Accordion type="single" collapsible>
                {questions?.map(
                    (question: ExtendedQuestionType, index: number) => {
                        return (
                            <AccordionItem
                                key={question.question.id}
                                value={question.question.id}
                            >
                                <AccordionTrigger className="text-start text-black">
                                    {index + 1}. {question.question.question}
                                </AccordionTrigger>
                                <AccordionContent>
                                    {question.isAttempted
                                        ? question.feedback
                                        : "Ohh, uhh you have not attempted this question."}
                                </AccordionContent>
                            </AccordionItem>
                        );
                    }
                )}
            </Accordion>
        </div>
    );
}
