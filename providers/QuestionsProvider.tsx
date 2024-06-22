"use client";

import callGemini from "@/actions/callGemini";
import { usePathname } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from "react";
import { getTestById, updateTestField } from "@/actions/tests";
import { ExtendedQuestionType } from "@/types/extended-question.type";

// context type interface
interface QuestionContextType {
    questions: ExtendedQuestionType[];
    currentQuestionIndex: number;
    generateFeedback: ({
        answer,
        question,
    }: {
        answer: string;
        question: string;
    }) => void;
    nextQuestion: () => void;
    loading: boolean;
    questionNumber: number;
    currentQuestionData: ExtendedQuestionType | null;
    testId: string;
    pageLoading: boolean;
    isTestSubmitted: boolean;
}

const QuestionContext = createContext<QuestionContextType | undefined>(
    undefined
);

// props interface
interface QuestionProviderProps {
    children: ReactNode;
}

export default function QuestionProvider({ children }: QuestionProviderProps) {
    const { toast } = useToast();
    const pathname = usePathname();
    const testId = pathname.split("/")[2] || null;
    const [loading, setLoading] = useState<boolean>(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questions, setQuestions] = useState<ExtendedQuestionType[]>([]);
    const [isTestSubmitted, setIsTestSubmitted] = useState<boolean>(false);
    const [questionloading, setQuestionsLoading] = useState<boolean>(false);

    const generateFeedback = async ({
        answer,
        question,
    }: {
        answer: string;
        question: string;
    }) => {
        if (!testId) return;
        try {
            setLoading(true);

            const prompt = `Question : ${question} \n\nAnswer : ${answer} \n\nIn an interview the above question was asked and the candidate have given the said answer. Consider you are the interviewer, provide the feedback for the answer and also give a sample response, so that the candidate can correct himself. Output the data in an JSON format where the key attributes will be id, feedback and sample_response`;

            const resp = await callGemini({
                prompt,
            });

            const qData = questions[currentQuestionIndex].question;
            const updatedQuestions = questions;
            updatedQuestions[currentQuestionIndex] = {
                question: qData,
                answer,
                feedback: resp.feedback,
                sampleResponse: resp.sample_response,
                isAttempted: true,
            };

            await updateTestField(testId, "questions", updatedQuestions);
            setQuestions(updatedQuestions);
        } catch (error) {
            console.log(error);
            toast({
                title: "Failed to Generate the Feedback.",
                description: error?.toString(),
            });
        } finally {
            setLoading(false);
        }
    };

    const nextQuestion = () => {
        if (currentQuestionIndex === questions.length - 1) return; // Last Question
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    };

    useEffect(() => {
        if (!testId) return;
        const fetchQuestions = async () => {
            try {
                setQuestionsLoading(true);

                const resp = await getTestById(testId);

                setQuestions(resp?.questions || []);
                const isSummaryPresent = Object.keys(resp?.summary)?.length
                    ? true
                    : false;

                setIsTestSubmitted(isSummaryPresent);
            } catch (error) {
                console.log(error);
            } finally {
                setQuestionsLoading(false);
            }
        };
        fetchQuestions();
    }, [testId]);

    return (
        <QuestionContext.Provider
            value={{
                questions,
                currentQuestionIndex,
                nextQuestion,
                loading,
                questionNumber: currentQuestionIndex + 1,
                currentQuestionData:
                    questions.length > 0
                        ? questions[currentQuestionIndex]
                        : null,
                generateFeedback,
                testId: testId as string,
                pageLoading: questionloading,
                isTestSubmitted,
            }}
        >
            {children}
        </QuestionContext.Provider>
    );
}

// Custom hook to use the MockTestContext
export function useQuestion() {
    const context = useContext(QuestionContext);
    if (context === undefined) {
        throw new Error("useLauch must be used within a QuestionProvider");
    }
    return context;
}
