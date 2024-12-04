"use client";

import { useSession } from "next-auth/react";

const AccountPage = () => {
    const { data: session } = useSession();
    console.log(JSON.stringify(session));

    return <div>Account Page of {session?.user?.name}</div>;
};

export default AccountPage;
