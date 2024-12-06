/* eslint-disable @typescript-eslint/no-unused-vars */
import { loginUser } from "@/lib/api/authApi";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextApiRequest, NextApiResponse } from "next/types";
import { cookies } from "next/headers";

import { parse } from "cookie";

type NextAuthOptionsCallback = (
    req: NextApiRequest,
    res: NextApiResponse
) => NextAuthOptions;

const nextAuthOptions: NextAuthOptionsCallback = (req, res) => {
    return {
        providers: [
            CredentialsProvider({
                credentials: {
                    username: { label: "Email", type: "email" },
                    password: { label: "Password", type: "password" },
                },
                async authorize(credentials, req) {
                    try {
                        //TODO: store user info in local storage
                        //ApiCall

                        if (!credentials) {
                            throw new Error("Credentials not provided");
                        }

                        const response = await loginUser(
                            credentials?.username,
                            credentials?.password
                        );
                        const resolvedCookies = await cookies();
                        const apiCookies = response.headers.getSetCookie();
                        if (apiCookies && apiCookies.length > 0) {
                            apiCookies.forEach((cookie) => {
                                const parsedCookie = parse(cookie);
                                const [cookieName, cookieValue] =
                                    Object.entries(parsedCookie)[0];
                                console.log(cookieName, cookieValue);

                                if (cookieValue !== undefined) {
                                    resolvedCookies.set(
                                        cookieName,
                                        cookieValue,
                                        {
                                            httpOnly: true,
                                            path: parsedCookie.path,
                                            secure: true,
                                            sameSite: "strict",
                                            maxAge: Number(parsedCookie.maxAge),
                                        }
                                    );
                                }
                            });
                        }

                        return response.json();
                    } catch (err) {
                        //TODO: Handle error

                        console.error(err);
                        return null;
                    }
                },
            }),
        ],
        pages: {
            signIn: "/auth/login",
        },
    };
};
export const handler = (req: NextApiRequest, res: NextApiResponse) => {
    return NextAuth(req, res, nextAuthOptions(req, res));
};

export { handler as GET, handler as POST };
