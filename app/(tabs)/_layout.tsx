import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab"; // tu HapticTab actual
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#007bff",
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: "white",
          borderTopColor: "#e0e0e0",
          padding: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
       <Tabs.Screen
        name="modules"
        options={{
          title: "Juegos",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="play" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="streak"
        options={{
          title: "Racha",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="calendar.badge.clock" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Configuración",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="gear.badge" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="logout"
        options={{
          title: "Cerrar sesión",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="arrow.backward.circle.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}