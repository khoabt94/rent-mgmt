import { QUERY_KEY } from "@/constants/query-key"
import { createCollection } from "@/services"
import { useMutation, useQueryClient } from "@tanstack/react-query"



export const useCreateCollection = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: [QUERY_KEY.ROOM.CREATE_ROOM],
        mutationFn: createCollection,
        onSuccess: () => Promise.all([
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ROOM.GET_ROOMS] }),
        ]),
    })
}

