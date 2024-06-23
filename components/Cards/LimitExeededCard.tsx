import Link from "next/link";
import AlertBadge from "../AlertBadge";
import ShimmerButton from "../magicui/shimmer-button";
import { DialogContent } from "@/components/ui/dialog";

export default function LimitExceededCard() {
    return (
        <DialogContent className="flex flex-col text-center items-center gap-4">
            <AlertBadge />
            <div>
                <h3 className="text-xl font-bold">Quota Exceeded</h3>
                <p className="text-gray-500 w-3/4 m-auto mt-2">
                    Current you are using Free Plan and you have used 3 out of 3
                    free tests. Please upgrade to pro to access unlimited tests.
                </p>
            </div>
            <div className="flex items-center gap-2 mt-4">
                <Link href={"/checkout"}>
                    <ShimmerButton className="py-[6px] px-8">
                        Upgrade to Pro
                    </ShimmerButton>
                </Link>
            </div>
        </DialogContent>
    );
}
