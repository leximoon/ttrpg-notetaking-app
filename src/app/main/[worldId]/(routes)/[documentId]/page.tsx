"use client";
import { use, useEffect, useState } from "react";
import { Spinner } from "@/components/UI/spinner";
import { useDocument } from "@/hooks/useDocument";

import { Toolbar } from "./_components/Toolbar";
import { Skeleton } from "@nextui-org/skeleton";
import { Editor } from "./_components/Editor";
import { Button } from "@/components/UI/button";
import { TagBox } from "@/components/tagBox";
import { MetadataBox } from "./_components/MetadataBox";

//Data imports

import Template from "@/data/templates.json";
import Data from "@/data/metadataExample.json";
import { TMetadata } from "@/types/document";
import { Templates } from "./_components/Templates";

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
            if (document?.metadata) {
                setMeta(JSON.parse(document?.metadata));
            }
        }
    }, [isLoading]);

    const onChange = (content: any, field: string) => {
        let newMeta: TMetadata = meta;

        if (field === "tags") {
            newMeta.tags = content;
            field = "metadata";
        }
        if (field === "meta") {
            newMeta.info = content;
            field = "metadata";
        }
        console.log(newMeta);
        mutate({
            documentId: documentId,
            field: field,
            content: field === "metadata" ? newMeta : content,
        });
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
                    <div className="pb-40 w-4/6 mx-56">
                        <Toolbar initialData={document} />
                        <Editor
                            onChange={(content) => {
                                onChange(content, "content");
                            }}
                            initialContent={document.content}
                        />
                    </div>
                    <div className="bg-background-muted/10  shadow-md shadow-shadow flex-wrap ml-auto w-96 ">
                        <TagBox
                            title="TAGS"
                            tags={meta.tags}
                            onChange={(newTags) => {
                                onChange(newTags, "tags");
                            }}
                        />
                        <MetadataBox
                            initialData={meta.info}
                            onChange={(content) => {
                                onChange(content, "meta");
                            }}
                        />
                    </div>
                </div>
            ) : (
                <Templates onLoadTemplate={loadTemplate} />
            )}
        </div>
    );
};

export default DocumentPage;
