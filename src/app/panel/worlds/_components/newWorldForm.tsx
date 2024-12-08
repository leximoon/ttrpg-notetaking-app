"use client";
import { Button } from "@/components/UI/button";
import { FormInput } from "@/components/UI/form/formInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWorldsMutations } from "@hooks/useWorld";
import { useRouter } from "next/navigation";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

export const newWorldSchema = z.object({
    name: z.string().min(1, "Required"),
    description: z.string().min(1),
    isPublic: z.boolean(),
});

export type NewWorldInput = z.infer<typeof newWorldSchema>;

export default function NewWorldForm({ closeForm }: { closeForm: () => void }) {
    const methods = useForm<NewWorldInput>({
        resolver: zodResolver(newWorldSchema),
        defaultValues: {
            name: "",
            description: "Default description",
            isPublic: false,
        },
    });
    const { addWorld } = useWorldsMutations();
    const router = useRouter();

    const { handleSubmit } = methods;

    //Form submit handler
    const onSubmit = async function ({
        name,
        description,
        isPublic,
    }: NewWorldInput) {
        addWorld.mutate(
            { name, description, isPublic },
            {
                onSuccess: ({ id }) => {
                    console.log(`World created with id: ${id}`);
                    closeForm();
                    router.push(`/documents/${id}`);
                },
            }
        );
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
