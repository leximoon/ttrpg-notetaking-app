"use client";

import { documentsApi } from "@/lib/api/documentsApi";
import { Document } from "@/types/document";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Item } from "./item";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { FileIcon } from "lucide-react";

interface DocumentListProps {
    worldId: string;
    parentDocumentId?: string;
    level?: number;
    data?: Document;
}

export const DocumentList = ({
    worldId,
    parentDocumentId,
    level = 0,
}: DocumentListProps) => {
    const params = useParams();
    const router = useRouter();
    const { loadDocuments } = documentsApi();

    // CONTROLLING IF EACH DOCUMENT ITEM'S DROPDOWN LIST EXPAND
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});
    const onExpand = (documentId: string) => {
        setExpanded((prevExpanded) => ({
            ...prevExpanded,
            [documentId]: !prevExpanded[documentId],
        }));
    };

    //Getting all documents by worldId, or getting all documents children to a parent document
    const { data: documents } = useQuery({
        queryKey: [`documents`, parentDocumentId ?? "-1"],
        queryFn: () => loadDocuments(worldId, parentDocumentId),
    });

    //Load clicked document on page
    const onRedirect = (documentId: string) => {
        router.push(`/main/${worldId}/${documentId}`);
    };

    // Manages documents loading
    if (documents === undefined) {
        return (
            <>
                <Item.Skeleton level={level} />
                {level === 0 && (
                    <>
                        <Item.Skeleton level={level} />
                        <Item.Skeleton level={level} />
                    </>
                )}
            </>
        );
    }

    return (
        <>
            <p
                style={{
                    paddingLeft: level ? `${level * 12 + 25}px` : undefined,
                }}
                className={twMerge(
                    clsx(
                        "hidden text-sm font-medium text-primary-muted py-[4px]",
                        { "last:block": expanded },
                        { hidden: level === 0 }
                    )
                )}
            >
                No pages inside
            </p>
           
            {documents.map((document: Document) => (
                    <div key={document.id}>
                        <Item
                            id={document.id}
                            onClick={() => onRedirect(document.id)}
                            label={document.title}
                            parentDocumentId={document.parentDocumentId}
                            icon={FileIcon}
                            active={params.documentId === document.id}
                            level={level}
                            onExpand={() => onExpand(document.id)}
                            expanded={expanded[document.id]}
                        />
                        {expanded[document.id] && (
                            <DocumentList
                                worldId={worldId}
                                parentDocumentId={document.id}
                                level={level + 1}
                            />
                        )}
                    </div>
            ))}
        </>
    );
};
