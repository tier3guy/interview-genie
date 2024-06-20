import { format } from "date-fns";
import { SetStateAction } from "react";
import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const convertAudioToText = (
    audioBlob: Blob,
    setTranscript: React.Dispatch<SetStateAction<string>>
) => {
    const recognition = new (window?.SpeechRecognition ||
        (window as any).webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setTranscript(transcript);
    };

    recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
    };

    recognition.onend = () => {
        console.log("Speech recognition service disconnected");
    };

    // Convert blob to base64 to simulate a recognized audio input
    const reader = new FileReader();
    reader.onloadend = () => {
        const base64data = reader.result as string;
        const audio = new Audio(base64data);
        audio.onloadedmetadata = () => {
            audio.play();
            recognition.start();
        };
    };
    reader.readAsDataURL(audioBlob);
};

// Function to format timer display (e.g., 0:00)
export const formatTime = (seconds: number): string => {
    return format(new Date(0, 0, 0, 0, 0, seconds), "m:ss");
};
