import NewWorldModal from "./_components/newWorldModal";
import WorldsList from "./_components/worldsList";

export default function ControlPanelPage() {
    return (
        <>
            <div className="w-full h-full flex flex-col">
                <h2 className="mb-8">My Worlds</h2>
                <div className="flex flex-col items-center flex-grow px-4">
                    <div className="h-28 w-full p-3">
                        <NewWorldModal />
                    </div>
                    <div className="overflow-y-auto flex-grow h-0 w-full px-3">
                        <WorldsList />
                    </div>
                </div>
            </div>
        </>
    );
}
