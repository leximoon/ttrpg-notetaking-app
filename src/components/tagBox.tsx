"use client";
import type React from "react";
import { Tag } from "@components/UI/tag";
import {
    AddTagDialog,
    AddTagDialogRef,
} from "@/app/main/[worldId]/(routes)/[documentId]/_components/addTagDialog";
import { Button } from "./UI/button";
import { useRef, useState } from "react";
import { Plus } from "lucide-react";

interface TagBoxProps {
    title?: string;
    tags: string[];
}

export const TagBox = ({ title, tags }: TagBoxProps) => {
    const authDialogRef = useRef<AddTagDialogRef>(null);
    const [tagList, setTagList] = useState<string[]>(tags);

    const handleOpening = () => {
        if (authDialogRef.current) {
            authDialogRef.current.openDialog();
        }
    };
    const onAddTag = (tag: string) => {
        setTagList([...tagList, tag]);
    };

    return (
        <div className="min-h-48">
            <span className="mb-4 font-bold text-2xl">{title}</span>
            <div className="flex flex-wrap">
                {tagList.map((t, index) => (
                    <Tag key={index} label={t} />
                ))}
                <Button
                    className="!mr-2 !mb-2 !px-1 !py-0.5 table-cell !rounded text-text-primary text-xs font-bold"
                    intent="secondary"
                    size="s"
                    icon={<Plus className="h-4" />}
                    onClick={handleOpening}
                />
                <AddTagDialog ref={authDialogRef} onAddTag={onAddTag} />
            </div>
        </div>
    );
};
