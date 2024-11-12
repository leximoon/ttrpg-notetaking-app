import { ReactNode } from "react";
import { Earth, User, Sun, Moon } from "lucide-react";
import NextLink from "next/link";
import { Switch } from "@/components/toggle";

export const metadata = {
    title: "Control panel",
    description: "Control panel",
};

const AppLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="bg-background w-screen h-screen flex justify-center items-center">
            <div className="flex flex-row rounded-lg border border-gray-300 w-3/6 h-3/5  shadow-md">
                <aside className="z-40 w-56 rounded-l-lg bg-background border-r-2 border-gray-300 p-5 pt-10 pl-7 text-sm">
                    <div className="h-full flex flex-col justify-between">
                        <ul className="space-y-2 font-normal">
                            <li>
                                <NextLink
                                    key="test"
                                    href="/dashboard/panel"
                                    className="flex items-center p-2 rounded-lg hover:bg-primary/15"
                                >
                                    <Earth className="w-5" />
                                    <span className="ms-3">My Worlds</span>
                                </NextLink>
                            </li>
                            <li>
                                <NextLink
                                    key="test"
                                    href="/dashboard/account"
                                    className="flex items-center p-2 rounded-lg hover:bg-primary/10"
                                >
                                    <User className="w-5" />
                                    <span className="ms-3">Account</span>
                                </NextLink>
                            </li>
                        </ul>

                        <div className="flex flex-row">
                            <div className="flex flex-row items-center">
                                <span className="mx-2 font-semibold">
                                    Theme
                                </span>
                                <Sun className="w-5 mx-2" />
                                <Switch size="s" />
                                <Moon className="w-5 mx-2" />
                            </div>
                        </div>
                    </div>
                </aside>
                <div className="p-10 w-full">{children}</div>
            </div>
        </div>
    );
};

export default AppLayout;
