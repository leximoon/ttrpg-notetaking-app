import { getServerSession } from "next-auth";
import Header from "./_components/header";
import { Main } from "./_components/main";
import { redirect, RedirectType } from "next/navigation";

export default async function LandingPage() {
    const session = await getServerSession();
    if (session) {
        redirect("/panel/worlds", RedirectType.replace);
    }
    return (
        <>
            <div className="min-h-full flex flex-col bg-background">
                <div
                    className="flex flex-col items-center justify-center
                md:justify-start text-center gap-y-8 flex-1 px-6 pb-10"
                >
                    <Header />
                    <Main />
                </div>
            </div>
        </>
    );
}
