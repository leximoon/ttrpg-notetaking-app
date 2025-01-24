import { Button } from "@/components/UI/button";
import React from "react";
import { EditableField } from "./_components/editableField";

interface MetadataProps {
    initialData: MetadataField[];
    onChange: (newTags: string[]) => void;
}

interface MetadataField {
    title: string;
    content: string;
}
export const Metadata = ({ initialData, onChange }: MetadataProps) => {
    const onInput = (value: string, key: string) => {
        const newMeta: MetadataField[] = initialData;
    };
    return (
        <div className="flex flex-col ">
            <span className="mb-4 font-bold text-2xl cursor-default p-4">
                METADATA
            </span>

            {initialData != undefined &&
                initialData.map(
                    (
                        { title, content }: { title: string; content: string },
                        index
                    ) => (
                        <div className="grid mb-5">
                            <EditableField
                                variant="title"
                                initialData={title}
                                onChange={(e) =>
                                    onInput(e.target.value, "title")
                                }
                            />
                            <EditableField
                                initialData={content}
                                onChange={(e) =>
                                    onInput(e.target.value, "content")
                                }
                            />
                        </div>
                    )
                )}

            {/*<Button size="s" label="Add metadata" /> */}
        </div>
    );
};
