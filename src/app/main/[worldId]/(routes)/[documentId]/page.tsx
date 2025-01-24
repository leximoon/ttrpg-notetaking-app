"use client";
import { use } from "react";
import { Spinner } from "@/components/UI/spinner";
import { useDocument } from "@/hooks/useDocument";

import { Toolbar } from "./_components/Toolbar";
import { Skeleton } from "@nextui-org/skeleton";
import { Editor } from "./_components/Editor";

interface DocumentPageProps {
    params: Promise<{ documentId: string }>;
}

const DocumentPage = ({ params }: DocumentPageProps) => {
    const { documentId } = use(params);
    const { editDocument, getCurrentDocument } = useDocument();
    const { data: document, isLoading, error } = getCurrentDocument(documentId);
    const { mutate } = editDocument;

    const onChange = (content: string) => {
        mutate({ documentId: documentId, field: "content", content: content });
    };
    if (isLoading) {
        return (
            <div>
                <Toolbar.Skeleton />
                <div className="max-w-5xl mt-10 mx-auto">
                    <div className="space-y-4 pl-8 pt-4">
                        <Skeleton className="h-14 bg-background-muted/20 rounded-md w-[50%]" />
                        <Skeleton className="h-4 bg-background-muted/20 rounded-md w-[80%]" />
                        <Skeleton className="h-4 bg-background-muted/20 rounded-md w-[40%]" />
                        <Skeleton className="h-4 bg-background-muted/20 rounded-md w-[60%]" />
                    </div>
                </div>
            </div>
        );
    }
    if (error) {
        console.error("Error fetching document:", error);
        return <div>Error loading document. Please try again.</div>;
    }
    if (!document) {
        return <div>Document not found!</div>;
    }
    return (
        <div className="pb-40">
            <div className="pl-56">
                <Toolbar initialData={document} />
                <Editor onChange={onChange} initialContent={document.content} />
            </div>
        </div>
    );
};

export default DocumentPage;
