import { TagBox } from "@/components/tagBox";
import { TMetadata } from "@/types/document";
import React from "react";
import { MetadataBox } from "../MetadataBox";

interface MetadataSidebar {
    meta: TMetadata;
    onChange: (content: any, field: string) => void;
}

export const MetadataSidebar = ({ meta, onChange }: MetadataSidebar) => (
    <div className="hidden xl:block bg-background-muted/10 shadow-md shadow-shadow flex-wrap w-1/6">
        <TagBox
            title="TAGS"
            tags={meta.tags}
            onChange={(newTags) => onChange(newTags, "tags")}
        />
        <MetadataBox
            initialData={meta.info}
            onChange={(content) => onChange(content, "meta")}
        />
    </div>
);
