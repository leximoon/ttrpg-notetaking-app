import { Editor } from "./Editor";
import { Toolbar } from "./Toolbar";
import { Document } from "@/types/document";

interface DocumentContentProps {
    document: Document;
    onChange: (content: any, field: string) => void;
}

export const DocumentContent = ({
    document,
    onChange,
}: DocumentContentProps) => (
    <div className="pl-1 pr-10 md:pl-[20rem] xl:pr-24 pb-40 xl:w-5/6 ">
        <Toolbar initialData={document} />
        <Editor
            onChange={(content) => onChange(content, "content")}
            initialContent={document.content}
        />
    </div>
);
