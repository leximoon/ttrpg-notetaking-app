import { Map } from "lucide-react";

interface ListElementProps {
    name: string;
    description: string;
    icon?: JSX.Element;
}

const ListElement = ({
    name,
    description,
    icon = <Map />,
}: ListElementProps) => {
    return (
        <>
            <li className="flex items-center border py-2 my-3 cursor-pointer hover:bg-secondary/15">
                <div className="mx-4 text-text">{icon}</div>
                <div className="flex flex-col font-semibold">
                    <span className="text-sm text-text">{name}</span>
                    <span className="text-xs text-text-secondary">
                        {description}
                    </span>
                </div>
            </li>
        </>
    );
};

export { ListElement };
