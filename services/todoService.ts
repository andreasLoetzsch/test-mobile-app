
import { todoTable } from "@/schemas/schemas"
import { db } from "@/utils/sqLiteConfig"
import { sql } from "drizzle-orm"

export const getAllTodoItems = async (userId: number) => {
    const todos = await db.select().from(todoTable).where(sql`${todoTable.createdBy} == ${userId}`)
    return todos
}

export const createTodoItem = async (userId: number, todoText: string) => {
    const newTodo = await db.insert(todoTable).values({createdBy: userId, text: todoText}).returning()
    return newTodo
}

export const deleteTodoItem = () => {
    // delete 1 
}
export const deleteAllTodoItems = async() => {
    // delete all
    
}