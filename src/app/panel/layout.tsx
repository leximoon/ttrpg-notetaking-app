import { ReactNode } from "react";
import { NavList } from "./_components/navList";
import ThemeSwitch from "@/components/themeSwitch";

export const metadata = {
    title: "Control panel",
    description: "Control panel",
};

const AppLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="bg-background w-screen h-screen flex justify-center items-center">
            <div className="flex flex-row rounded-lg border border-gray-300 w-3/6 h-3/5  shadow-md shadow-shadowColor">
                <aside className="z-40 w-56 rounded-l-lg bg-card border-r-2 border-gray-300 p-5 pt-10 pl-7 text-sm">
                    <div className="h-full flex flex-col justify-between">
                        <NavList />
                        <ThemeSwitch label="Theme" />
                    </div>
                </aside>
                <div className="p-10 w-full bg-card rounded-r-lg">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AppLayout;
