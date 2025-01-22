import {documentsApi} from "@/lib/api/documentsApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Document } from "@/types/document";
import { useState } from "react";

export function useDocument({
    worldId,
    documentId,
}: { worldId?: string; documentId?: string } = {}) {
    const queryClient = useQueryClient();
    const [currentDocumentId, setCurrentDocumentId] = useState<string>(
        documentId ?? ""
    );
    const {createDocument,deleteDocument,getDocumentById,updateDocument} = documentsApi();

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
        onSuccess: ({ parentDocumentId }) => {
            queryClient.invalidateQueries({
                queryKey: ["documents", parentDocumentId ?? "-1"],
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
        onSuccess: ({parentDocumentId}) => {
            queryClient.invalidateQueries({
                queryKey: ["documents", parentDocumentId ?? "-1"],
            });
        },
    });

    const useCurrentDocument = () =>
        useQuery<Document | null, Error>({
            queryKey: ["currentDocument", currentDocumentId],
            queryFn: () => getDocumentById(currentDocumentId),
        });

    return {
        addDocument,
        editDocument,
        delDocument,
        useCurrentDocument,
    };
}
