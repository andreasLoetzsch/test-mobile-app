import type { SQLiteDatabase } from "expo-sqlite";


export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;


  const row = await db.getFirstAsync<{ user_version: number }>(
    "PRAGMA user_version"
  );

  let currentVersion = row?.user_version ?? 0;

  console.log("Current DB version:", currentVersion);

  if (currentVersion < 1) {
    console.log("Running migration 0 → 1");
    
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      CREATE TABLE IF NOT EXISTS user_table (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS session (
          user_id INTEGER,
          username TEXT
          );
      CREATE TABLE IF NOT EXISTS todo_table (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        created_by INTEGER NOT NULL,
        text TEXT NOT NULL,
        completed INTEGER NOT NULL DEFAULT 0
        );
    `);

    currentVersion = 1;
  }


  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);

  console.log("DB now at version:", DATABASE_VERSION);
}