import React from "react";
import { RegisterForm } from "../_components/registerForm";

export default function LoginPage() {
    return (
        <div className="flex h-full justify-center items-center">
            <div className="w-1/4 bg- p-4 rounded-lg bg-card shadow-md shadow-shadowColor">
                <h2 className="text-center m-2">Welcome to BookWyrm</h2>
                <RegisterForm />
            </div>
        </div>
    );
}
