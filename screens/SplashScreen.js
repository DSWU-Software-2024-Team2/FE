// screens/SplashScreen.js
import React, { useEffect } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    // 2초 후에 Login Main Screen으로 이동
    const timer = setTimeout(() => {
      navigation.navigate("LoginMain");
    }, 2000);
    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <Text style={styles.honeyText}>HoneyWeb</Text> {/* 금색 텍스트 추가 */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  logo: {
    width: 200,
    height: 200,
  },
  honeyText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#D4AF37", // 금색 텍스트
    marginTop: 20, // 로고와의 간격
  },
});
