import { Api } from "@/interfaces"
import { createTodo, getTodos } from "@/services"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useGetTodos = (projectId: string, query: Api.TodoApi.GetTodosQuery) => {
    return useQuery({
        queryKey: ['QUERY_KEY.TODO.GET_TODO', query],
        queryFn: ({ pageParam = 1 }) => getTodos(projectId, { ...query, page: pageParam as number }),
    })
}

export const useCreateTodo = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['QUERY_KEY.TODO.CREATE_TODO'],
        mutationFn: createTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['QUERY_KEY.TODO.GET_TODO'] })
        }
    })
}
