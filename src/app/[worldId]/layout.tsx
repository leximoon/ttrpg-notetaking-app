import { Navigation } from "./_components/navigation";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    //TODO: when we have auth, add check with spinner here.
    //TODO: Add redirect if not authenticated as well.

    return (
        <div className="h-full flex bg-background">
            <Navigation />
            <main className="flex-1 h-full overflow-y-auto">{children}</main>
        </div>
    );
};

export default MainLayout;
