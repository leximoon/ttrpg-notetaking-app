import { Button } from "@/components/UI/button";
import React from "react";

export default function AuthDialog() {
    return (
        <>
            <Button
                intent={"secondary"}
                variant={"fill"}
                size={"m"}
                label="Sign Up"
            />
            <Button
                intent={"primary"}
                variant={"fill"}
                size={"m"}
                label="Log In"
            />
        </>
    );
}
