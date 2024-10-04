// 아이콘은 피그마에 나와있는 걸로 변경 예정

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import BuyScreen from "../screens/BuyScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import SearchResultScreen from "../screens/SearchResultScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          // 각 탭에 맞는 아이콘 설정
          if (route.name === "홈") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "검색") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "장바구니") {
            iconName = focused ? "cart" : "cart-outline";
          } else if (route.name === "내 정보") {
            iconName = focused ? "person" : "person-outline";
          }

          // 아이콘을 반환합니다.
          return <Ionicons name={iconName} size={24} color={color} />;
        },
        tabBarActiveTintColor: "#000000", // 활성화된 탭의 색상
        tabBarInactiveTintColor: "#d9d9d9", // 비활성화된 탭의 색상
        tabBarStyle: {
          backgroundColor: "#fff", // 탭 바의 배경색
          paddingTop: 10,
          paddingBottom: 5,
          height: 60,
        },
      })}
    >
      <Tab.Screen name="홈" component={HomeScreen} />
      <Tab.Screen name="검색" component={SearchScreen} />
      <Tab.Screen name="장바구니" component={BuyScreen} />
      <Tab.Screen name="내 정보" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
