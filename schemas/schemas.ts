
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
export const userTable = sqliteTable("user_table", {
  id: integer().primaryKey({ autoIncrement: true }),
  username: text().notNull(),
  password: text().notNull(),
});

export const session = sqliteTable("session", {
  userId: integer("user_id"),
  username: text("username"),
});

export const todoTable = sqliteTable("todo_table", {
  id: integer().primaryKey({ autoIncrement: true }),
  createdBy: integer("created_by").notNull(),
  text: text().notNull(),
  completed: integer().notNull().default(0),
});