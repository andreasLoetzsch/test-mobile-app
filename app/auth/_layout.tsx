import { queries } from "@/hooks/quries";
import { router, Stack } from "expo-router";
import { useEffect } from "react";

export default function AuthLayout() {
  const { data: isLoggedIn = null } = queries.useAuthStatus();

  useEffect(() => {
    console.log({ isLoggedIn });
    if (isLoggedIn === null) return;
    if (isLoggedIn) router.replace("/(tabs)");
  }, [isLoggedIn]);

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
