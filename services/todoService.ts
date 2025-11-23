
import { todoTable, userTable } from "@/schemas/schemas"
import { db } from "@/utils/sqLiteConfig"
import { eq} from "drizzle-orm"

export const getAllTodoItems = async (userId: number) => {
    const todos = await db.select().from(todoTable).where(eq(todoTable.createdBy, userId))
    return todos
}

export const createTodoItem = async (userId: number, todoText: string) => {
    const newTodo = await db.insert(todoTable).values({createdBy: userId, text: todoText}).returning()
    return newTodo
}

export const deleteTodoItem = async(id: number) => {
    await db.delete(todoTable).where(eq(todoTable.id, id))
    return 
}
export const deleteAllTodoItems = async(userId: number) => {
    await db.delete(todoTable).where(eq(todoTable.createdBy, userId))
    return 
}