import { Podcast } from "lucide-react";

export default function Logo() {
    return (
        <div className="flex items-start gap-2 text-green-600">
            <Podcast />
            <p className="font-medium text-xl">InterviewGenie</p>
        </div>
    );
}
