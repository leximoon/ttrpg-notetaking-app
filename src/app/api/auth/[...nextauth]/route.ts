/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

async function refreshToken(token: JWT): Promise<JWT> {
	console.log('refreshing...');
	const res = await fetch(process.env.BACKEND_URL + '/user/refresh', {
		method: 'POST',
		headers: {
			authorization: `bearer ${token.backendTokens.refreshToken}`,
		},
	});

	const response = await res.json();
	console.log('token refreshed');
	return {
		...token,
		backendTokens: response,
	};
}

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',

			credentials: {
				username: { label: 'Email', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				//credentials passed when login, username is just the var name, but can be the email.
				const { username, password } = credentials as {
					username: string;
					password: string;
				};

				//ApiCall to
				console.log('credentials', { username, password });
				const res = await fetch('http://localhost:5000/user/login', {
					method: 'POST',
					body: JSON.stringify({ username, password }),
					headers: { 'Content-Type': 'application/json' },
				});

				const user = await res.json();

				if (user && res.ok) {
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
		async jwt({ token, user, trigger, session }) {
			if (trigger === 'update' && session?.user) {
				token.user = session.user;
			}

			//Check if the jwt callback is called in the login (user included) or not.
			if (user) return { ...token, ...user };
			//Checking expiring time
			const currentDate = new Date().getTime();
			if (currentDate < (token.backendTokens.expiresIn as number)) {
				return token;
			}

			//Refreshing access token
			const refreshedToken = await refreshToken(token);
			return refreshedToken;
		},

		//Function called when the session is checked
		async session({ token, session, user }) {
			session.user = token.user;
			return session;
		},
	},
	pages: {
		signIn: '/auth/login',
	},
};

export const authServerOptions: NextAuthOptions = {
	...authOptions,
	callbacks: {
		...authOptions.callbacks,
		async session({ token, session }) {
			session.user = token.user;
			session.backendTokens = token.backendTokens;
			return session;
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
