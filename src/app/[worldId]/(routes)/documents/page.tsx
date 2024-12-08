"use client";

import Image from "next/image";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/UI/button";
import { createDocument } from "@/documentsApi";

const DocumentPage = () => {
    const onCreate = () => {
        const promise = createDocument("Untitled");

        // TODO: add loading and error and created with toast
    };

    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            {/* IMAGE FOR EMPTY PAGE */}
            <Image src="../dragons.svg" height="300" width="300" alt="Empty" />

            {/* ADD PAGE BUTTON*/}
            <Button
                intent="secondary"
                size="m"
                variant="fill"
                icon={<PlusIcon />}
                label="New Page"
                onClick={onCreate}
            />
        </div>
    );
};

export default DocumentPage;
