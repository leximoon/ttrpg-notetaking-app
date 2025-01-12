"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/UI/button";
import { useDocument } from "@/hooks/useDocument";

const DocumentPage = () => {
    
    const worldId = usePathname().split("/")[1];
    const { addDocument } = useDocument();
        const handleDocument = () => {
            addDocument.mutate(
                {title:"", worldId}
            );
        };
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