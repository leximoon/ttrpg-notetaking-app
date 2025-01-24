import type React from "react";
import { useRef, useEffect } from "react";
import { usePopover } from "./popover";

interface PopoverContentProps {
    children: React.ReactNode;
}

export const PopoverContent: React.FC<PopoverContentProps> = ({ children }) => {
    const { open, setOpen, triggerRef } = usePopover();
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                contentRef.current &&
                !contentRef.current.contains(event.target as Node) &&
                triggerRef.current &&
                !triggerRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setOpen, triggerRef]);

    if (!open) return null;

    return (
        <div
            ref={contentRef}
            style={{
                position: "absolute",
                top: triggerRef.current
                    ? triggerRef.current.offsetHeight + 5
                    : 0,
                left: triggerRef.current ? triggerRef.current.offsetLeft : 0,
                zIndex: 1000,
                backgroundColor: "white",
                borderRadius: "4px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                padding: "8px",
            }}
        >
            {children}
        </div>
    );
};
