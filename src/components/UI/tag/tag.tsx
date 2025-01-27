import { X } from "lucide-react";
import type React from "react";
import { Button } from "../button";

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
    label: string;
    onDelete: (tag: string) => void;
}

export const Tag = ({ label, onDelete }: TagProps) => {
    return (
        <div
            className="flex items-center bg-primary/80 dark:bg-primary mr-2 mb-2 px-2 py-1 rounded transition-all duration-200 ease-in-out
                     hover:bg-accent hover:text-text hover:scale-110 hover:cursor-pointer"
        >
            <span className="text-white dark:text-text-secondary text-xs line font-semibold leading-none mr-2">
                {label}
            </span>
            <Button
                className="inline-flex !text-text-secondary hover:bg-white/30 p-0.5 transition-all"
                type="button"
                size="auto"
                aria-label="Remove"
                variant="transparent"
                icon={<X size="12" />}
                onClick={() => onDelete(label)}
            />
        </div>
    );
};
