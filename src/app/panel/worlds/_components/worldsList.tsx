"use client"; /* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useEffect, useState } from "react";
import { ListElement } from "./listElement";
import { Map } from "lucide-react";
import { useRouter } from "next/navigation";
import { useWorlds } from "@hooks/useWorld";

export default function WorldsList() {
    const { useCurrentSessionWorlds, currentSessionWorlds } = useWorlds();
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const handleClick = (id: string) => {
        router.push(`/${id}/`);
    };
    useCurrentSessionWorlds();
    useEffect(() => {
        if (currentSessionWorlds) {
            setIsLoading(false);
        }
    }, [currentSessionWorlds]);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (currentSessionWorlds?.length === 0) {
        return <div>No worlds found</div>;
    }
    return currentSessionWorlds?.map(({ name, description, id }) => (
        <ListElement
            key={id}
            id={id}
            name={name}
            description={description}
            icon={<Map />}
            onClick={() => handleClick(id)}
        />
    ));
}
