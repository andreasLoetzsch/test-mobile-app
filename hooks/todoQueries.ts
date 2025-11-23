import { useMutation, useQuery } from "@tanstack/react-query";
import { createTodoItem, deleteAllTodoItems, deleteTodoItem, getAllTodoItems } from "@/services/todoService";
import { queryClient } from "@/utils/queryClient";

const useGetTodos = (userId?: number) => {
    return useQuery({
        queryKey: ['todo', userId ?? null],
        queryFn: async () => {
            if (typeof userId !== "number") return Promise.resolve([]);
           const todos =  await getAllTodoItems(userId)
            return todos
        },
        enabled: typeof userId === "number",
        retry: false,
    })
}
const useCreateTodo = () => {
    return useMutation({
        mutationFn: async ({todoText, userId}: {todoText: string, userId: number}) => {
            return await createTodoItem(userId, todoText)
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['todo', variables.userId] })
        },
    })
}

const useDeleteTodo = (userId: number) => {
    return useMutation({
        mutationFn: async (id: number) => {
            return await deleteTodoItem(id)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["todo", userId]})
        }
    })
}
const useDeleteAllTodo = () => {
    return useMutation({
        mutationFn: async (userId: number) => {
            return await deleteAllTodoItems(userId)
        },
        onSuccess: (_data, userId) => {
            queryClient.invalidateQueries({queryKey: ["todo", userId]})
        }        
    })
}
export const todoQueries = {
    useGetTodos,
    useCreateTodo,
    useDeleteTodo,
    useDeleteAllTodo, 
}