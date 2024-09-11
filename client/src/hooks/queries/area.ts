import { QUERY_KEY } from "@/constants/query-key"
import { Api } from "@/interfaces"
import { ReactQuery } from "@/interfaces/react-query"
import { createArea, deleteArea, getArea, getAreas, updateArea } from "@/services"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useGetAreas = (query: any, options: ReactQuery.Options) => {
    return useQuery<Api.AreaApi.GetAreasResponse>({
        queryKey: [QUERY_KEY.AREA.GET_AREAS, query],
        queryFn: getAreas,
        ...options
    })
}

export const useGetArea = ({ area_id }: Api.AreaApi.GetAreaQuery) => {
    return useQuery<Api.AreaApi.GetAreaResponse>({
        queryKey: [QUERY_KEY.AREA.GET_AREA, { area_id }],
        queryFn: () => getArea(area_id)
    })
}


export const useCreateArea = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: [QUERY_KEY.AREA.CREATE_AREA],
        mutationFn: createArea,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.AREA.GET_AREAS] })
        },
    })
}

export const useUpdateArea = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: [QUERY_KEY.AREA.UPDATE_AREA],
        mutationFn: updateArea,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.AREA.GET_AREAS] })
        },
    })
}

export const useDeleteArea = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: [QUERY_KEY.AREA.DELETE_AREA],
        mutationFn: deleteArea,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.AREA.GET_AREAS] })
        },
    })
}
