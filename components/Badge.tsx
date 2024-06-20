import { cn } from "@/lib/utils";

export default function Badge({
    label,
    className,
}: {
    label: string;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "w-fit py-1 px-3 bg-green-600/20 text-green-600 rounded-full font-semibold",
                className
            )}
        >
            {label}
        </div>
    );
}
