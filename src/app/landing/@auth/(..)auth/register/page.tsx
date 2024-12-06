import AuthDialog from "@/app/auth/_components/authDialog";
import { RegisterForm } from "@/app/auth/_components/registerForm";
import React from "react";

export default function RegisterPage() {
    return (
        <AuthDialog title="Register">
            <RegisterForm />
        </AuthDialog>
    );
}
