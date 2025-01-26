import { TagBox } from "@/components/tagBox";
import { TMetadata } from "@/types/document";
import React from "react";
import { MetadataBox } from "../MetadataBox";

interface MetadataSidebar {
    meta: TMetadata;
    onChange: (content: any, field: string) => void;
}

export const MetadataSidebar = ({ meta, onChange }: MetadataSidebar) => (
    <div className="bg-background-muted/10 shadow-md shadow-shadow flex-wrap ml-auto w-96">
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
