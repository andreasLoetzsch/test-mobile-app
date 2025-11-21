import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as SQLite from 'expo-sqlite';
export const  databaseName = 'mobile_app_v4.db';
const expo = SQLite.openDatabaseSync(databaseName);
export const db = drizzle(expo);

