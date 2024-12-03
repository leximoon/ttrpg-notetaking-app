"use client";
import React from "react";

import AuthDialog from "../_components/authDialog";
import { LoginForm } from "../_components/loginForm";

export default function LoginPage() {
    return (
        <AuthDialog title="LOGIN">
            <LoginForm />
        </AuthDialog>
    );
}
