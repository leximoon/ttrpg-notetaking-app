"use client";

import { Button } from "@/components/UI/button";
import { ReactNode } from "react";

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
    fillOut?: boolean;
    label?: string;
    className?: string;
    icon?: React.ReactNode;
    fn: () => void;
}

export const Item = ({
    className,
    icon,
    label,
    fn,
    ...props
}: ItemProps) => {
    return(
        <>
            <div>
                <Button onClick={fn} className={className} label={label} variant="fill" intent="primary" icon={icon} />
            </div>
        </>
    )
}