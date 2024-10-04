// Navigation/MainTabNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import HoneyTipScreen from "../screens/HoneyTipScreen";
import WritePostScreen from "../screens/WritePostScreen";
import SearchResultScreen from "../screens/SearchResultScreen";
import SearchScreen from "../screens/SearchScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HoneyTipStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="HoneyTip" component={HoneyTipScreen} />
      <Stack.Screen
        name="WritePost"
        component={WritePostScreen}
        options={{ title: "게시물 작성" }}
      />
    </Stack.Navigator>
  );
}

function SearchStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="SearchResult" component={SearchResultScreen} />
    </Stack.Navigator>
  );
}

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "Chat") {
            iconName = focused ? "chatbubble" : "chatbubble-outline";
          } else if (route.name === "Cart") {
            iconName = focused ? "cart" : "cart-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { height: 60, paddingBottom: 10, paddingTop: 5 },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HoneyTipStack}
        options={{ tabBarLabel: "홈" }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStack}
        options={{ tabBarLabel: "검색" }}
      />

      <Tab.Screen
        name="Cart"
        component={HomeScreen}
        options={{ tabBarLabel: "장바구니" }}
      />
      <Tab.Screen
        name="Profile"
        component={HomeScreen}
        options={{ tabBarLabel: "내 정보" }}
      />
    </Tab.Navigator>
  );
}
