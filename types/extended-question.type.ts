import QuestionType from "./question.type";

export interface ExtendedQuestionType {
    question: QuestionType;
    answer: string;
    feedback: string;
    sampleResponse: string;
    isAttempted: boolean;
}
