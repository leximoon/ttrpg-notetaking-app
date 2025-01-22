export type Document = {
    id: string;
    title: string;
    userId: string;
    worldId: string;
    parentDocumentId?: string;
    content?: string;
    metadata?: JSON;
    bannerImage?: String;
    icon?: String;
    isArchived: boolean;
    isPublic: boolean;
};
