import { SetStateAction } from "react";
import { Textarea } from "./ui/textarea";

interface Props {
    transcript: string;
    setTranscript: React.Dispatch<SetStateAction<string>>;
}
export default function AnswerArea({ transcript, setTranscript }: Props) {
    return (
        <Textarea
            placeholder="Write your answer here..."
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            className="h-[200px] my-5 resize-none focus-visible:ring-green-600 p-4 text-md"
        />
    );
}
