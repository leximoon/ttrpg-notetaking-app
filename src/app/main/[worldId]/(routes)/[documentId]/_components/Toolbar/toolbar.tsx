import type { Document } from "@/types/document";
import type React from "react";
import { useState, useRef, useEffect } from "react";
import { useDocument } from "@/hooks/useDocument";
import { Skeleton } from "@nextui-org/skeleton";

interface ToolbarProps {
    initialData: Document;
    preview?: boolean;
}

/*TODO: Make this component more complex:
-Add banner image
-Add better handling of the title
-Add other functions
*/
export const Toolbar = ({ initialData, preview = false }: ToolbarProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(initialData.title);
    const inputRef = useRef<HTMLInputElement>(null);
    const { editDocument } = useDocument();

    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus();
        }
    }, [isEditing]);

    const handleTitleChange = (newTitle: string) => {
        setTitle(newTitle);
        editDocument.mutate({
            documentId: initialData.id,
            field: "title",
            content: newTitle || "Untitled",
        });
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            setIsEditing(false);
        }
    };

    if (preview) {
        return (
            <h1 className="text-5xl font-bold break-words text-text pb-3 w-full min-h-[1.2em] leading-tight">
                {title}
            </h1>
        );
    }

    return (
        <div className="px-12 group relative pt-6">
            {isEditing ? (
                <input
                    ref={inputRef}
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    onBlur={() => setIsEditing(false)}
                    onKeyDown={handleKeyDown}
                    className={
                        "text-5xl font-bold break-words text-text pb-3 w-full min-h-[1.2em] leading-tight bg-transparent outline-none"
                    }
                    aria-label="Edit document title"
                />
            ) : (
                <h1
                    className={
                        "text-5xl font-bold break-words text-text pb-3 w-full min-h-[1.2em] leading-tight cursor-text"
                    }
                    onClick={() => setIsEditing(true)}
                >
                    {title}
                </h1>
            )}
        </div>
    );
};

Toolbar.Skeleton = function ToolbarSkeleton() {
    return <Skeleton className="p-10 w-full h-[12vh] bg-background-muted/20" />;
};
