//은영
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker"; // 사진 첨부를 위한 라이브러리
import * as DocumentPicker from "expo-document-picker"; // 파일 첨부를 위한 라이브러리

export default function WritePostScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState("카테고리");
  const [showCategoryOptions, setShowCategoryOptions] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); // 본문 입력 필드 추가

  const categories = ["교내", "서포터즈/동아리", "자격증", "공모전", "채용"];

  const toggleCategoryOptions = () => {
    setShowCategoryOptions(!showCategoryOptions);
  };

  const selectCategory = (category) => {
    setSelectedCategory(category);
    setShowCategoryOptions(false);
  };

  const submitPost = () => {
    alert("게시물이 등록되었습니다.");
    navigation.goBack();
  };

  // 사진 선택 함수
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result.uri);
      alert("사진이 선택되었습니다.");
    }
  };

  // 파일 선택 함수
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.type === "success") {
      console.log(result.uri);
      alert("파일이 선택되었습니다.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.categoryButton}
          onPress={toggleCategoryOptions}
        >
          <Text style={styles.categoryText}>{selectedCategory}</Text>
          <Ionicons
            name={showCategoryOptions ? "chevron-up" : "chevron-down"}
            size={20}
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={submitPost}>
          <Text style={styles.submitButtonText}>등록</Text>
        </TouchableOpacity>
      </View>

      {showCategoryOptions && (
        <View style={styles.categoryOptions}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={styles.categoryOption}
              onPress={() => selectCategory(category)}
            >
              <Text>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* 제목 입력 */}
      <TextInput
        style={styles.titleInput}
        placeholder="제목을 입력해주세요."
        value={title}
        onChangeText={setTitle}
      />

      {/* 본문 입력 추가 */}
      <TextInput
        style={styles.contentInput}
        placeholder="본문을 입력해주세요."
        value={content}
        onChangeText={setContent}
        multiline={true} // 여러 줄 입력 가능
      />

      {/* 하단 아이콘 */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={pickImage}>
          <Ionicons name="image-outline" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={pickDocument}>
          <Ionicons
            name="document-outline"
            size={30}
            color="black"
            style={{ marginLeft: 20 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
    paddingBottom: 10,
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 10,
  },
  categoryText: {
    fontSize: 16,
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: "#FFA500",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  categoryOptions: {
    marginTop: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
  },
  categoryOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
  },
  titleInput: {
    backgroundColor: "#FFFFFF",
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#DDDDDD",
  },
  contentInput: {
    backgroundColor: "#FFFFFF",
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    minHeight: 100, // 최소 높이 설정 (본문을 위한 입력칸)
    textAlignVertical: "top", // 텍스트가 위에서부터 입력되도록 설정
  },
  footer: {
    position: "absolute",
    bottom: 20, // 화면 하단에 고정
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DDDDDD",
  },
});
