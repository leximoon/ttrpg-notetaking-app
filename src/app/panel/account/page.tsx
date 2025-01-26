"use client";
import { Button } from "@/components/UI/button";
import { FormInput } from "@/components/UI/form/formInput";
import { Input } from "@/components/UI/input";
import { useFetch } from "@/hooks/useFetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

export const userDataSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email adress"),
});

export type UserDataInput = z.infer<typeof userDataSchema>;

const AccountPage = () => {
    const { data: session, update } = useSession();
    if (!session) {
        redirect("/");
    }

    const methods = useForm<UserDataInput>({
        resolver: zodResolver(userDataSchema),
        defaultValues: {
            name: "",
            email: "",
        },
    });

    const { resetField, setValue, handleSubmit } = methods;

    //edi check state and error
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const { fetch } = useFetch();

    //Load the values from the session into the inputs
    useEffect(() => {
        setValue("name", session.user.name);
        setValue("email", session.user.email);
    }, [session?.user]);

    //enables edit mode
    const editMode = () => {
        setIsEditing(true);
    };
    //disables edit mode
    const cancelEdit = useCallback(() => {
        setIsEditing(false);
        setValue("name", session.user.name);
        setValue("email", session.user.email);
    }, []);

    const onSubmit = async function ({ name, email }: UserDataInput) {
        const { data } = await fetch(`/user/${session.user.id}`, {
            method: "PUT",
            body: { email: email, name: name },
        });
        console.log("BackendUpdated", data);
        const updatedSession = await update({
            user: {
                id: session.user.id,
                email: email,
                name: name,
            },
        });
        console.log("new user: ", updatedSession);
        setIsEditing(false);
    };

    return (
        <FormProvider {...methods}>
            <form
                className="w-full flex flex-col h-full pb-10"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="mb-4 w-full">
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-text pb-2"
                    >
                        Name
                    </label>
                    <FormInput
                        type="text"
                        name="name"
                        className="w-full"
                        placeholder="Name"
                        isRequired
                        disabled={!isEditing}
                    />
                </div>

                <div className="mb-4 w-full">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-text pb-2"
                    >
                        Email
                    </label>
                    <FormInput
                        type="email"
                        name="email"
                        className="w-full"
                        placeholder="Email"
                        disabled={!isEditing}
                    />
                </div>

                <div className="flex gap-2">
                    {!isEditing ? (
                        <Button
                            label="Edit profile"
                            onClick={(e) => {
                                e.preventDefault();
                                editMode();
                            }}
                            type="button"
                        />
                    ) : (
                        <>
                            <Button label="Save changes" type="submit" />
                            <Button
                                label="Cancel"
                                onClick={cancelEdit}
                                type="button"
                                intent="danger"
                            />
                        </>
                    )}
                </div>
            </form>
        </FormProvider>
    );
};

export default AccountPage;
