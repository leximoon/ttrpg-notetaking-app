"use client";
import { ReactNode } from "react";
import { NavList } from "./_components/navList";
import ThemeSwitch from "@/components/themeSwitch";

import { useSession } from "next-auth/react";

const AppLayout = ({ children }: { children: ReactNode }) => {
    const { data: session } = useSession();

    return (
        <div className="bg-background w-screen h-screen flex justify-center items-center">
            {session?.user ? <>User loged in</> : <>User not loged in</>}
            <div className="flex flex-row rounded-lg border border-border w-5/6 h-4/5 xl:w-3/6 xl:h-3/5  shadow-md shadow-shadowColor">
                <aside className="z-40 w-56 rounded-l-lg bg-secondary/25 border-r-2 border-border p-5 pt-10 pl-7 text-sm">
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
