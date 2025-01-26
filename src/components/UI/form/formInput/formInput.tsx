"use client";

import { Controller, useFormContext } from "react-hook-form";

//TODO: Extend from HTMLInputAttributes
interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    isRequired: boolean;
    errorMessage?: string;
}
//TODO: Define errorMessage to display
export function FormInput({
    placeholder,
    type,
    name,
    isRequired,
    errorMessage,
}: FormInputProps) {
    const {
        control,
        //formState: { errors },
    } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <div className="relative my-2">
                    <input
                        type={type}
                        className="block w-full p-3 text-sm text-text border-2 border-gray-300 rounded-lg bg-background outline-none focus:ring-accent focus:border-accent"
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
