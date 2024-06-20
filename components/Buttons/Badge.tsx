"use client";

import ButtonType from "@/types/button.type";

export default function BadgeButton({ children, label, onClick }: ButtonType) {
    return (
        <button
            className="py-2 px-4 rounded-full bg-transparent border border-gray-500 hover:bg-gray-100 text-gray-500 transition duration-200 focus:border-green-600 focus:text-green-600 focus:bg-green-600/10 text-sm"
            onClick={onClick}
        >
            {children ? children : label}
        </button>
    );
}
