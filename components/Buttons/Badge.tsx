"use client";

import { cn } from "@/lib/utils";
import ButtonType from "@/types/button.type";
import Loader from "../Loader";

interface Props extends ButtonType {
    active?: boolean;
    className?: string;
}

export default function BadgeButton({
    children,
    label,
    onClick,
    active = false,
    className,
}: Props) {
    return (
        <button
            className={cn(
                "py-2 px-4 rounded-full bg-transparent border border-gray-500 hover:bg-gray-100 text-gray-500 transition duration-200 focus:border-green-600 focus:text-green-600 focus:bg-green-600/10 text-sm",
                active && "bg-green-600/10 border-green-600 text-green-600",
                className
            )}
            onClick={onClick}
        >
            {children ? children : label}
        </button>
    );
}
