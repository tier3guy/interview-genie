"use client";
import QuestionType from "@/types/question.type";
import callGemini from "@/actions/callGemini";
import { useToast } from "@/components/ui/use-toast";
import { useRouter, usePathname } from "next/navigation";
import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from "react";
import YourAnswerType from "@/types/your-answer.type";
import { createTest, getTestById, updateTestField } from "@/actions/tests";
import { useAuth } from "./AuthProvider";

interface extendedQuestionType {
    question: QuestionType;
    answer: string;
    feedback: string;
    sampleResponse: string;
    isAttempted: boolean;
}

// context type interface
interface MockTestContextType {
    questions: extendedQuestionType[];
    currentQuestionIndex: number;
    generateQuestions: ({ jobDescription }: { jobDescription: string }) => void;
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
    currentQuestionData: extendedQuestionType | null;
    testId: string;
    setTestId: React.Dispatch<React.SetStateAction<string>>;
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
}

const MockTestContext = createContext<MockTestContextType | undefined>(
    undefined
);

// props interface
interface MockTestProviderProps {
    children: ReactNode;
}

export default function MockTestProvider({ children }: MockTestProviderProps) {
    const { user } = useAuth();
    const router = useRouter();
    const { toast } = useToast();
    const pathname = usePathname();
    const [testId, setTestId] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [questions, setQuestions] = useState<extendedQuestionType[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const generateQuestions = async ({
        jobDescription,
    }: {
        jobDescription: string;
    }) => {
        if (!testId) return;
        if (!jobDescription) {
            toast({
                title: "Failed to Generate Questions.",
                description: "Please provide the job description.",
            });
            return;
        }

        try {
            setLoading(true);

            const prompt = `${jobDescription} \n\nFor the above Job Description, kindly prepare the possible questionaries that can be asked in an interview considering the fact that the candidate is of Mid-senior Level for this position. Output the data in an JSON format which will contain an array of questions where each element of the array will be an object with id, question and topic_name in it.`;

            const resp = await callGemini({ prompt });
            const questions = resp.map((question: QuestionType) => ({
                question,
                answer: "",
                feedback: "",
                sampleResponse: "",
                isAttempted: false,
            }));

            createTest({
                testId,
                title,
                jobDescription,
                questions,
                summary: {},
                clerkId: user?.clerkId!,
            }).then(() => {
                getTestById(testId).then((data) => {
                    setQuestions(data?.questions || []);
                    router.push(`${pathname}/questions`);
                });
            });
        } catch (error) {
            console.log(error);
            toast({
                title: "Failed to Generate Questions.",
                description: error?.toString(),
            });
        } finally {
            setLoading(false);
        }
    };

    const generateFeedback = async ({
        answer,
        question,
    }: {
        answer: string;
        question: string;
    }) => {
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

    return (
        <MockTestContext.Provider
            value={{
                questions,
                generateQuestions,
                currentQuestionIndex,
                nextQuestion,
                loading,
                questionNumber: currentQuestionIndex + 1,
                currentQuestionData:
                    questions.length > 0
                        ? questions[currentQuestionIndex]
                        : null,
                generateFeedback,
                testId,
                setTestId,
                title,
                setTitle,
            }}
        >
            {children}
        </MockTestContext.Provider>
    );
}

// Custom hook to use the MockTestContext
export function useMockTest() {
    const context = useContext(MockTestContext);
    if (context === undefined) {
        throw new Error("useMockTest must be used within a MockTestProvider");
    }
    return context;
}
