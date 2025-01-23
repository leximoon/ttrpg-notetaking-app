import { VariantProps } from "@nextui-org/theme";
import { cva } from "class-variance-authority";
import React from "react";

const input = cva(
    "block w-full p-2 text-sm text-text border-2 rounded-lg outline-none focus:ring-accent focus:border-accent",
    {
        //Properties of the button

        //TODO: Add transparent with no border option
        variants: {
            //Defines the main color of the button
            intent: {
                primary: [
                    "border-background bg-background disabled:bg-background/30 disabled:border-transparent disabled:text-text/60",
                ],
            },
            //Define the style of the button
            variant: {
                fill: ["border-transparent"],
            },
        },

        /**
         * Default values
         *  */
        defaultVariants: {
            intent: "primary",
            variant: "fill",
        },
    }
);

interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement>,
        VariantProps<typeof input> {
    name: string;
    isRequired?: boolean;
    errorMessage?: string;
}

const Input = ({
    type,
    placeholder,
    isRequired = false,
    value,
    onChange,
    errorMessage,
    className,
    intent,
    variant,
    disabled,
    name,
}: InputProps) => {
    return (
        <div className="relative">
            <input
                type={type}
                className={`${input({ className, intent, variant })}`}
                placeholder={placeholder}
                required={isRequired}
                value={value}
                name={name}
                onChange={onChange}
                disabled={disabled}
            />
            {errorMessage && (
                <label className="text-error pl-1 overflow-clip">
                    {errorMessage}
                </label>
            )}
        </div>
    );
};
export { Input };
