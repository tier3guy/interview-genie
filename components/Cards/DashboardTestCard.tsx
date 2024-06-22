import { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import { Eye, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { TestType } from "@/types/test.type";
import { deleteTestById } from "@/actions/tests";
import DeleteInterviewCard from "./DeleteInterviewCard";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

export default function DashboardTestCard({ data }: { data: TestType }) {
    const router = useRouter();
    const [deleting, setDeleting] = useState<boolean>(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

    const formattedDate = data?.createdAt
        ? format(new Date(data.createdAt), "MMMM d, yyyy")
        : "";

    const closeModal = useCallback(() => {
        setIsDeleteModalOpen(false);
    }, []);
    const deleteTestHandler = async () => {
        setDeleting(true);
    };

    useEffect(() => {
        if (deleting) {
            deleteTestById(data.testId).then(() => {
                closeModal();
                window.location.reload();
            });
        }
    }, [deleting, data.testId, closeModal]);

    return (
        <div className="w-full py-10 px-10 rounded-lg border-2 border-gray-300 shadow flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <p className="p-1 px-3 rounded-2xl bg-slate-100 text-sm">
                    {formattedDate}
                </p>
                <div className="flex items-center gap-3">
                    <Dialog
                        open={isDeleteModalOpen}
                        onOpenChange={setIsDeleteModalOpen}
                    >
                        <DialogTrigger>
                            <div className="cursoor-pointer rounded-full h-10 w-10 grid place-content-center text-red-700 bg-red-600/10">
                                <Trash2 className="h-5 w-5" />
                            </div>
                        </DialogTrigger>
                        <DeleteInterviewCard
                            onCancel={closeModal}
                            onConfirm={deleteTestHandler}
                        />
                    </Dialog>

                    <button
                        onClick={() => {
                            router.push(`/launch/${data.testId}/summary`);
                        }}
                        className="rounded-full h-10 w-10 grid place-content-center text-green-700 bg-green-600/10"
                    >
                        <Eye className="h-5 w-5" />
                    </button>
                </div>
            </div>
            <h3 className="text-xl font-bold text-black">{data?.title}</h3>
            <p className="font-medium text-gray-500 line-clamp-4">
                {data?.jobDescription}
            </p>
            <ul className="px-8">
                <li>Q1. {data?.questions?.[0]?.question?.question}</li>
            </ul>
        </div>
    );
}
