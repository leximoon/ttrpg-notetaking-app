import { loginUser } from "@/lib/api/authApi";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",

            credentials: {
                username: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                //credentials passed when login, username is just the var name, but can be the email.
                const { username, password } = credentials as {
                    username: string;
                    password: string;
                };
                if (!credentials) return null;
                //ApiCall to
                const res = await loginUser(username, password);

                const user = await res.json();

                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user;
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null;

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            },
        }),
    ],
    callbacks: {
        //Function called then nextAuth generate jwt. This will be called in logIn and when the session is checked
        async jwt({ token, user }) {
            //Check if the jwt callback is called in the login (user included) or not.
            if (user) return { ...token, ...user };
            return token;
        },

        //Function called when the session is checked
        async session({ token, session }) {
            session.user = token.user;
            return session;
        },
    },
    pages: {
        signIn: "/auth/login",
    },
};

export const authServerOptions: NextAuthOptions = {
    ...authOptions,
    callbacks: {
        ...authOptions.callbacks,
        async session({ token, session }) {
            session.backendTokens = token.backendTokens;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
