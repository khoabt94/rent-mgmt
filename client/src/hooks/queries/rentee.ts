import { QUERY_KEY } from "@/constants/query-key"
import { createRentee, getRentees, updateRentee } from "@/services/rentee.services"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useGetRentees = () => {
    return useQuery({
        queryKey: [QUERY_KEY.RENTEE.GET_RENTEES],
        queryFn: getRentees,

    })
}


export const useCreateRentee = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: [QUERY_KEY.RENTEE.CREATE_RENTEE],
        mutationFn: createRentee,
        onSuccess: () => Promise.all([
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.RENTEE.GET_RENTEES] }),
        ]),
    })
}

export const useUpdateRentee = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: [QUERY_KEY.RENTEE.UPDATE_RENTEE],
        mutationFn: updateRentee,
        onSuccess: () => Promise.all([
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.RENTEE.GET_RENTEES] }),
        ]),
    })
}