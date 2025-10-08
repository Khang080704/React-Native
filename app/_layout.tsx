import { Tabs } from "expo-router";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { theme } from "../theme";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: theme.colorCerulean }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Shopping list",
                    tabBarIcon: ({ color }) => (
                        <Feather name="list" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="counter"
                
                options={{
                    title: "Counter",
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign
                            name="clock-circle"
                            size={size}
                            color={color}
                        />
                    ),
                    headerShown: false,
                }}
                
            />
            <Tabs.Screen
                name="idea"
                options={{
                    title: "Idea",
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome
                            name="lightbulb-o"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
