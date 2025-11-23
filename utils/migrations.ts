import type { SQLiteDatabase } from "expo-sqlite";


export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;

  const row = await db.getFirstAsync<{ user_version: number }>("PRAGMA user_version");
  let currentVersion = row?.user_version ?? 0;
  console.log("Current DB version:", currentVersion);

  const todoTableExists = (await db.getAllAsync<{ name: string }>(
    "SELECT name FROM sqlite_master WHERE type='table' AND name='todo_table'"
  )).length > 0;

  if (!todoTableExists) {
    console.log("Creating missing todo_table");
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS todo_table (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        created_by INTEGER NOT NULL,
        text TEXT NOT NULL,
        completed INTEGER NOT NULL DEFAULT 0
      );
    `);
  }


  const userTableExists = (await db.getAllAsync<{ name: string }>(
    "SELECT name FROM sqlite_master WHERE type='table' AND name='user_table'"
  )).length > 0;

  if (!userTableExists) {
    console.log("Creating missing user_table");
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS user_table (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `);
  }

  const sessionTableExists = (await db.getAllAsync<{ name: string }>(
    "SELECT name FROM sqlite_master WHERE type='table' AND name='session'"
  )).length > 0;

  if (!sessionTableExists) {
    console.log("Creating missing session table");
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS session (
        user_id INTEGER
      );
    `);
  }

  const sessionCols = await db.getAllAsync<{ name: string }>("PRAGMA table_info('session')");
  const hasUsername = sessionCols.some((c) => c.name === "username");
  if (!hasUsername) {
    console.log("Adding missing column 'username' to session");
    await db.execAsync(`ALTER TABLE session ADD COLUMN username TEXT;`);
  }

  await db.execAsync("PRAGMA journal_mode = 'wal';");

  if (currentVersion < DATABASE_VERSION) {
    await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
    console.log("DB updated to version:", DATABASE_VERSION);
  } else {
    console.log("DB version unchanged:", currentVersion);
  }
}