"use client";
import { use, useCallback, useEffect, useState } from "react";
import { useDocument } from "@/hooks/useDocument";

import { TMetadata } from "@/types/document";
import { Templates } from "./_components/Templates";
import { LoadingSkeleton } from "./_components/loadingSkeleton";
import { MetadataSidebar } from "./_components/MetadataSidebar";
import { DocumentContent } from "./_components/documentContent";

interface DocumentPageProps {
    params: Promise<{ documentId: string }>;
}

const DocumentPage = ({ params }: DocumentPageProps) => {
    const { documentId } = use(params);
    const { metadata, editDocument, getCurrentDocument, loadTemplate } =
        useDocument({
            documentId: documentId,
        });
    const { data: document, isLoading, error } = getCurrentDocument(documentId);

    const onChange = useCallback(
        (content: any, field: string) => {
            const newMeta: TMetadata = { ...metadata };

            if (field === "tags") {
                newMeta.tags = content;
                field = "metadata";
            }
            if (field === "meta") {
                newMeta.info = content;
                field = "metadata";
            }

            editDocument.mutate({
                documentId: documentId,
                field: field,
                content: field === "metadata" ? newMeta : content,
            });
        },
        [metadata, documentId, editDocument]
    );

    if (isLoading) {
        return <LoadingSkeleton />;
    }
    if (error) {
        console.error("Error fetching document:", error);
        return <div>Error loading document. Please try again.</div>;
    }
    if (!document) {
        return <div>Document not found!</div>;
    }

    return (
        <div className="absolute overflow-y-auto top-[50px] h-[calc(100%-50px)] w-full">
            {document.content ? (
                <div className="flex h-full flex-row justify-between">
                    {/** This is the document main content, toolbar and editor will be here. */}
                    <DocumentContent document={document} onChange={onChange} />
                    {/** This is the sidebar for aditional information related to the document
                     * TODO: Make this collapsable?
                     */}
                    <MetadataSidebar meta={metadata} onChange={onChange} />
                </div>
            ) : (
                /*If the document has no content, a template page will be rendered*/
                <Templates onLoadTemplate={loadTemplate} />
            )}
        </div>
    );
};

export default DocumentPage;
