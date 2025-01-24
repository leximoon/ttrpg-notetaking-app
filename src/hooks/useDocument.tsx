import { documentsApi } from "@/lib/api/documentsApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Document } from "@/types/document";
import { useState } from "react";

export function useDocument({
    worldId,
}: { worldId?: string; documentId?: string } = {}) {
    const queryClient = useQueryClient();
    const { createDocument, deleteDocument, getDocumentById, updateDocument } =
        documentsApi();

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
            setCurrentDocumentId(id);

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
            queryFn: () => getDocumentById(id),
            enabled: !!id,
        });

    return {
        addDocument,
        editDocument,
        delDocument,
        getCurrentDocument,
    };
}
