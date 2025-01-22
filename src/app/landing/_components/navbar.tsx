"use client";

import clsx from "clsx";
import { Logo } from "./logo";
import { Button } from "@/components/UI/button";
import { redirect, RedirectType } from "next/navigation";
import { useScrollTop } from "@/hooks/useScrollTop";

export const NavBar = () => {
    const scrolled = useScrollTop();

    return (
        <div
            className={clsx(
                "z-50 bg-background fixed top-0 flex items-center w-full p-6",
                { "border-red-400 shadow-sm": scrolled }
            )}
        >
            <Logo />
            <div className="justify-end w-full flex items-center gap-x-2 font-semibold">
                <Button
                    intent={"secondary"}
                    variant={"fill"}
                    size={"m"}
                    label="Sign Up"
                    onClick={() => {
                        redirect("/auth/register", RedirectType.push);
                    }}
                />
                <Button
                    intent={"primary"}
                    variant={"fill"}
                    size={"m"}
                    label="Log In"
                    onClick={() => {
                        redirect("/auth/login", RedirectType.push);
                    }}
                />{" "}
            </div>
        </div>
    );
};
