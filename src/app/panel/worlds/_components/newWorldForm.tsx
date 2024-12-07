import { Button } from "@/components/UI/button";
import { FormInput } from "@/components/UI/form/formInput";
import { createWorld } from "@/lib/api/worldsApi";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { redirect } from "next/navigation";

export const newWorldSchema = z.object({
    name: z.string().min(1, "Required"),
    description: z.string().min(1),
    isPublic: z.boolean(),
});

export type NewWorldInput = z.infer<typeof newWorldSchema>;

export default function NewWorldForm() {
    const methods = useForm<NewWorldInput>({
        resolver: zodResolver(newWorldSchema),
        defaultValues: {
            name: "",
            description: "Default description",
            isPublic: false,
        },
    });

    const { handleSubmit } = methods;

    //Form submit handler
    const onSubmit = async function ({
        name,
        description,
        isPublic,
    }: NewWorldInput) {
        console.log(name, " Creating new world");
        const response = await createWorld({ name, description, isPublic });
        if (response) {
            redirect("/documents");
        }
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    placeholder="Enter world name"
                    type="text"
                    name="name"
                    isRequired
                />

                <div className="pb-3">
                    {" "}
                    <span className=" text-sm text-text/50">
                        You can change this later
                    </span>
                </div>
                <Button intent="secondary" label="Create world" fillOut />
            </form>
        </FormProvider>
    );
}
