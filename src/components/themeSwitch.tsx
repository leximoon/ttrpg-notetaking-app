"use client";
import { Moon, Sun } from "lucide-react";
import { Switch } from "./UI/toggle";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Spinner } from "./UI/spinner";

interface ThemeSwitchProps {
    label?: string;
    size?: "s" | "m";
}

const ThemeSwitch = ({ label, size = "s" }: ThemeSwitchProps) => {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // This ensures that the component is only mounted once client-side theme information is available.
        setMounted(true);
    }, []);

    const selectTheme = (isChecked: boolean) => {
        if (isChecked) setTheme("dark");
        else setTheme("light");
    };

    if (!mounted) return <Spinner />;

    return (
        <div className="flex flex-row ">
            <span className="mx-2 font-semibold">{label}</span>
            <Sun className="w-5 mx-2" />

            <Switch
                size={size}
                onChange={selectTheme}
                checked={resolvedTheme === "dark" ? true : false}
            />
            <Moon className="w-5 mx-2" />
        </div>
    );
};

export default ThemeSwitch;
