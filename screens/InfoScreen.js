//은영
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

export default function InfoScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState("전체");

  // 카테고리 목록
  const categories = [
    "전체",
    "교내",
    "서포터즈/동아리",
    "자격증",
    "공모전",
    "채용",
  ];

  // 데이터 목록
  const data = {
    전체: [
      {
        id: "1",
        category: "교내",
        title: "2024-2 교내 챌린지 신청",
        views: 500,
        comments: 2,
      },
      {
        id: "2",
        category: "서포터즈/동아리",
        title: "빅데이터 분석 학회 합격자 면접 후기",
        views: 150,
        comments: 2,
      },
      {
        id: "3",
        category: "자격증",
        title: "한 달 만에 토익 900점 만든 공부법",
        views: 170,
        comments: 6,
      },
      {
        id: "4",
        category: "공모전",
        title: "동서발전 데이터 분석 공모전 대상의 프로젝트 후기",
        views: 180,
        comments: 2,
      },
      {
        id: "5",
        category: "채용",
        title: "CJ 그룹 2023 신입사원 공채 합격 후기",
        views: 200,
        comments: 2,
      },
    ],
    교내: [
      {
        id: "1",
        category: "교내",
        title: "2024-2 교내 챌린지 신청",
        views: 500,
        comments: 2,
      },
      {
        id: "2",
        category: "교내",
        title: "2024-2 교내 투게더 서류 합격 후기",
        views: 20,
        comments: 2,
      },
      {
        id: "3",
        category: "교내",
        title: "2023 교내 글로벌챌린저 면접 후기",
        views: 300,
        comments: 2,
      },
      {
        id: "4",
        category: "교내",
        title: "DS-데이터톤 입상자의 프로젝트 과정일지",
        views: 200,
        comments: 2,
      },
    ],
    "서포터즈/동아리": [
      {
        id: "5",
        category: "서포터즈/동아리",
        title: "빅데이터 분석 학회 합격자 면접 후기",
        views: 150,
        comments: 2,
      },
      {
        id: "6",
        category: "서포터즈/동아리",
        title: "코딩 연합 동아리 임원이 말하는 합격하는 꿀팁 모음",
        views: 100,
        comments: 5,
      },
      {
        id: "7",
        category: "서포터즈/동아리",
        title: "대외활동 4개 이상 활동한 갓생러의 자소서 작성 꿀팁",
        views: 150,
        comments: 3,
      },
      {
        id: "8",
        category: "서포터즈/동아리",
        title: "오비맥주 서포터즈 합격 후기",
        views: 200,
        comments: 2,
      },
    ],
    자격증: [
      {
        id: "9",
        category: "자격증",
        title: "한 달 만에 토익 900점 만든 공부법",
        views: 170,
        comments: 6,
      },
      {
        id: "10",
        category: "자격증",
        title: "캠활을 처음 공부하는 사람들에게",
        views: 80,
        comments: 2,
      },
      {
        id: "11",
        category: "자격증",
        title: "CPA 3년만에 합격한 공부방법",
        views: 300,
        comments: 0,
      },
      {
        id: "12",
        category: "자격증",
        title: "정보처리기사 공부법, 강의 추천",
        views: 120,
        comments: 3,
      },
    ],
    공모전: [
      {
        id: "13",
        category: "공모전",
        title: "동서발전 데이터 분석 공모전 대상의 프로젝트 후기",
        views: 180,
        comments: 2,
      },
      {
        id: "14",
        category: "공모전",
        title: "덕성 글쓰기 공모전 우수상 작품 공유",
        views: 80,
        comments: 0,
      },
      {
        id: "15",
        category: "공모전",
        title: "도서관 공공 데이터 활용 공모전 입상자료",
        views: 90,
        comments: 1,
      },
      {
        id: "16",
        category: "공모전",
        title: "환경 공공 데이터 활용 공모전 후기",
        views: 150,
        comments: 1,
      },
    ],
    채용: [
      {
        id: "17",
        category: "채용",
        title: "CJ 그룹 2023 신입사원 공채 합격 후기",
        views: 200,
        comments: 2,
      },
      {
        id: "18",
        category: "채용",
        title: "효성그룹 신입사원 합격 후기",
        views: 230,
        comments: 3,
      },
      {
        id: "19",
        category: "채용",
        title: "29살에 대기업 신입사원으로 합격한 비결을 담았습니다.",
        views: 220,
        comments: 4,
      },
      {
        id: "20",
        category: "채용",
        title: "UN 난민기구 인턴 합격 후기 및 면접팁",
        views: 180,
        comments: 1,
      },
    ],
  };

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
    <View style={styles.itemContainer}>
      <View style={styles.itemHeader}>
        <Text style={styles.itemCategory}>#{item.category}</Text>
        <Text style={styles.itemViews}>💰 {item.views}</Text>
      </View>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <View style={styles.itemFooter}>
        <Text style={styles.itemComments}>❤️ {item.comments}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>정보</Text>
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        />
      </View>
      <FlatList
        data={data[selectedCategory]}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
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
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  header: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  categoryList: {
    paddingHorizontal: 5,
    justifyContent: "space-evenly",
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: "#EEEEEE",
    borderRadius: 10,
    marginHorizontal: 5,
  },
  selectedCategory: {
    backgroundColor: "#000000",
  },
  categoryText: {
    fontSize: 16,
    color: "#555555",
  },
  selectedCategoryText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  listContent: {
    paddingBottom: 60,
  },
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
  itemCategory: {
    fontSize: 12,
    color: "#007AFF",
    fontWeight: "bold",
  },
  itemViews: {
    fontSize: 12,
    color: "#AAAAAA",
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemComments: {
    fontSize: 12,
    color: "#AAAAAA",
  },
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
  floatingButtonText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
});
