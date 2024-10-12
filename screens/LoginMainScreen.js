// screens/LoginMainScreen.js
import React from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function LoginMainScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />{" "}
      {/* 로고 추가 */}
      <Text style={styles.honeyText}>HoneyWeb</Text> {/* 금색 텍스트 추가 */}
      <Text style={styles.title}>덕우들과 함께 성장하는 정보의 시작!</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="가입하기"
          onPress={() => navigation.navigate("Register")}
        />
        <Button title="로그인" onPress={() => navigation.navigate("Login")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  honeyText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#D4AF37", // 금색 텍스트
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 40,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
});
