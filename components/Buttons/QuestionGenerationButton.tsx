"use client";

import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { ArrowLeft } from "lucide-react";

export default function QuestionGenerationButton() {
    return (
        <Link href={`/launch/${uuidv4()}`}>
            <button className="flex items-center gap-2">
                <ArrowLeft />
                <p>Question Generation</p>
            </button>
        </Link>
    );
}
