//은영
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  fetchHoneyTipPosts,
  fetchHoneyTipPostsByCategory,
} from "../services/api"; // 꿀팁 게시판 API 함수 가져오기

export default function HoneyTipScreen({ navigation, route }) {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    "전체",
    "교내",
    "서포터즈/동아리",
    "자격증",
    "공모전",
    "채용",
  ];

  // 카테고리에 맞는 게시물을 불러오는 함수
  const loadPosts = async (category) => {
    setLoading(true);
    try {
      // 서버에 맞는 카테고리 ID로 변환
      let categoryId = null;

      // 카테고리별 post_id 매핑
      if (category === "교내") {
        categoryId = 1;
      } else if (category === "서포터즈/동아리") {
        categoryId = 2;
      } else if (category === "자격증") {
        categoryId = 3;
      } else if (category === "공모전") {
        categoryId = 4;
      } else if (category === "채용") {
        categoryId = 5;
      }

      console.log("Requesting posts for categoryId:", categoryId); // 디버깅 로그 추가

      if (category === "전체") {
        const allPosts = await fetchHoneyTipPosts();
        setPosts(allPosts);
      } else {
        const categoryPosts = await fetchHoneyTipPostsByCategory(categoryId);
        setPosts(categoryPosts);
      }
    } catch (error) {
      console.error("Failed to load posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts(selectedCategory); // 컴포넌트 마운트 시 게시물 불러오기
  }, [selectedCategory]);

  // 게시물 클릭 시 상세 보기로 이동
  const handlePostPress = (post) => {
    navigation.navigate("PostDetail", { post });
  };

  // 새 글 작성 후 돌아왔을 때 posts에 추가하기
  useEffect(() => {
    if (route?.params?.newPost) {
      const newPost = route.params.newPost;

      // 선택한 카테고리와 새로 작성한 게시물의 카테고리 비교
      if (
        selectedCategory === "전체" ||
        selectedCategory === newPost.sub_category_name
      ) {
        setPosts((prevPosts) => [newPost, ...prevPosts]);
      }
    }
  }, [route?.params?.newPost, selectedCategory]);

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        item === selectedCategory && styles.selectedCategory,
      ]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text
        style={[
          styles.categoryText,
          item === selectedCategory && styles.selectedCategoryText,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePostPress(item)}>
      <View style={styles.itemContainer}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemCategory}>
            #{item.sub_category_name || "카테고리 없음"}
          </Text>
          <Text style={styles.itemViews}>
            💰 {item.post_mileage != null ? item.post_mileage : "N/A"}
          </Text>
        </View>
        <Text style={styles.itemTitle}>{item.title || "제목 없음"}</Text>
        {/* 내용의 길이를 30자로 제한하고, 더 길 경우 "..."으로 표시 */}
        <Text style={styles.itemContent}>
          {item.content.length > 30
            ? `${item.content.substring(0, 30)}...`
            : item.content}
        </Text>
        <View style={styles.itemFooter}>
          <Text style={styles.itemLikes}>
            ❤️ {item.likes_count != null ? item.likes_count : 0}
          </Text>
          <Text style={styles.itemAuthor}>
            👤 {item.author_nickname || "익명"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>꿀팁 거래</Text>
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        />
      </View>
      {loading ? (
        <Text>로딩 중...</Text>
      ) : (
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item) => item.post_id.toString()}
          showsVerticalScrollIndicator={false}
        />
      )}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate("WritePost")}
      >
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F0F0F0" },
  header: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
  },
  headerTitle: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  categoryList: { paddingHorizontal: 5, justifyContent: "space-evenly" },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: "#EEEEEE",
    borderRadius: 10,
    marginHorizontal: 5,
  },
  selectedCategory: { backgroundColor: "#000000" },
  categoryText: { fontSize: 16, color: "#555555" },
  selectedCategoryText: { color: "#FFFFFF", fontWeight: "bold" },
  itemContainer: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  itemCategory: { fontSize: 12, color: "#007AFF", fontWeight: "bold" },
  itemViews: { fontSize: 12, color: "#AAAAAA" },
  itemTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  itemFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemLikes: { fontSize: 12, color: "#AAAAAA" },
  itemAuthor: { fontSize: 12, color: "#AAAAAA" },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#FFC107",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  floatingButtonText: { color: "#FFFFFF", fontSize: 24, fontWeight: "bold" },
});
