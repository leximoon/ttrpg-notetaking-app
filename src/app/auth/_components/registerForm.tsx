"use client";
import { Button } from "@/components/UI/button";
import { FormInput } from "@/components/UI/form/formInput";
import { useAuth } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

export const registerSchema = z.object({
    email: z.string().min(1, "Required").email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    name: z.string().min(1, "Required"),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
    const { register } = useAuth();
    const methods = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
        },
    });

    const { handleSubmit } = methods;

    //Form submit handler
    const onSubmit = async function ({ email, password, name }: RegisterInput) {
        const response = await register({ email, password, name });
        console.log(response);
        await signIn("credentials", {
            username: email,
            password: password,
            redirect: true,
            callbackUrl: "/panel/worlds",
        });
    };

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-3"
            >
                <FormInput
                    placeholder="Insert your email"
                    type="email"
                    name="email"
                    isRequired
                />
                <FormInput
                    placeholder="Insert your password"
                    type="password"
                    name="password"
                    isRequired
                />
                <FormInput
                    placeholder="Insert your name"
                    type="name"
                    name="name"
                    isRequired
                />

                <Button label="Register" className="self-center" />
            </form>
        </FormProvider>
    );
};
