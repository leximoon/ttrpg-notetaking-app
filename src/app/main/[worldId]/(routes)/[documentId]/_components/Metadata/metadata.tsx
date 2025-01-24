import { Button } from "@/components/UI/button";
import React from "react";
import { EditableField } from "./_components/editableField";

export const Metadata = () => {
    return (
        <div className="flex flex-col">
            <span className="mb-4 font-bold text-2xl">METADATA</span>

            <div className="grid mb-5">
                <EditableField variant="title" initialData="Some text" />
                <EditableField initialData="Some text" />
            </div>
            <div className="grid mb-5">
                <EditableField variant="title" initialData="Some text" />
                <EditableField initialData="Some text" />
            </div>
            {/*<Button size="s" label="Add metadata" /> */}
        </div>
    );
};
