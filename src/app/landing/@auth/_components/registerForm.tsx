import { Button } from "@/components/UI/button";
import { FormInput } from "@/components/UI/form/formInput";
import { registerUser } from "@/lib/api/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

export const registerSchema = z.object({
    email: z.string().min(1, "Required").email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    name: z.string().min(1, "Required"),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
    const router = useRouter();
    const methods = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
        },
    });

    const { control, handleSubmit } = methods;

    //Form submit handler
    const onSubmit = async function ({ email, password, name }: RegisterInput) {
        try {
            //ApiCall
            const { authToken, refreshToken } = await registerUser(
                email,
                password,
                name
            );

            //Success
            // Store the token in localStorage or a secure cookie
            localStorage.setItem("authToken", authToken);

            //Redirect to the dashboard
            router.push("/panel/worlds");
        } catch (err: any) {
            console.log(err.message);
        }
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

                <Button label="Login" className="self-center" />
            </form>
        </FormProvider>
    );
};
