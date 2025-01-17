import { authServerOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { RequestInit } from "next/dist/server/web/spec-extension/request";

export const fetchInit = async (method: "POST" | "GET", body?: any) => {
    const session = await getServerSession(authServerOptions);
    return {
        method: method,
        headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${session?.backendTokens.accessToken}`,
        },
        credentials: "include",

        body: JSON.stringify(body),
    } as RequestInit;
};
