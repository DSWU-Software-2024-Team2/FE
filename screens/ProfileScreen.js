// screens/ProfileScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function ProfileScreen({ navigation }) {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const profile = {
      status: "VVIP",
      name: "화학 사랑해요",
      major: "화학전공 | 20학번",
      mileage: 10000,
    };
    setUserProfile(profile);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>내 정보</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Information")}>
          <Image
            source={require("../assets/question.png")}
            style={styles.questionIcon}
          />
        </TouchableOpacity>
      </View>

      {/* 프로필 카드 */}
      <View style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <View style={styles.vipContainer}>
            <Image
              source={require("../assets/bee.png")}
              style={styles.beeIcon}
            />
            <Text style={styles.vipText}>VVIP</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.editButtonText}>✏️ 프로필 수정하기</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.profileInfoContainer}>
          <Image
            source={require("../assets/profile_ex.jpeg")}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{userProfile?.name}</Text>
            <Text style={styles.profileMajor}>{userProfile?.major}</Text>
            <View style={styles.mileageContainer}>
              <Image
                source={require("../assets/honey_mileage.png")}
                style={styles.mileageIcon}
              />
              <Text style={styles.mileage}>{userProfile?.mileage}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 마일리지 내역, 내가 쓴 글, 댓글 단 글 */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.sectionItem}>
          <Image
            source={require("../assets/mileage.png")}
            style={styles.sectionIcon}
          />
          <Text style={styles.sectionText}>마일리지 내역</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sectionItem}>
          <Image
            source={require("../assets/check.png")}
            style={styles.sectionIcon}
          />
          <Text style={styles.sectionText}>내가 쓴 글</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sectionItem}>
          <Image
            source={require("../assets/comment.png")}
            style={styles.sectionIcon}
          />
          <Text style={styles.sectionText}>댓글 단 글</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  questionIcon: {
    width: 30,
    height: 30,
    marginLeft: 5,
  },
  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 20,
    marginBottom: 20,
  },
  profileHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  vipContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  beeIcon: {
    width: 18,
    height: 18,
  },
  vipText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFD700",
  },
  editButtonText: {
    fontSize: 12,
    color: "#888",
  },
  profileInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profileMajor: {
    fontSize: 14,
    color: "#555",
  },
  mileageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  mileageIcon: {
    width: 18,
    height: 18,
    marginRight: 5,
  },
  mileage: {
    fontSize: 14,
    color: "#888",
  },
  section: {
    marginTop: 30,
  },
  sectionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  sectionIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  sectionText: {
    fontSize: 16,
    flex: 1,
  },
});
