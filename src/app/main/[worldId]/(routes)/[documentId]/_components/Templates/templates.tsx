"use client";
import { Button } from "@/components/UI/button";
import React, { useEffect, useState } from "react";
import templatesData from "@/data/templates.json";

export interface Template {
    name: string;
    content: {};
}

interface TemplatesProps {
    onLoadTemplate: (name: string) => void;
}

export const Templates = ({ onLoadTemplate }: TemplatesProps) => {
    const [templates, setTemplates] = useState<Template[]>([]);

    useEffect(() => {
        const filteredTemplates = templatesData.templates.filter(
            (template) => template.name !== "blank"
        );
        setTemplates(filteredTemplates);
    }, []);

    return (
        <div className="flex flex-col justify-center items-center h-full pb-24">
            <div className="p-5 rounded-md flex flex-row gap-5 max-w-3xl flex-wrap">
                {templates.map((template) => (
                    <Button
                        key={template.name}
                        className="w-[30%] flex-grow table-cell text-lg !py-4 !px-20"
                        intent="secondary"
                        variant="dashed"
                        label={template.name}
                        onClick={() => onLoadTemplate(template.name)}
                    ></Button>
                ))}
            </div>

            <div className="p-5 rounded-md flex flex-row gap-5 max-w-3xl flex-wrap">
                <Button
                    className="w-[30%] flex-grow table-cell text-lg !py-4 !px-20"
                    intent="secondary"
                    variant="dashed"
                    label="Blank"
                    onClick={() => onLoadTemplate("blank")}
                ></Button>
            </div>
        </div>
    );
};
