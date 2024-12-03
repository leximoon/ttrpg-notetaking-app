"use client";
import { Button } from "@/components/UI/button";
import { FormInput } from "@/components/UI/form/formInput";
import { loginUser } from "@/lib/api/authApi";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

//TODO: Create schema files
export const loginSchema = z.object({
    email: z.string().min(1, "Required").email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;

//Form component
export const LoginForm = () => {
    const router = useRouter();
    const methods = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { handleSubmit } = methods;

    //Form submit handler
    const onSubmit = async function ({ email, password }: LoginInput) {
        try {
            //TODO: store user info in local storage
            //ApiCall
            const { authToken, refreshToken } = await loginUser(
                email,
                password
            );

            //Success
            //Redirect to the dashboard
            router.push("/panel/worlds");
        } catch (err: any) {
            //TODO: Handle error
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

                <Button label="Login" className="self-center" />
            </form>
        </FormProvider>
    );
};
