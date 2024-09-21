import { QUERY_KEY } from "@/constants/query-key"
import { Api } from "@/interfaces"
import { ReactQuery } from "@/interfaces/react-query"
import { createRoom, getRoom, getRooms, updateRoom } from "@/services"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useGetRooms = (area_id: string, options?: ReactQuery.Options) => {
    return useQuery<Api.RoomApi.GetRoomsResponse>({
        queryKey: [QUERY_KEY.ROOM.GET_ROOMS, { area_id }],
        queryFn: () => getRooms(area_id),
        ...options
    })
}

export const useGetRoom = (room: string, options?: ReactQuery.Options) => {
    return useQuery({
        queryKey: [QUERY_KEY.ROOM.GET_ROOM, { room }],
        queryFn: () => getRoom(room),
        ...options
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