"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Input } from "../../input";

//TODO: Extend from HTMLInputAttributes
interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    isRequired?: boolean;
    errorMessage?: string;
}
//TODO: Define errorMessage to display
export function FormInput({
    placeholder,
    type,
    name,
    isRequired = false,
    errorMessage,
    disabled,
    className,
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
                <Input
                    className={className}
                    type={type}
                    placeholder={placeholder}
                    isRequired={isRequired}
                    value={field.value}
                    onChange={field.onChange}
                    errorMessage={errorMessage}
                    name={name}
                    disabled={disabled}
                />
            )}
        />
    );
}
