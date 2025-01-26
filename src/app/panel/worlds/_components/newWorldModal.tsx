"use client";
import { Button } from "@/components/UI/button";
import { Dialog } from "@/components/UI/dialog";
import React, { useState } from "react";
import NewWorldForm from "./newWorldForm";

export default function NewWorldModal() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const openDialog = () => setIsDialogOpen(true);
    const closeDialog = () => setIsDialogOpen(false);
    return (
        <>
            <Button
                className="w-full h-full table-cell text-xl"
                intent="secondary"
                variant="dashed"
                label="+ New World"
                onClick={openDialog}
            ></Button>
            <Dialog
                isOpen={isDialogOpen}
                onClose={closeDialog}
                title="WORLD NAME"
            >
                <NewWorldForm closeForm={closeDialog} />
            </Dialog>
        </>
    );
}
