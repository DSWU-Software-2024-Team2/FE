import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import SearchResultScreen from "../screens/SearchResultScreen";
import HoneyTipScreen from "../screens/HoneyTipScreen";
import WritePostScreen from "../screens/WritePostScreen";

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="HoneyTip" component={HoneyTipScreen} />
      <Stack.Screen
        name="WritePost"
        component={WritePostScreen}
        options={{ title: "게시물 작성" }}
      />
      <Stack.Screen name="SearchResult" component={SearchResultScreen} />
    </Stack.Navigator>
  );
}
