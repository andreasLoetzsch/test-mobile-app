import { queries } from "@/hooks/quries";
import { router, Stack } from "expo-router";
import { useEffect } from "react";

export default function AuthLayout() {
  const { data: session = null } = queries.useAuthStatus();

  useEffect(() => {
    if (session && session.userId) router.replace("/(tabs)");
  }, [session]);

  return (
    <Stack
      initialRouteName="register"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#0066ffff",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="login" options={{ title: "HEJA" }} />
      <Stack.Screen
        name="register"
        options={{ title: "HEJA 2", headerBackVisible: true, headerStyle: {backgroundColor: "rebeccapurple"} }}
      />
    </Stack>
  );
}
