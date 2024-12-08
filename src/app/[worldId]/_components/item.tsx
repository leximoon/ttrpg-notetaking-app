"use client";

import { Button } from "@/components/UI/button";
import { ReactNode } from "react";

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
    fillOut?: boolean;
    label?: string;
    className?: string;
    icon?: React.ReactNode
}

export const Item = ({
    className,
    icon,
    label,
    fillOut = false,
    onClick,
    ...props
}: ItemProps) => {
    return(
        <div>
            item
        </div>
        //<Button onClick={onClick} label={label} variant="transparent" intent="sidebaritem" icon=
    )
}