"use client";
import { useWorlds } from "@hooks/useWorld";
import React from "react";

interface WorldPageProps {
    params: {
        worldId: string;
    };
}

export default function WorldPage({ params }: WorldPageProps) {
    const { useCurrentWorld } = useWorlds(params.worldId);

    const { data } = useCurrentWorld();

    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <h3>Welcome to the world:</h3>
            <h1 className="text-primary text-6xl">{data?.name}</h1>
            <p className="border p-5 rounded-lg">{data?.description}</p>
        </div>
    );
}
