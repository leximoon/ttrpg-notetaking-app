"use client";

import type { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useTheme } from "next-themes";

interface EditorProps {
    onChange: (value: string) => void;
    initialContent?: string;
    editable?: boolean;
}

export const Editor = ({
    onChange,
    initialContent,
    editable = true,
}: EditorProps) => {
    const { resolvedTheme } = useTheme();

    const editor: BlockNoteEditor | null = useCreateBlockNote({
        initialContent: initialContent
            ? (JSON.parse(initialContent) as PartialBlock[])
            : undefined,
    });

    return (
        <div>
            {editor && (
                <BlockNoteView
                    editor={editor}
                    theme={resolvedTheme === "dark" ? "dark" : "light"}
                    editable={editable}
                    onChange={() => {
                        onChange(JSON.stringify(editor.document));
                    }}
                />
            )}
        </div>
    );
};
