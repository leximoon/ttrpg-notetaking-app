import { authServerOptions } from "@/app/api/auth/[...nextauth]/route";

import { getServerSession } from "next-auth";

const AccountPage = async () => {
    const session = await getServerSession(authServerOptions);
    console.log(session);

    return <div>Page of {session?.user.name}</div>;
};

export default AccountPage;
