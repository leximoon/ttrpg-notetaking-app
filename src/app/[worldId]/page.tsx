"use client";

import Image from "next/image";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/UI/button";
import { createDocument } from "@/lib/api/documentsApi";
import { useDocument } from "@/hooks/useDocument";

const DocumentPage = () => {
    const {execute} = useDocument({mutationFn: createDocument});//TODO: Fix hook for more than 1 parameter
    const handleDocument = () => {
        // TODO: add title input
        execute("Untitled")
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