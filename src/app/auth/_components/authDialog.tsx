"use client";
import { Dialog } from "@/components/UI/dialog";
import { useRouter } from "next/navigation";

export default function AuthDialog({
    children,
    title,
}: {
    children: React.ReactNode;
    title?: string;
}) {
    const router = useRouter();
    // Navigates back when user closes the dialog
    const handleOpenChange = () => {
        router.back();
    };
    return (
        <Dialog isOpen={true} onClose={handleOpenChange} title={title}>
            {children}
        </Dialog>
    );
}
