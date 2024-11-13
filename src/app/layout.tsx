import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./provider";

export const metadata: Metadata = {
	title: 'BookWyrm',
	description:
		'Web app for taking notes for TTRPGs with prefabricated templates',
		
	icons: {
		icon: [
			{
				url: '/dragon-logo.svg',
				href: '/dragon-logo.svg',
				media: '(prefers-color-scheme: light)',
			},
      {
				url: '/dragon-logo.svg',
				href: '/dragon-logo.svg',
				media: '(prefers-color-scheme: dark)',
			},
		],
	},
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="light" suppressHydrationWarning>
            <body>
                <ThemeProvider>{children}</ThemeProvider>
            </body>
        </html>
    );
}
