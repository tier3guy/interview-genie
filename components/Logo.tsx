import { cn } from "@/lib/utils";
import { Podcast } from "lucide-react";

export default function Logo({ className }: { className?: string }) {
    return (
        <div className={cn("flex items-start gap-2 text-green-600", className)}>
            <Podcast />
            <p className="font-medium text-xl">InterviewGenie</p>
        </div>
    );
}
