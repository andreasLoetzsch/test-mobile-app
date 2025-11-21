import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllTodoItems } from "@/services/todoService";

const useGetTodos = (userId: number) => {
    return useQuery({
        queryKey: ['todo', userId ?? null],
        queryFn: async () => {
            if (typeof userId !== "number") return Promise.resolve([]);
            return await getAllTodoItems(userId)
        },
        enabled: typeof userId === "number",
    })
}


export const todoQueries = {
    useGetTodos,
}