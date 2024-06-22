import { ShieldAlert } from "lucide-react";

export default function AlertBadge() {
    return (
        <div className="h-10 w-10 bg-red-600/10 grid place-content-center rounded-full">
            <ShieldAlert className="text-red-600" />
        </div>
    );
}
