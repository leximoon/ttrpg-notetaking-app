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
    <div className="pb-40 w-4/6 mx-56">
        <Toolbar initialData={document} />
        <Editor
            onChange={(content) => onChange(content, "content")}
            initialContent={document.content}
        />
    </div>
);
