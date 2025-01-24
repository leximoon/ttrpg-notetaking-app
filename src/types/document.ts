export type Document = {
    id: string;
    title: string;
    userId: string;
    worldId: string;
    parentDocumentId?: string;
    content?: string;
    metadata?: string;
    bannerImage?: String;
    icon?: String;
    isArchived: boolean;
    isPublic: boolean;
};

export type TMetadata = {
    tags: string[];
    info: {
        title: string;
        content: string;
    }[];
};
