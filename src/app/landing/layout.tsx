import { NavBar } from "./_components/nav-bar";

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
                {children}
                {auth}
            </main>
        </div>
    );
};

export default LandingPageLayout;
