// components/Loader.tsx
import React from "react";
import { cn } from "@/lib/utils";

interface LoaderProps {
    className?: string;
}

const Loader: React.FC<LoaderProps> = ({ className }) => {
    return (
        <div className="flex justify-center items-center">
            <div
                className={cn(
                    `animate-spin rounded-full h-4 w-4 border-t-4 border-b-4 text-blue-500`,
                    className
                )}
            ></div>
        </div>
    );
};

export default Loader;
