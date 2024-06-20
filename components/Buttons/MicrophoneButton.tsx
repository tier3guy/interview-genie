"use client";

import { cn } from "@/lib/utils";
import { Mic } from "lucide-react";

interface Props {
    onClick?: () => void;
    className?: string;
}

export default function MicrophoneButton({
    onClick = () => {},
    className = "",
}: Props) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "m-auto bg-red-700 text-white h-12 w-12 rounded-full grid place-content-center",
                className
            )}
        >
            <Mic />
        </button>
    );
}
