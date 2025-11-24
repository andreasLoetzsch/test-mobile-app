import { userTable, session, todoTable } from "@/schemas/schemas";
import { db } from "@/utils/sqLiteConfig";
import { persister, queryClient } from "@/utils/queryClient";
import { clearAuth } from "@/utils/auth";
import { eq, sql } from "drizzle-orm";

export const registerUser = async (username: string, password: string) => {
  const [createdUser] = await db.insert(userTable).values({username, password}).returning()
  const newUser = await db.insert(session).values({userId: createdUser.id, username: createdUser.username}).returning()
  return newUser
};

export const logInUser = async (username: string, password: string,) => {
  const users = await db.select().from(userTable).where(sql`${userTable.username} == ${username}`)
  const user = users[0]
  if(!user){
    throw new Error("User not found")
  }
  if(user.password !== password){
    throw new Error("Invalid credentials")
  }
  await db.insert(session).values({userId: user.id, username: user.username })
  return user
}

export const isUserLoggedIn = async () => {
  const isLoggedIn = await db.select().from(session).limit(1)
  return isLoggedIn[0] ?? null;
};

export const deleteUser = async (userId: number) => {
  clearAuth()
  await db.delete(todoTable).where(eq(todoTable.createdBy, userId));
  await db.delete(userTable).where(eq(userTable.id, userId));
  return;
}