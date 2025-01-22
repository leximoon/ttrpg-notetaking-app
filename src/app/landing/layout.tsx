import { NavBar } from "./_components/navbar";

const LandingPageLayout = ({
    children,
    auth,
}: {
    children: React.ReactNode;
    auth: React.ReactNode;
}) => {
    return (
        <div className="h-full">
            <NavBar />
            <main className="h-full pt-40">
                {auth}
                {children}
            </main>
        </div>
    );
};

export default LandingPageLayout;
