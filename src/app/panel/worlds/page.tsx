import { ListElement } from "../_components/listElement";
import { Trees } from "lucide-react";
import NewWorldModal from "../_components/newWorldModal";

export default function ControlPanelPage() {
    return (
        <>
            <div className="w-full">
                <h2 className="mb-8">My Worlds</h2>
                <div className="flex flex-col items-center">
                    <div className="w-10/12 h-20">
                        <NewWorldModal />
                        <ul>
                            <ListElement
                                name="World name"
                                description="Description of world"
                                icon={<Trees />}
                            />
                            <ListElement
                                name="World name"
                                description="Description of world"
                            />
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
