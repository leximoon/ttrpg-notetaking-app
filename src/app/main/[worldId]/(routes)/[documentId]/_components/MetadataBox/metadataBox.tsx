import { Button } from "@/components/UI/button";
import React, { useEffect, useState } from "react";
import { EditableField } from "./_components/editableField";
import { Plus } from "lucide-react";

interface MetadataProps {
    initialData: MetadataField[];
    onChange: (newMetadata: MetadataField[]) => void;
}

interface MetadataField {
    title: string;
    content: string;
}
export const MetadataBox = ({ initialData, onChange }: MetadataProps) => {
    const [fields, setFields] = useState<MetadataField[]>(initialData);

    useEffect(() => {
        setFields(initialData);
    }, [initialData]);

    const onInput = (
        value: string,
        index: number,
        key: "title" | "content"
    ) => {
        console.log("OnChange has been called");
        const updatedFields = fields.map((field, i) => {
            if (i === index) {
                return { ...field, [key]: value };
            }
            return field;
        });
        setFields(updatedFields);
        onChange(updatedFields);
    };

    const addNewField = () => {
        const newFields = [...fields, { title: "Title", content: "Content" }];
        setFields(newFields);
        onChange(newFields);
    };

    return (
        //TODO: Improve metadata to work with block note
        <div className="flex flex-col">
            <span className="mb-4 font-bold text-2xl cursor-default p-4">
                METADATA
            </span>

            {fields.map((field, index) => (
                <div key={index} className="grid bg-background-muted/5 mb-1">
                    <EditableField
                        variant="title"
                        initialData={field.title}
                        onChange={(value) => onInput(value, index, "title")}
                    />
                    <EditableField
                        initialData={field.content}
                        onChange={(value) => onInput(value, index, "content")}
                    />
                </div>
            ))}

            <div className="grid transition-all">
                <Button
                    className="hover:bg-background-muted transition-all "
                    size="s"
                    label="Add metadata"
                    variant="transparent"
                    icon={<Plus />}
                    onClick={addNewField}
                />
            </div>
        </div>
    );
};
