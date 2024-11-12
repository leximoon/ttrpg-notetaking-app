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
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    contrast: "hsl(var(--secondary-contrast))",
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
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
