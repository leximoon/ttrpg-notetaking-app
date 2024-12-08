import { createWorld, getWorldById } from "@/lib/api/worldsApi";
import { World } from "@/types/world";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function useWorlds(worldId?: string) {
    const queryClient = useQueryClient();
    const [currentWorldId, setCurrentWorld] = useState<string>(worldId ?? "");

    const addWorld = useMutation({
        mutationFn: createWorld,
        onSuccess: ({ id }) => {
            setCurrentWorld(id);
            queryClient.invalidateQueries({ queryKey: ["worlds"] });
        },
    });

    const useCurrentWorld = () =>
        useQuery<World | null, Error>({
            queryKey: ["world", currentWorldId],
            queryFn: () => getWorldById(currentWorldId),
        });

    return {
        addWorld,
        useCurrentWorld,
    };
}
