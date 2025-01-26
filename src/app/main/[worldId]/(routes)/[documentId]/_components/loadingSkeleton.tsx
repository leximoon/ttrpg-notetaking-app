import React from "react";
import { Toolbar } from "./Toolbar";
import { Skeleton } from "@nextui-org/skeleton";

export const LoadingSkeleton = () => {
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
};
