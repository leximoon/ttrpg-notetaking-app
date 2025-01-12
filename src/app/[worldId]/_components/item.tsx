"use client";

import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

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
    const ChevronIcon = expanded ? ChevronDown : ChevronRight;
    return (
        <div
            onClick={onClick}
            role="button"
            style={{
                paddingLeft: level ? `${level * 12 + 12}` : "12px",
            }}
            className={twMerge(
                clsx(
                    "group min-h-[27px] test-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-primary-muted font-medium",
                    {"bg-primary/5 text-primary": active},
                )
            )}
        >
            {!!id && (
                <div
                role="button"
                className="h-full rounded-sm hover:bg-accent mr-1"
                onClick={() => {}}
                >
                    <ChevronIcon
                    className="h-4 w-4 shrink-0 text-primary-muted/50"
                    />
                </div>
            )}
            <Icon className="shrink-0 h-[18px] mr-2 text-primary-muted" />
            <span className="truncate">
                {label}
            </span>
            {isSearch && (
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 
                rounded border bg-secondary-muted px-1.5 font-mono text-[10px] font-medium text-primary-muted 
                opacity-100">
                    <span className="text-xxs">CTRL</span>K
                </kbd>
            )}
        </div>
    );
};
