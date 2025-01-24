import { Button } from "@/components/UI/button";
import { Map, Trash2 } from "lucide-react";
interface ListElementProps extends React.HTMLAttributes<HTMLLIElement> {
    name: string;
    description: string;
    onDelete: () => void;
    icon?: JSX.Element;
}

const ListElement = ({
    name,
    description,
    icon = <Map />,
    onClick,
    onDelete,
}: ListElementProps) => {
    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        onDelete();
    };
    return (
        <>
            <li
                className="flex items-center border mb-3 cursor-pointer hover:bg-secondary/15 justify-between"
                onClick={onClick}
            >
                <div className="flex">
                    <div className="mx-4 text-text">{icon}</div>
                    <div className="flex flex-col font-semibold justify-between">
                        <span className="text-sm text-text">{name}</span>
                        <span className="text-xs text-text-secondary">
                            {description}
                        </span>
                    </div>
                </div>

                <Button
                    className="relative m-2 !p-2"
                    intent="danger"
                    variant="transparent"
                    onClick={handleDelete}
                    size="s"
                    icon={<Trash2 size="20" />}
                />
            </li>
        </>
    );
};

export { ListElement };
