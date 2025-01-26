"use client";
import { Button } from "@/components/UI/button";
import { cva, VariantProps } from "class-variance-authority";
import { Edit } from "lucide-react";
import React, { ElementRef, useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

const editableField = cva(
    "bg-transparent break-words outline-none text-text resize-none mx-1 w-full px-4 ",
    {
        variants: {
            variant: {
                title: ["font-bold text-l"],
                text: [""],
            },
            isEditing: {
                true: "bg-background-muted",
                false: "",
            },
        },
        defaultVariants: {
            variant: "text",
            isEditing: false,
        },
    }
);

interface EditableFieldProps
    extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange">,
        VariantProps<typeof editableField> {
    initialData: string;
    onChange: (value: string) => void;
}

export const EditableField = ({
    initialData,
    className,
    variant,
    onChange,
    ...props
}: EditableFieldProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialData);
    const inputRef = useRef<ElementRef<"textarea">>(null);

    useEffect(() => {
        if (inputRef.current) {
            isEditing ? inputRef.current.focus() : inputRef.current.blur();
        }
    }, [isEditing]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleBlur();
        }
    };

    const handleBlur = () => {
        console.log("blur handled");
        setIsEditing(false);
        onChange(value);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
        onChange(value);
    };

    return (
        <div className="flex flex-row items-center group hover:bg-primary/5">
            <TextareaAutosize
                ref={inputRef}
                value={value}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                className={`${editableField({
                    className,
                    isEditing,
                    variant,
                })}`}
            ></TextareaAutosize>

            <Edit className=" text-text w-4 mx-2 my-1 opacity-0 group-hover:opacity-100 transition-all" />
        </div>
    );
};
