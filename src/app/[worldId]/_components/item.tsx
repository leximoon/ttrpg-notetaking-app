"use client";

import { ChevronDown, ChevronRight, LucideIcon, Plus } from "lucide-react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { Skeleton } from "@nextui-org/skeleton";
import { useDocument } from "@/hooks/useDocument";
import { usePathname } from "next/navigation";

interface ItemProps {
    id?: string;
    label: string;
    onClick: () => void;
    icon: LucideIcon;
    active?: boolean;
    expanded?: boolean;
    isSearch?: boolean;
    level?: number;
    onExpand?: () => void;
}

export const Item = ({
    id,
    label,
    onClick,
    icon: Icon,
    active,
    expanded,
    isSearch,
    level = 0,
    onExpand,
    ...props
}: ItemProps) => {
    const handleExpand = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
        onExpand?.();
    };

    const pathname = usePathname();
    const worldId = pathname.split("/")[1]; //get first element from url which is worldId

    // CREATE NEW DOCUMENT
    const { addDocument } = useDocument();
    const onCreate = ( 
        e: React.MouseEvent<HTMLDivElement,MouseEvent>
    ) => {
        if(!id) return
        addDocument.mutate(
            {title:"Untitled", worldId: worldId, parentDocumentId: id}
        );
    }
    // DROPDOWN ICON >
    const ChevronIcon = expanded ? ChevronDown : ChevronRight;

    return (
        <div // BASIC ITEM 
            onClick={onClick}
            role="button"
            style={{
                paddingLeft: level ? `${level * 12 + 12}` : "12px",
            }}
            className={twMerge(
                clsx(
                    "group min-h-[27px] test-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-primary-muted font-medium",
                    { "bg-primary/5 text-primary": active }
                )
            )}
        >
            {!!id && ( // DROPDOWN BUTTON TODO: Change for only if children 
                <div
                    role="button"
                    className="h-full rounded-sm hover:bg-accent mr-1"
                    onClick={handleExpand}
                >
                    <ChevronIcon className="h-4 w-4 shrink-0 text-primary-muted/50" />
                </div>
            )}
            <Icon //DOCUMENT ICON
            className="shrink-0 h-[18px] mr-2 text-primary-muted" />
            <span className="truncate">{label}</span>
            {isSearch && ( //SEARCH BAR ITEM
                <kbd
                    className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 
                rounded border bg-secondary-muted px-1.5 font-mono text-[10px] font-medium text-primary-muted 
                opacity-100"
                >
                    <span className="text-xxs">CTRL</span>K
                </kbd>
            )}
            {!!id && ( //CREATE BUTTON FOR DOCUMENT ITEMS
                <div className="ml-auto flex items-center gap-x-2">
                    <div
                        role="button"
                        onClick={onCreate}
                        className="opacity-0 group-hover:opacity-100 h-full ml-auto
                    rounded-sm hover:bg-secondary/200 "
                    >
                        <Plus className="h-4 w-4 text-primary-muted" />
                    </div>
                </div>
            )}
        </div>
    );
};

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
    return (
        <div
            style={{
                paddingLeft: level ? `${level * 12 + 25}px` : "12px",
            }}
        >
            <Skeleton className="flex gap-x-2 py-[3px]" />
        </div>
    );
};
