import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { queries } from "@/hooks/quries";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { router, Tabs } from "expo-router";
import React, { useEffect } from "react";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { data: session} = queries.useAuthStatus();
  console.log(session, "kolla användare")
  useEffect(() => {
    console.log("hej",session)
    if (session && !session.userId || !session) router.replace("/auth/login");
  }, [session]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person.circle" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
