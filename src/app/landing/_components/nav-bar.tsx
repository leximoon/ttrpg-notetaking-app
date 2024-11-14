"use client"

import { useScrollTop } from "../../../../hooks/use-scroll-top"
import clsx from "clsx";
import { Logo } from "./logo";
import { Button } from "@/components/UI/button";


export const NavBar = () => {
    const scrolled = useScrollTop();
    return (
        <div className={clsx("z-50 bg-background fixed top-0 flex items-center w-full p-6", { "border-red-400 shadow-sm": scrolled } )}>
            <Logo />
            <div className="justify-end w-full flex items-center gap-x-2 font-semibold">
                <Button intent={"secondary"} variant={"fill"} size={"m"} label="Sign Up" />
                <Button intent={"primary"} variant={"fill"} size={"m"} label="Log In" />
            </div>
        </div>
    )
}