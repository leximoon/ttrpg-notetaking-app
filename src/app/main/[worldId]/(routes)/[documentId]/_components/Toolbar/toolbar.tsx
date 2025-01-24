import { Document } from "@/types/document";
import React, { ElementRef, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/UI/popover";
import { Button } from "@/components/UI/button";
import { useDocument } from "@/hooks/useDocument";
import { Skeleton } from "@nextui-org/skeleton";

interface ToolbarProps {
    initialData: Document;
    preview?: boolean;
}
export const Toolbar = ({ initialData, preview = false }: ToolbarProps) => {
    const inputRef = useRef<ElementRef<"textarea">>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialData.title);

    const { editDocument } = useDocument();

    const { mutate } = editDocument;

    const enableInput = () => {
        if (preview) return;

        setIsEditing(true);
        setTimeout(() => {
            setValue(initialData.title);
            inputRef.current?.focus();
        }, 0);
    };

    const disableInput = () => setIsEditing(false);

    const onInput = (value: string) => {
        setValue(value);
        mutate({
            documentId: initialData.id,
            field: "title",
            content: value || "Untitled",
        });
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            disableInput();
        }
    };

    return (
        <div className="px-12 group relative">
            {!preview && (
                <div className="flex items-center gap-x-2 group/icon pt-6"></div>
            )}

            {isEditing && !preview ? (
                <TextareaAutosize
                    ref={inputRef}
                    onBlur={disableInput}
                    onKeyDown={onKeyDown}
                    value={value}
                    onChange={(e) => onInput(e.target.value)}
                    className="text-5xl bg-transparent font-bold break-words outline-none text-text resize-none"
                ></TextareaAutosize>
            ) : (
                <div
                    className="text-5xl font-bold break-words outline-none text-text pb-[11.5px]"
                    onClick={enableInput}
                >
                    {initialData.title}
                </div>
            )}
        </div>
    );
};

Toolbar.Skeleton = function ToolbarSkeleton() {
    return (
        <Skeleton className=" p-10 w-full h-[12vh] bg-background-muted/20" />
    );
};
