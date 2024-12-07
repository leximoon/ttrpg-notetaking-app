"use client";

import Image from "next/image";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/UI/button";
import { createDocument, loadDocuments } from "@/lib/api/documentsApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDocument } from "../../../../hooks/useDocument";

const DocumentPage = () => {
    const {execute} = useDocument({mutationFn: createDocument});
    const handleDocument = () => {
        execute("ffff")
    }
    return ( 
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            
            {/* IMAGE FOR EMPTY PAGE */}
            <Image
                src="../dragons.svg"
                height="300"
                width="300"
                alt="Empty"
            />
            
            {/* ADD PAGE BUTTON*/}
            <Button 
            intent="secondary" 
            size="m" 
            variant="fill" 
            icon={ <PlusIcon />} 
            label="New Page" 
            onClick= { handleDocument }
            />
        </div>
     );
}
 
export default DocumentPage;