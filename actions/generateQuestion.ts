"use server";

import { createTest } from "./tests";
import callGemini from "./callGemini";
import QuestionType from "@/types/question.type";

interface Props {
    clerkId: string;
    testId: string;
    title: string;
    jobDescription: string;
}

export const generateQuestions = async ({
    clerkId,
    testId,
    title,
    jobDescription,
}: Props) => {
    if (!testId || !jobDescription || !clerkId) return;

    try {
        const prompt = `${jobDescription} \n\nFor the above Job Description, kindly prepare the possible questionaries that can be asked in an interview considering the fact that the candidate is of Mid-senior Level for this position. Output the data in an JSON format which will contain an array of questions where each element of the array will be an object with id, question and topic_name in it.`;

        const resp = await callGemini({ prompt });
        const questions = resp.map((question: QuestionType) => ({
            question,
            answer: "",
            feedback: "",
            sampleResponse: "",
            isAttempted: false,
        }));

        const response = await createTest({
            testId,
            title,
            jobDescription,
            questions,
            summary: {},
            clerkId,
        });

        if (response) {
            return {
                error: null,
                msg: response,
                status: 200,
            };
        } else {
            return {
                error: "Failed to generate questions",
                msg: response,
                status: 400,
            };
        }
    } catch (error) {
        console.log(error);
        return {
            error: "Failed to generate questions",
            msg: error,
            status: 400,
        };
    }
};
