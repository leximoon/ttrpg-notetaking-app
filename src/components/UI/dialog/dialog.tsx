/* eslint-disable react/display-name */
"use client";
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
}

const Dialog = ({ children, isOpen, onClose, title }: DialogProps) => {
    const dialogRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    useEffect(() => {
        if (isOpen && dialogRef.current) {
            dialogRef.current.focus();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-[1000]">
            <div className="min-h-screen text-center flex w-screen p-0 justify-center items-center">
                {/* Dialog Background */}
                <div className="fixed inset-0" onClick={onClose}>
                    <div className="absolute inset-0 bg-background opacity-50 "></div>
                </div>

                <div
                    ref={dialogRef}
                    className="flex transform rounded-2xl bg-background text-left shadow-xl min-w-72"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="dialog-title"
                    tabIndex={-1}
                >
                    <div className="p-6 w-full">
                        {title && (
                            <h3 className="text-md font-medium text-text/60">
                                {title}
                            </h3>
                        )}
                        <div className="mt-2">{children}</div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export { Dialog };
