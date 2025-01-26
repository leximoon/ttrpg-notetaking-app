"use client";

import { forwardRef, useImperativeHandle, useState } from "react";
import { Plus } from "lucide-react";

import { Input } from "@/components/UI/input";
import { Dialog } from "@/components/UI/dialog";
import { Button } from "@/components/UI/button";

interface AddTagDialogProps {
    onAddTag: (tag: string) => void;
}

export interface AddTagDialogRef {
    openDialog: () => void;
}

export const AddTagDialog = forwardRef<AddTagDialogRef, AddTagDialogProps>(
    ({ onAddTag }, ref) => {
        const [newTag, setNewTag] = useState("");
        const [open, setOpen] = useState(false);

        const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
            e.preventDefault();
            handleClose();
        };

        const handleClose = () => {
            if (newTag.trim()) {
                onAddTag(newTag.trim());
                setNewTag("");
            }
            setOpen(false);
        };

        useImperativeHandle(ref, () => ({
            openDialog: () => setOpen(true),
        }));

        return (
            <Dialog isOpen={open} onClose={handleClose} title="Add new tag">
                <div className="w-full">
                    <div>
                        <div>Enter the new tag name</div>
                    </div>
                    <form onSubmit={handleSubmit} className="w-full">
                        <div className="flex gap-4 py-4 ">
                            <Input
                                id="tag"
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                className="col-span-3"
                                name="addTag"
                            />
                            <Button label="Add" intent="primary" type="submit">
                                Add Tag
                            </Button>
                        </div>
                    </form>
                </div>
            </Dialog>
        );
    }
);
