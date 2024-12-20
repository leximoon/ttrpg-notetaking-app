import { Logo } from "./logo";
import { Button } from "@/components/UI/button";

export const Footer = () => {
    return (
        <div className="flex items-center w-full p-6 bg-background z-50">
            <Logo />
            <div className=" w-full justify-end flex items-center gap-x-2 text-text">
                <Button
                    intent={"primary"}
                    variant={"transparent"}
                    size={"m"}
                    label="Contact Us"
                />
            </div>
        </div>
    );
};
