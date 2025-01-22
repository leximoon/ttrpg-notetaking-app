"use client";

import { usePathname } from "next/navigation";

const DocumentPage = () => {
    const pathname = usePathname();
    const documentId = pathname.split("/")[3]; //get first element from url which is worldId

    return <div>Holi {documentId}</div>;
};

export default DocumentPage;
