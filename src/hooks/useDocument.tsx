import { createDocument, deleteDocument, getDocumentById, updateDocument } from "@/lib/api/documentsApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Document } from "@/types/document";
import { useState } from "react";

export function useDocument(documentId?: string) {
    const queryClient = useQueryClient();
    const [currentDocumentId, setCurrentDocumentId] = useState<string>(
        documentId ?? ""
    );

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
        onSuccess: ({ id }) => {
            setCurrentDocumentId(id);
            queryClient.invalidateQueries({ queryKey: ["documents"] });
        },
    });

    const editDocument = useMutation({
        mutationFn: async ({
            documentId,
            field,
            content,
        }: {
            documentId: string;
            field: string;
            content: any;
        }) => {
            return updateDocument(documentId, field, content);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["documents"] });
        }
    });

    const delDocument = useMutation({
        mutationFn: async ({
            documentId
        }: {
            documentId: string;
        }) => {
            return deleteDocument(documentId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["documents"] });
        }
    });

    const useCurrentDocument = () =>
        useQuery<Document | null, Error>({
            queryKey: ["documents", currentDocumentId],
            queryFn: () => getDocumentById(currentDocumentId),
        });

    return {
        addDocument,
        editDocument,
        delDocument,
        useCurrentDocument,
    };
}