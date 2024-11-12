import { Footer } from "./_components/footer";
import Header from "./_components/header";
import { Main } from "./_components/main";

export default function () {
    return (
        <>
            <div className="min-h-full flex flex-col bg-background">
                <div className="flex flex-col items-center justify-center
                md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
                    <Header />
                    <Main />
                    <Footer />
                </div>
            </div>
        </>
    );
}