"use client"; /* eslint-disable @typescript-eslint/no-unused-vars */

import React from "react";
import { ListElement } from "./listElement";
import { World } from "@/types/world";
import { Map } from "lucide-react";
import { getSessionWorlds } from "@/lib/api/worldsApi";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useWorlds } from "@hooks/useWorld";

export default function WorldsList() {
    const { data, isLoading, error } = useQuery<World[]>({
        queryKey: ["worlds"],
        queryFn: getSessionWorlds,
    });
    const router = useRouter();

    const handleClick = (id: string) => {
        router.push(`/${id}/`);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (data?.length === 0) {
        return <div>No worlds found</div>;
    }
    return data?.map(({ name, description, id }) => (
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
