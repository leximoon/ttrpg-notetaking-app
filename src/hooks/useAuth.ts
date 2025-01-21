import { signIn } from "next-auth/react";
import { useFetch } from "./useFetch";

export function useAuth() {
    const { data, error, isLoading, fetch } = useFetch();

    const register = async (user: any) => {
        const response = await fetch(`/user/register`, {
            method: "POST",
            body: user,
        });
        return response;
    };

    return { register };
}
