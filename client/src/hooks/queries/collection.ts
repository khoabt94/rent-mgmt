import { QUERY_KEY } from "@/constants/query-key"
import { createCollection, getLatestCollection } from "@/services"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useGetLatestCollection = (room: string) => {
    return useQuery({
        queryKey: [QUERY_KEY.COLLECTION.GET_LATEST_COLLECTION, { room }],
        queryFn: () => getLatestCollection(room),

    })
}


export const useCreateCollection = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: [QUERY_KEY.ROOM.CREATE_ROOM],
        mutationFn: createCollection,
        onSuccess: () => Promise.all([
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.COLLECTION.GET_COLLECTIONS] }),
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.COLLECTION.GET_LATEST_COLLECTION] }),
        ]),
    })
}

