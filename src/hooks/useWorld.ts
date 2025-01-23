import { World } from "@/types/world";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useFetch } from "./useFetch";

export function useWorlds(worldId?: string) {
    const queryClient = useQueryClient();
    const { error, fetch } = useFetch();
    const [currentWorldId, setCurrentWorldId] = useState<string>(worldId ?? "");
    const [currentSessionWorlds, setCurrentSessionWorlds] = useState<World[]>();

    //Function to add worlds
    const addWorld = useMutation({
        mutationFn: async (world: any) => {
            const { data } = await fetch(`/world`, {
                method: "POST",
                body: world,
            });
            return data;
        },
        onSuccess: ({ id }) => {
            queryClient.invalidateQueries({ queryKey: ["worlds"] });
        },
    });
    const deleteWorld = useMutation({
        mutationFn: async ({ worldId }: { worldId: string }) => {
            const { data } = await fetch(`/world/delete`, {
                method: "DELETE",
                body: { worldId: worldId },
            });
            return data;
        },
        onSuccess: ({ id }) => {
            queryClient.invalidateQueries({ queryKey: ["worlds"] });
        },
        onError: (e) => {
            console.log("Error: ", e?.message);
        },
    });

    //function to
    const useCurrentWorld = () =>
        useQuery<World[] | null, Error>({
            queryKey: ["world", currentWorldId],
            queryFn: async () =>
                (await fetch(`/world/${currentWorldId}`, { method: "GET" }))
                    .data as World[],
        });

    const useCurrentSessionWorlds = () =>
        useQuery<World | null, Error>({
            queryKey: ["worlds"],
            queryFn: async () => {
                const { data } = await fetch(`/world/me`, { method: "GET" });
                if (data) setCurrentSessionWorlds(data);
                console.log("worlds fetched ", data);
                return data;
            },
        });

    return {
        addWorld,
        deleteWorld,
        useCurrentWorld,
        useCurrentSessionWorlds,
        currentSessionWorlds,
    };
}
