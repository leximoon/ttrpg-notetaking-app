"use client";
import { use, useCallback, useEffect, useState } from "react";
import { useDocument } from "@/hooks/useDocument";

//Data imports
import Template from "@/data/templates.json";

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
    const { editDocument, getCurrentDocument } = useDocument();
    const { data: document, isLoading, error } = getCurrentDocument(documentId);
    const [meta, setMeta] = useState<TMetadata>({
        tags: [],
        info: [],
    });
    const { mutate } = editDocument;

    useEffect(() => {
        if (!isLoading) {
            setMeta(JSON.parse(document?.metadata ?? '{"tags":[],"info":[]}'));
        }
    }, [isLoading, document]);

    const onChange = useCallback(
        (content: any, field: string) => {
            const newMeta: TMetadata = { ...meta };

            if (field === "tags") {
                newMeta.tags = content;
                field = "metadata";
            }
            if (field === "meta") {
                newMeta.info = content;
                field = "metadata";
            }

            mutate({
                documentId: documentId,
                field: field,
                content: field === "metadata" ? newMeta : content,
            });

            if (field === "metadata") {
                setMeta(newMeta);
            }
        },
        [meta, documentId, mutate]
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

    function loadTemplate(name: string) {
        const temp = Template.templates.find((t) => t.name === name);
        const content = temp ? temp.content : null;
        const metadata = temp ? temp.metadata : null;
        mutate({
            documentId: documentId,
            field: "content",
            content: JSON.stringify(content),
        });
        mutate({
            documentId: documentId,
            field: "metadata",
            content: metadata,
        });
    }

    return (
        <div className="relative top-[50px] h-[calc(100%-50px)]">
            {document.content ? (
                <div className="flex flex-row justify-between">
                    {/** This is the document main content, toolbar and editor will be here. */}
                    <DocumentContent document={document} onChange={onChange} />
                    {/** This is the sidebar for aditional information related to the document
                     * TODO: Make this collapsable?
                     */}
                    <MetadataSidebar meta={meta} onChange={onChange} />
                </div>
            ) : (
                /*If the document has no content, a template page will be rendered*/
                <Templates onLoadTemplate={loadTemplate} />
            )}
        </div>
    );
};

export default DocumentPage;
