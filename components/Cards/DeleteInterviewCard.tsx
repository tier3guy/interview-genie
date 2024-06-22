import { DialogContent } from "@/components/ui/dialog";
import AlertBadge from "../AlertBadge";
import Badge from "../Buttons/Badge";

interface Props {
    onCancel: () => void;
    onConfirm: () => void;
}

export default function DeleteInterviewCard({ onCancel, onConfirm }: Props) {
    return (
        <DialogContent className="flex flex-col text-center items-center gap-4">
            <AlertBadge />
            <div>
                <h3 className="text-xl font-bold">Delete Interview</h3>
                <p className="text-gray-500">
                    Are you sure you want to delete this interview?
                </p>
            </div>
            <div className="flex items-center gap-2">
                <Badge
                    label="Cancel"
                    onClick={onCancel}
                    className="bg-slate-100 text-gray-500 px-4 border-none focus:bg-slate-100 focus:text-gray-500 hover:bg-slate-200"
                />
                <Badge
                    label="Confirm"
                    onClick={onConfirm}
                    className="bg-red-600/10 text-red-600 px-4 border-none focus:bg-red-600/10 focus:text-red-600 hover:bg-red-600/20"
                />
            </div>
        </DialogContent>
    );
}
