"use client";
import { useState, useEffect, useRef } from "react";

const SpeechToText: React.FC = () => {
    const [transcript, setTranscript] = useState<string>("");
    const [isListening, setIsListening] = useState<boolean>(false);
    const recognitionRef = useRef<SpeechRecognition | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const SpeechRecognition =
                window.SpeechRecognition ||
                (window as any).webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = "en-US";

            recognition.onresult = (event: SpeechRecognitionEvent) => {
                let interimTranscript = "";
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcriptPart = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        setTranscript(
                            (prevTranscript) => prevTranscript + transcriptPart
                        );
                    } else {
                        interimTranscript += transcriptPart;
                    }
                }
                setTranscript(
                    (prevTranscript) => prevTranscript + interimTranscript
                );
            };

            recognition.onend = () => {
                console.log("Recognition ended");
                setIsListening(false);
            };

            recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
                console.error("Recognition error:", event);
                setIsListening(false);
            };

            recognitionRef.current = recognition;
            console.log("Recognition instance created");
        }
    }, []);

    const startListening = () => {
        if (recognitionRef.current && !isListening) {
            setIsListening(true);
            recognitionRef.current.start();
            console.log("Started listening");
        }
    };

    const stopListening = () => {
        if (recognitionRef.current && isListening) {
            setIsListening(false);
            recognitionRef.current.stop();
            console.log("Stopped listening");
        }
    };

    return (
        <div>
            <h1>Speech to Text</h1>
            <button onClick={isListening ? stopListening : startListening}>
                {isListening ? "Stop Listening" : "Start Listening"}
            </button>
            <p>{transcript}</p>
        </div>
    );
};

export default SpeechToText;
