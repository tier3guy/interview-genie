import QuestionType from "./question.type";

export default interface YourAnswerType {
    question: QuestionType;
    answer?: string;
    feedback?: string;
    sampleResponse?: string;
    isAttempted: boolean;
}
