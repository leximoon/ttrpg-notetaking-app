import { loginUser } from "@/lib/api/authApi";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Email:",
                    type: "email",
                },
                password: {
                    label: "Password:",
                    type: "password",
                },
            },
            async authorize(credentials) {
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

                    return response.user;
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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
