//은영
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { fetchCommunityPosts } from "../services/api"; // API 함수 추가

export default function CommunityScreen() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 커뮤니티 게시물 불러오는 함수
  const loadPosts = async () => {
    try {
      setLoading(true); // 로딩 상태 활성화
      const fetchedPosts = await fetchCommunityPosts(); // 백엔드 API 호출
      setPosts(fetchedPosts); // 받아온 데이터 상태 업데이트
    } catch (error) {
      console.error("커뮤니티 게시물 불러오기 실패:", error);
    } finally {
      setLoading(false); // 로딩 완료
    }
  };

  // 컴포넌트가 마운트될 때 게시물 로딩
  useEffect(() => {
    loadPosts();
  }, []);

  // 게시물 렌더링 함수
  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      <Text style={styles.titleText}>제목: {item.title}</Text>
      <Text style={styles.contentText}>내용: {item.content}</Text>
      <Text style={styles.mileageText}>마일리지: {item.post_mileage}</Text>
      <Text style={styles.likesText}>좋아요: {item.likes_count}</Text>
      <Text style={styles.authorText}>작성자: {item.author_nickname}</Text>
      <Text style={styles.subCategoryText}>
        서브 카테고리: {item.sub_category_name}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? ( // 로딩 중일 때 로딩 스피너 표시
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>로딩 중...</Text>
        </View>
      ) : (
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item) => item.post_id.toString()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    padding: 10,
  },
  postContainer: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  contentText: {
    fontSize: 14,
    marginBottom: 5,
  },
  mileageText: {
    fontSize: 12,
    marginBottom: 5,
    color: "#888",
  },
  likesText: {
    fontSize: 12,
    marginBottom: 5,
    color: "#888",
  },
  authorText: {
    fontSize: 12,
    color: "#555",
  },
  subCategoryText: {
    fontSize: 12,
    color: "#555",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
