import React from "react";
import { LoginForm } from "../_components/loginForm";

export default function LoginPage() {
    return (
        <div className="flex h-full justify-center items-center">
            <div className="w-1/4 bg- p-4 rounded-lg bg-card shadow-md shadow-shadowColor">
                <h2 className="text-center m-2">Welcome to BookWyrm</h2>
                <LoginForm />
            </div>
        </div>
    );
}
