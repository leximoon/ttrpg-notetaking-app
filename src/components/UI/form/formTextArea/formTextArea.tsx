"use client";

import { Controller, useFormContext } from "react-hook-form";

//TODO: Extend from HTMLInputAttributes
interface FormTextAreaProps
    extends React.TextareaHTMLAttributes<HTMLInputElement> {
    name: string;
    isRequired?: boolean;
    errorMessage?: string;
}
//TODO: Define errorMessage to display
export function FormTextArea({
    placeholder,
    name,
    isRequired = false,
    errorMessage,
    className,
}: FormTextAreaProps) {
    const {
        control,
        //formState: { errors },
    } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <div className={className}>
                    <textarea
                        className="block w-full h-full p-3 text-sm text-text border-2 border-gray-300 rounded-lg bg-background outline-none focus:ring-accent focus:border-accent resize-none"
                        placeholder={placeholder}
                        required={isRequired}
                        value={field.value}
                        onChange={field.onChange}
                    />
                    {errorMessage && (
                        <label className="text-error pl-1 overflow-clip">
                            {errorMessage}
                        </label>
                    )}
                </div>
            )}
        />
    );
}
