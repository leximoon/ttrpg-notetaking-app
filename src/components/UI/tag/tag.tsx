import type React from "react";

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
    label: string;
}

export const Tag = ({ label }: TagProps) => {
    return (
        <span
            className="inline-block bg-primary text-text-secondary text-xs font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded
                     transition-all duration-200 ease-in-out
                     hover:bg-accent hover:text-text hover:scale-110 hover:cursor-pointer"
        >
            {label}
        </span>
    );
};
