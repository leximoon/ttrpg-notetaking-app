"use client";
import AuthDialog from "@/app/auth/_components/authDialog";
import { LoginForm } from "@/app/auth/_components/loginForm";
import React from "react";

//import AuthDialog from "../_components/authDialog";

export default function LoginPage() {
    return (
        <AuthDialog>
            <LoginForm />
        </AuthDialog>
    );
}
