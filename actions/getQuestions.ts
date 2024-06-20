"use server";
import {
    GoogleGenerativeAI,
    // HarmCategory,
    // HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    throw new Error(
        "API key is missing. Please set GEMINI_API_KEY in your .env file."
    );
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

// generation configuration
const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

export default async function getQuestions({
    jobDescription,
}: {
    jobDescription: string;
}) {
    if (!jobDescription) throw new Error("Please provide the job description");

    const chatSession = model.startChat({
        generationConfig,
        history: [],
    });

    const prompt = `${jobDescription} \n\nFor the above Job Description, kindly prepare the possible questionaries that can be asked in an interview considering the fact that the candidate is of Mid-senior Level for this position. Output the data in an JSON format which will contain an array of questions where each element of the array will be an object with id, question and topic_name in it.`;

    const result = await chatSession.sendMessage(prompt);
    const text = result.response.text();

    return JSON.parse(text);
}
