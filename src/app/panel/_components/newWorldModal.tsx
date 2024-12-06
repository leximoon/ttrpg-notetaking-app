"use client";
import { Button } from "@/components/UI/button";
import { Dialog } from "@/components/UI/dialog";
import { FormInput } from "@/components/UI/form/formInput";
import React, { useState } from "react";

export default function NewWorldModal() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const openDialog = () => setIsDialogOpen(true);
    const closeDialog = () => setIsDialogOpen(false);
    return (
        <>
            <Button
                intent="secondary"
                variant="dashed"
                fillOut
                label="+ New World"
                onClick={openDialog}
            ></Button>
            <Dialog
                isOpen={isDialogOpen}
                onClose={closeDialog}
                title="WORLD NAME"
            >
                <form>
                    <FormInput
                        placeholder="Enter world name"
                        type="text"
                        name="worldName"
                        isRequired
                    />

                    <div className="pb-3">
                        {" "}
                        <span className=" text-sm text-text/50">
                            You can change this later
                        </span>
                    </div>
                    <Button
                        intent="secondary"
                        label="Create world"
                        fillOut
                        onClick={() => {}}
                    />
                </form>
            </Dialog>
        </>
    );
}