import NewWorldModal from "./_components/newWorldModal";
import WorldsList from "./_components/worldsList";

export default function ControlPanelPage() {
    return (
        <>
            <div className="w-full">
                <h2 className="mb-8">My Worlds</h2>
                <div className="flex flex-col items-center">
                    <div className="w-10/12 h-20">
                        <NewWorldModal />
                        <WorldsList />
                    </div>
                </div>
            </div>
        </>
    );
}
