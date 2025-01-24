"use client";
import { cva, VariantProps } from "class-variance-authority";
import React, { ElementRef, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

const editableField = cva(
    "bg-transparent break-words outline-none text-text resize-none mx-1",
    {
        variants: {
            variant: {
                title: ["font-bold text-l"],
                text: [""],
            },
        },
        defaultVariants: {
            variant: "text",
        },
    }
);

interface EditableFieldProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
        VariantProps<typeof editableField> {
    initialData: string;
    preview?: boolean;
}

export const EditableField = ({
    initialData,
    className,
    variant,
}: EditableFieldProps) => {
    const inputRef = useRef<ElementRef<"textarea">>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialData);

    const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            disableInput();
        }
    };
    const disableInput = () => setIsEditing(false);

    const onInput = (value: string) => {
        setValue(value);
    };

    return (
        <TextareaAutosize
            ref={inputRef}
            onBlur={disableInput}
            onKeyDown={onKeyDown}
            value={value}
            onChange={(e) => onInput(e.target.value)}
            className={`${editableField({
                className,
                variant,
            })}`}
        ></TextareaAutosize>
    );
};
