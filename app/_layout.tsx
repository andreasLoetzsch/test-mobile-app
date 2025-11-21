import { useColorScheme } from "@/hooks/use-color-scheme";
import { persister, queryClient } from "@/utils/queryClient";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import { migrateDbIfNeeded } from "@/utils/migrations";
import { databaseName } from "@/utils/sqLiteConfig";


export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <SQLiteProvider databaseName={databaseName} onInit={migrateDbIfNeeded} useSuspense={false} >
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack screenOptions={{ headerShown: false }} />
          <StatusBar style="auto" />
        </ThemeProvider>
      </SQLiteProvider>
    </PersistQueryClientProvider>
  );
}
