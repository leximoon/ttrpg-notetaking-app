"use client";
import { cva, VariantProps } from "class-variance-authority";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

//Controls the variants for the background of the switch
const switchVariants = cva("rounded-full transition-colors", {
    variants: {
        size: {
            s: "w-10 h-5",
            m: "w-16 h-9",
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
});

//Controls the variants for the thumb
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

interface SwitchProps extends VariantProps<typeof switchVariants> {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
}

const Switch: React.FC<SwitchProps> = ({
    checked = false,
    onChange,
    size,
    color,
}) => {
    const [isChecked, setIsChecked] = useState(checked);

    //Function to handle any internal control in the switch and triggers the onChange function if setted.
    const handleSwitch = () => {
        const newChecked = !isChecked;
        setIsChecked(newChecked);
        onChange?.(newChecked);
    };

    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                className="sr-only"
                checked={isChecked}
                onChange={handleSwitch}
            />
            <div
                //Background of the switch, isChecked controls the bg-color
                className={twMerge(
                    switchVariants({ size }),
                    isChecked ? switchVariants({ color, size }) : "bg-gray-300"
                )}
            ></div>
            <span
                //Thumb of the switch, isChecked controls the movement
                className={`
                ${thumbVariants({ size })}
                ${
                    isChecked
                        ? size === "s"
                            ? "translate-x-5"
                            : "translate-x-8"
                        : "translate-x-1"
                }`}
            ></span>
        </label>
    );
};

export { Switch };
