import type { Config } from "tailwindcss";

const config = {
    darkMode: "class",
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                background: "hsl(var(--background))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    contrast: "hsl(var(--primary-contrast))",
                    muted: "hsl(var(--primary-muted))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    contrast: "hsl(var(--secondary-contrast))",
                    muted: "hsl(var(--secondary-muted))",
                },
                error: {
                    DEFAULT: "hsl(var(--error))",
                    contrast: "hsl(var(--error-contrast))",
                    muted: "hsl(var(--error-muted))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    contrast: "hsl(var(--accent-contrast))",
                    muted: "hsl(var(--accent-muted))",
                },
                danger: {
                    DEFAULT: "hsl(var(--error))",
                },

                text: {
                    DEFAULT: "hsl(var(--text))",
                    secondary: "hsl(var(--text-secondary))",
                },

                shadowColor: {
                    DEFAULT: "hsl(var(--shadow-color))",
                },

                card: {
                    DEFAULT: "hsl(var(--card))",
                },

                border: {
                    DEFAULT: "hsl(var(--border))",
                },
            },
        },
    },
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
