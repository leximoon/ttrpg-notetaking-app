"use client";
import { Dialog } from "@/components/UI/dialog";
import { useRouter } from "next/navigation";

export default function AuthDialog({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const handleOpenChange = () => {
        router.back();
    };
    return (
        <Dialog isOpen={true} onClose={handleOpenChange}>
            {children}
        </Dialog>
    );
}
