"use client";

import {
    ChevronsLeft,
    MenuIcon,
    PlusCircle,
    Search,
} from "lucide-react";
import { usePathname } from "next/navigation";
import React, { ElementRef, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useDocument } from "@/hooks/useDocument";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

import { UserItem } from "./userItem";
import { Item } from "./item";
import { DocumentList } from "./documentList";

// ALL NAVIGATION
export const Navigation = () => {
    const pathname = usePathname();

    // WINDOW SIZE CHECK
    const isSmall = useMediaQuery("(max-width: 768px)");

    // REFERENCES TO ELEMENTS
    const isResizingRef = useRef(false);
    const sideBarRef = useRef<ElementRef<"aside">>(null);
    const navBarRef = useRef<ElementRef<"div">>(null);

    // STATES FOR RESETTING AND COLLAPSING
    const [isResetting, setIsResetting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(isSmall);

    // LOADING DOCUMENTS
    const worldId = pathname.split("/")[2]; //get first element from url which is worldId

    // CREATING DOCUMENT
    const { addDocument } = useDocument();
    const handleDocument = () => {
        addDocument.mutate({ title: "Untitled", worldId });
    };

    // MOUSE ACTION FUNCTIONS
    // When clicking set resizing to true and add event listeners
    const handleMouseDown = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.preventDefault();
        event.stopPropagation();

        isResizingRef.current = true;
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    // When moving while clicking change size
    const handleMouseMove = (event: MouseEvent) => {
        if (!isResizingRef.current) return;
        let newWidth = event.clientX;

        if (newWidth < 240) newWidth = 240;
        if (newWidth > 480) newWidth = 480;

        if (sideBarRef.current && navBarRef.current) {
            sideBarRef.current.style.width = `${newWidth}px`;
            navBarRef.current.style.setProperty("left", `${newWidth}px`);
            navBarRef.current.style.setProperty(
                "width",
                `calc(100% - ${newWidth}px)`
            );
        }
    };

    // When click ends reset resizing to false and remove event listeners
    const handleMouseUp = () => {
        isResizingRef.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    // RESIZE FUNCTIONS
    // Reset side bar to original size
    const resetWidth = () => {
        if (sideBarRef.current && navBarRef.current) {
            setIsCollapsed(false);
            setIsResetting(true);

            sideBarRef.current.style.width = isSmall ? "100%" : "240px";
            navBarRef.current.style.setProperty(
                "left",
                isSmall ? "100%" : "240px"
            );
            navBarRef.current.style.setProperty(
                "width",
                isSmall ? "0" : "calc(100% - 240px"
            );

            //time for resetting same as duration of transition animation
            setTimeout(() => setIsResetting(false), 300);
        }
    };

    // Collapse side bar completely
    const collapse = () => {
        if (sideBarRef.current && navBarRef.current) {
            setIsCollapsed(true);
            setIsResetting(true);

            sideBarRef.current.style.width = "0";
            navBarRef.current.style.setProperty("left", "0");
            navBarRef.current.style.setProperty("width", "100%");

            //time for resetting same as duration of transition
            setTimeout(() => setIsResetting(false), 300);
        }
    };

    return (
        <>
            <aside
                ref={sideBarRef}
                className={twMerge(
                    clsx(
                        // SIDE BAR
                        "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]",
                        {
                            "transition-all ease-in-out duration-300":
                                isResetting,
                        },
                        { "w-0": isSmall }
                    )
                )}
            >
                <div
                    onClick={collapse}
                    role="button"
                    className={twMerge(
                        clsx(
                            // COLLAPSE BUTTON
                            "h-6 w-6 text-text rounded-sm hover:bg-secondary-contrast absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
                            { "opacity-100": isSmall }
                        )
                    )}
                >
                    <ChevronsLeft className="h-6 w-6" />
                </div>
                <div className="h-13">
                    <UserItem />
                    <Item
                        label="Search"
                        icon={Search}
                        isSearch
                        onClick={() => {}}
                    />
                    <Item
                        onClick={handleDocument}
                        label="New Page"
                        icon={PlusCircle}
                    />
                </div>
                <DocumentList // DOCUMENT LIST
                    worldId={worldId}
                />
                <div
                    // VERTICAL BAR FOR RESIZING SIDE BAR
                    className="opacity-0 group-hover/sidebar:opacity-100
                transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
                    onMouseDown={handleMouseDown}
                    onClick={resetWidth}
                />
            </aside>
            <div
                ref={navBarRef}
                className={twMerge(
                    clsx(
                        // TOP NAV BAR
                        "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
                        {
                            "transition-all ease-in-out duration-300":
                                isResetting,
                        },
                        { "left-0 w-full": isSmall }
                    )
                )}
            >
                <nav className="bg-transparent px-3 py-2 w-full">
                    {isCollapsed && (
                        <MenuIcon
                            onClick={resetWidth}
                            role="button"
                            className="h-6 w-6 text-text"
                        />
                    )}
                </nav>
            </div>
        </>
    );
};
