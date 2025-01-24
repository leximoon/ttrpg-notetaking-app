import React from "react";
import { usePopover } from "./popover";

interface PopoverTriggerProps {
    children: React.ReactNode;
}

export const PopoverTrigger: React.FC<PopoverTriggerProps> = ({ children }) => {
    const { setOpen, triggerRef } = usePopover();

    return React.cloneElement(
        React.Children.only(children) as React.ReactElement,
        {
            ref: triggerRef,
            onClick: () => setOpen((prev) => !prev),
        }
    );
};
