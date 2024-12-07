import { createWorld } from "@/lib/api/worldsApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useWorldsMutations() {
    const queryClient = useQueryClient();

    const addWorld = useMutation({
        mutationFn: createWorld,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["worlds"] });
        },
    });

    return {
        addWorld,
    };
}
