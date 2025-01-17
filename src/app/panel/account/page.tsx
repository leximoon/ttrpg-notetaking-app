"use client";
import { Spinner } from "@/components/UI/spinner";
import { useSession } from "next-auth/react";

const AccountPage = () => {
    const { data: session, status } = useSession();

    if (status === "authenticated") {
        console.log("this is the session", session.user.name);
        return <div>Page of {session.user.name}</div>;
    } else if (status === "loading") {
        return <Spinner />;
    }
};

export default AccountPage;
