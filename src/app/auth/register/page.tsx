"use client";
import React from "react";

import AuthDialog from "../_components/authDialog";
import { RegisterForm } from "../_components/registerForm";

export default function LoginPage() {
    return (
        <AuthDialog title="Register">
            <RegisterForm />
        </AuthDialog>
    );
}
