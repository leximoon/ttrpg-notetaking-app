import { MutationFunction, useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";

interface UseDocumentProps<T, Y>{
    mutationFn: MutationFunction<T, Y>;
}
export function useDocument<T, Y>({mutationFn}: UseDocumentProps<T, Y>) {
    const queryClient = useQueryClient();
    const documentMutation: UseMutationResult<T, unknown, Y> = useMutation({mutationFn, onSuccess:() => {
        queryClient.invalidateQueries({queryKey:["documents"]})
    }})
    const execute = (arg: Y) => {
        documentMutation.mutate(arg)  
    }
    return {execute}
}