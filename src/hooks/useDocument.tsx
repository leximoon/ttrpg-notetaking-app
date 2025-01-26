import { documentsApi } from "@/lib/api/documentsApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Document, TMetadata } from "@/types/document";
import { useCallback, useEffect, useState } from "react";
import Template from "@/data/templates.json";

export function useDocument({
    worldId,
    documentId = "",
}: { worldId?: string; documentId?: string } = {}) {
    const queryClient = useQueryClient();
    const { createDocument, deleteDocument, getDocumentById, updateDocument } =
        documentsApi();
    const [metadata, setMetadata] = useState<TMetadata>({ tags: [], info: [] });

    const addDocument = useMutation({
        mutationFn: async ({
            title,
            worldId,
            parentDocumentId,
        }: {
            title: string;
            worldId: string;
            parentDocumentId?: string;
        }) => {
            return createDocument(title, worldId, parentDocumentId);
        },
        onSuccess: ({ id, parentDocumentId }) => {
            queryClient.invalidateQueries({
                queryKey: ["documents", parentDocumentId ?? "-1"],
            });
        },
    });

    const editDocument = useMutation({
        mutationFn: async ({
            documentId,
            field,
            content,
            parentDocumentId,
        }: {
            documentId: string;
            field: string;
            content: any;
            parentDocumentId?: string;
        }) => {
            return updateDocument(documentId, field, content);
        },
        onSuccess: ({ id, parentDocumentId }) => {
            queryClient.invalidateQueries({
                queryKey: ["documents", parentDocumentId ?? "-1"],
            });
            queryClient.invalidateQueries({
                queryKey: ["document", id],
            });
        },
    });

    const delDocument = useMutation({
        mutationFn: async ({
            documentId,
            parentDocumentId,
        }: {
            documentId: string;
            parentDocumentId?: string;
        }) => {
            return deleteDocument(documentId);
        },
        onSuccess: ({ parentDocumentId }) => {
            queryClient.invalidateQueries({
                queryKey: ["documents", parentDocumentId ?? "-1"],
            });
        },
    });

    const getCurrentDocument = (id: string) =>
        useQuery<Document, Error>({
            queryKey: ["document", id],
            queryFn: async () => {
                const doc: Document = await getDocumentById(id);

                if (doc.metadata) {
                    console.log(doc.metadata);
                    setMetadata(JSON.parse(doc.metadata));
                }
                return doc;
            },
            enabled: !!id,
        });

    const loadTemplate = useCallback(
        (name: string) => {
            const temp = Template.templates.find((t) => t.name === name);
            const content = temp ? temp.content : null;
            const metadata = temp ? temp.metadata : null;
            editDocument.mutate({
                documentId: documentId,
                field: "content",
                content: JSON.stringify(content),
            });
            editDocument.mutate({
                documentId: documentId,
                field: "metadata",
                content: metadata,
            });
        },
        [documentId, editDocument]
    );

    return {
        addDocument,
        editDocument,
        delDocument,
        getCurrentDocument,
        loadTemplate,
        metadata,
    };
}
