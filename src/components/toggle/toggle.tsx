"use client";
import { cva, VariantProps } from "class-variance-authority";
import React, { useState } from "react";

const toggleVariants = cva("rounded-full transition-colors", {
    variants: {
        size: {
            s: "w-10 h-5",
            m: "w-16 h-8",
        },
    },

    defaultVariants: {
        size: "m",
    },
});

const dotVariants = cva(
    "absolute bg-white rounded-full shadow transform transition-transform",
    {
        variants: {
            size: {
                s: "w-4 h-4",
                m: "w-7 h-7",
            },
        },
    }
);

interface ToggleProps extends VariantProps<typeof toggleVariants> {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({ checked = false, onChange, size }) => {
    const [isToggled, setIsToggled] = useState(checked);

    const handleToggle = () => {
        const newChecked = !isToggled;
        setIsToggled(newChecked);
        if (onChange) {
            onChange(newChecked);
        }
    };

    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                className="sr-only"
                checked={isToggled}
                onChange={handleToggle}
            />
            <div
                className={`${toggleVariants({ size })} ${
                    isToggled ? "bg-primary" : "bg-gray-300"
                }`}
            ></div>
            <span
                className={`absolute bg-white rounded-full shadow transform transition-transform 
                    ${dotVariants({ size })}
                    ${
                        isToggled
                            ? size === "s"
                                ? "translate-x-5"
                                : size === "m"
                                ? "translate-x-8"
                                : "translate-x-10"
                            : "translate-x-1"
                    }`}
            ></span>
        </label>
    );
};

export { Toggle };
