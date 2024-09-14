import { QUERY_KEY } from "@/constants/query-key"
import { createRoom, getRooms, updateRoom } from "@/services"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useGetRooms = (area_id: string) => {
    return useQuery({
        queryKey: [QUERY_KEY.ROOM.GET_ROOMS, { area_id }],
        queryFn: () => getRooms(area_id),

    })
}


export const useCreateRoom = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: [QUERY_KEY.ROOM.CREATE_ROOM],
        mutationFn: createRoom,
        onSuccess: () => Promise.all([
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ROOM.GET_ROOMS] }),
        ]),
    })
}

export const useUpdateRoom = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: [QUERY_KEY.ROOM.UPDATE_ROOM],
        mutationFn: updateRoom,
        onSuccess: () => Promise.all([
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ROOM.GET_ROOMS] }),
        ]),
    })
}