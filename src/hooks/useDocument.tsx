import { createDocument, getDocumentById } from "@/lib/api/documentsApi";
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

    const useCurrentDocument = () =>
        useQuery<Document | null, Error>({
            queryKey: ["documents", currentDocumentId],
            queryFn: () => getDocumentById(currentDocumentId),
        });

    return {
        addDocument,
        useCurrentDocument,
    };
}