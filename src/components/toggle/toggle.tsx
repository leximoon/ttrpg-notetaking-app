"use client";
import { cva, VariantProps } from "class-variance-authority";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

const toggleVariants = cva(
    "relative inline-flex items-center rounded-full transition-colors",
    {
        variants: {
            size: {
                s: "w-10 h-5",
                m: "w-16 h-8",
            },
            color: {
                primary: "bg-primary",
                secondary: "bg-secondary",
            },
        },

        defaultVariants: {
            size: "m",
            color: "primary",
        },
    }
);

const thumbVariants = cva(
    "absolute bg-white rounded-full shadow transform transition-transform",
    {
        variants: {
            size: {
                s: "w-4 h-4",
                m: "w-7 h-7",
            },
        },

        defaultVariants: {
            size: "m",
        },
    }
);

interface ToggleProps extends VariantProps<typeof toggleVariants> {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({
    checked = false,
    onChange,
    size,
    color,
    ...props
}) => {
    const [isChecked, setIsChecked] = React.useState(checked);

    React.useEffect(() => {
        setIsChecked(checked);
    }, [checked]);

    const handleToggle = () => {
        const newChecked = !isChecked;
        setIsChecked(newChecked);
        onChange?.(newChecked);
    };

    return (
        <button
            type="button"
            role="switch"
            aria-checked={isChecked}
            //Class name for the background
            className={twMerge(
                toggleVariants({ size }),
                isChecked ? toggleVariants({ color, size }) : "bg-gray-300"
            )}
            onClick={handleToggle}
            {...props}
        >
            <span
                //Cass name for the moving dot
                className={twMerge(
                    thumbVariants({ size }),
                    "block transition-transform",
                    isChecked
                        ? size === "s"
                            ? "translate-x-5"
                            : "translate-x-8"
                        : "translate-x-1"
                )}
            />
        </button>
    );
};

export { Toggle };
