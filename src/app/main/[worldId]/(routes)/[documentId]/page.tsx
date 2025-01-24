"use client";
import { use } from "react";
import { Spinner } from "@/components/UI/spinner";
import { useDocument } from "@/hooks/useDocument";

import { Toolbar } from "./_components/Toolbar";
import { Skeleton } from "@nextui-org/skeleton";
import { Editor } from "./_components/Editor";
import { Button } from "@/components/UI/button";
import Template from "@/data/templates.json";
import { TagBox } from "@/components/tagBox";
import { Metadata } from "./_components/Metadata";

interface DocumentPageProps {
    params: Promise<{ documentId: string }>;
}

const DocumentPage = ({ params }: DocumentPageProps) => {
    const { documentId } = use(params);
    const { editDocument, getCurrentDocument } = useDocument();
    const { data: document, isLoading, error } = getCurrentDocument(documentId);
    const { mutate } = editDocument;

    const onChange = (content: string) => {
        mutate({ documentId: documentId, field: "content", content: content });
    };
    if (isLoading) {
        return (
            <div>
                <Toolbar.Skeleton />
                <div className="max-w-5xl mt-10 mx-auto">
                    <div className="space-y-4 pl-8 pt-4">
                        <Skeleton className="h-14 bg-background-muted/20 rounded-md w-[50%]" />
                        <Skeleton className="h-4 bg-background-muted/20 rounded-md w-[80%]" />
                        <Skeleton className="h-4 bg-background-muted/20 rounded-md w-[40%]" />
                        <Skeleton className="h-4 bg-background-muted/20 rounded-md w-[60%]" />
                    </div>
                </div>
            </div>
        );
    }
    if (error) {
        console.error("Error fetching document:", error);
        return <div>Error loading document. Please try again.</div>;
    }
    if (!document) {
        return <div>Document not found!</div>;
    }

    function loadTemplate(name: string) {
        const temp = Template.templates.find((t) => t.name === name);
        const content = temp ? temp.content : null;
        mutate({
            documentId: documentId,
            field: "content",
            content: JSON.stringify(content),
        });
    }

    const tags1 = ["White dragon", "Dungeon", "Long sword", "Magic"];

    const tags2 = [
        "White dragon",
        "Dungeon",
        "Long sword",
        "Magic",
        "Elf",
        "Orc",
        "Wizard tower",
        "Tavern",
    ];

    const tags3 = [
        "White dragon",
        "Dungeon",
        "Long sword",
        "Magic",
        "Elf",
        "Orc",
        "Wizard tower",
        "Tavern",
        "Quest",
        "Paladin",
        "Goblin",
        "Shadow ranger",
    ];

    const tags4 = [
        "White dragon",
        "Dungeon",
        "Long sword",
        "Magic",
        "Elf",
        "Orc",
        "Wizard tower",
        "Tavern",
        "Quest",
        "Paladin",
        "Goblin",
        "Shadow ranger",
        "Bard",
        "Necromancer",
        "Hidden treasure",
        "Trap",
    ];

    return (
        <div className="relative top-[50px] h-[calc(100%-50px)]">
            {document.content ? (
                <div className="pl-56  flex flex-row justify-between">
                    <div className="pb-40">
                        <Toolbar initialData={document} />
                        <Editor
                            onChange={onChange}
                            initialContent={document.content}
                        />
                    </div>
                    <div className="bg-background-muted/10 w-1/6 h-dvh shadow-md shadow-shadow p-4 flex-wrap">
                        <TagBox title="TAGS" tags={tags1} />
                        <Metadata />
                    </div>
                </div>
            ) : (
                <div className="flex h-screen justify-center items-center">
                    <div className="p-5 bg-background-muted/10 rounded-md flex flex-row gap-5 max-w-3xl flex-wrap">
                        <Button
                            className="w-[30%] flex-grow table-cell text-lg !py-4 !px-20"
                            intent="secondary"
                            variant="dashed"
                            label="Blank"
                            onClick={() => loadTemplate("blank")}
                        ></Button>
                        <Button
                            className="w-[30%] flex-grow table-cell text-lg !py-4 !px-20"
                            intent="secondary"
                            variant="dashed"
                            label="Template"
                        ></Button>
                        <Button
                            className="w-[30%] flex-grow table-cell text-lg !py-4 !px-20"
                            intent="secondary"
                            variant="dashed"
                            label="Template"
                        ></Button>
                        <Button
                            className="w-[30%] flex-grow table-cell text-lg !py-4 !px-20"
                            intent="secondary"
                            variant="dashed"
                            label="Template"
                        ></Button>
                        <Button
                            className="w-[30%] flex-grow table-cell text-lg !py-4 !px-20"
                            intent="secondary"
                            variant="dashed"
                            label="Template"
                        ></Button>
                        <Button
                            className="w-[30%] flex-grow table-cell text-lg !py-4 !px-20"
                            intent="secondary"
                            variant="dashed"
                            label="Template"
                        ></Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DocumentPage;
