// 유예린

import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Pressable,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import goBackIcon from "../assets/go_back.png";
import searchIcon from "../assets/search.png";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function SearchResultScreen() {
  const route = useRoute();
  const { mainCategory, subCategory, keyword } = route.params;

  const [selectedCategory, setSelectedCategory] = useState("전체"); //서브 카테고리. 전체가 디폴트
  const [searchQuery, setSearchQuery] = useState(keyword);
  const navigation = useNavigation();

  // api 연결 전까지 사용
  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      Alert.alert("검색어를 입력해 주세요."); // 검색어가 없는 경우 경고
      return;
    }
  };

  // api 연결 후 아래 코드 사용
  /*
  const [searchResults, setSearchResults] = useState([]);

  // 검색 API 요청 함수
  async function fetchSearchResults() {
    if (searchQuery.trim() === "") {
      Alert.alert("검색어를 입력해 주세요.");
      return;
    }
    try {
      const response = await fetch(
        `https://서버주소/api/search?mainCategory=${mainCategory}&subCategory=${selectedCategory}&keyword=${searchQuery}`
      );
      const data = await response.json();
      setSearchResults(data); // 검색 결과 저장
    } catch (error) {
      console.error("검색 결과를 가져오는 중 오류가 발생했습니다:", error);
    }
  }

  // 검색어 변경 시 새로운 검색 요청
  useEffect(() => {
    fetchSearchResults();
  }, [selectedCategory]);

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      Alert.alert("검색어를 입력해 주세요.");
      return;
    }
    fetchSearchResults(); // 검색 결과 새로고침
  };
  */

  return (
    <ScrollView style={styles.searchMain}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Image style={styles.goBackIcon} source={goBackIcon} />
      </TouchableOpacity>

      <View style={styles.searchBoxContainer}>
        <TextInput
          style={styles.searchBox}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          style={styles.searchIconWrapper}
          onPress={handleSearch}
        >
          <Image style={styles.icon} resizeMode="cover" source={searchIcon} />
        </TouchableOpacity>
      </View>

      {/* 만약 메인 카테고리가 커뮤니티라면 세부 카테고리 선택창이 안보이게 함 */}
      {mainCategory === "커뮤니티" ? (
        <></>
      ) : (
        <View style={styles.container}>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => {
                setSelectedCategory("전체");
              }}
            >
              <Text
                style={[
                  styles.categorytext,
                  selectedCategory === "전체" && styles.textActive,
                ]}
              >
                전체
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => {
                setSelectedCategory("교내");
              }}
            >
              <Text
                style={[
                  styles.categorytext,
                  selectedCategory === "교내" && styles.textActive,
                ]}
              >
                교내
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => {
                setSelectedCategory("서포터즈/동아리");
              }}
            >
              <Text
                style={[
                  styles.categorytext,
                  selectedCategory === "서포터즈/동아리" && styles.textActive,
                ]}
              >
                서포터즈/동아리
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => {
                setSelectedCategory("자격증");
              }}
            >
              <Text
                style={[
                  styles.categorytext,
                  selectedCategory === "자격증" && styles.textActive,
                ]}
              >
                자격증
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => {
                setSelectedCategory("공모전");
              }}
            >
              <Text
                style={[
                  styles.categorytext,
                  selectedCategory === "공모전" && styles.textActive,
                ]}
              >
                공모전
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => {
                setSelectedCategory("채용");
              }}
            >
              <Text
                style={[
                  styles.categorytext,
                  selectedCategory === "채용" && styles.textActive,
                ]}
              >
                채용
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View>
        {/* 검색 결과 게시글들 띄우기. 만약 검색 결과가 없으면 없다고 띄우기 */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  searchMain: {
    backgroundColor: "#fff",
    flex: 1,
    paddingHorizontal: 20,
    //padding: 16,
  },
  goBackIcon: {
    width: 20,
    height: 16,
    //marginVertical: 22,
    marginTop: 30,
    marginBottom: 22,
  },
  textActive: {
    color: "#000",
  },
  searchBoxContainer: {
    //width: 350,
    width: "100%", // Full width
    height: 47,
    borderRadius: 30,
    backgroundColor: "rgba(217, 217, 217, 0)",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 2,
    flexDirection: "row",
    marginBottom: 25,
    //marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  searchBox: {
    width: 260,
    height: 47,
    fontSize: 17,
    letterSpacing: -0.4,
    lineHeight: 26,
    fontWeight: "700",
    /*borderRadius: 30,
    borderWidth: 2,
    borderColor: "#000",*/
  },
  searchIconWrapper: {
    marginLeft: 8,
  },
  icon: {
    width: 19.72,
    height: 20,
  },
  title: {
    fontSize: 24,
    letterSpacing: -0.6,
    lineHeight: 36,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
    marginVertical: 16,
  },
  separator: {
    height: 20, // 구분선의 높이
    width: 1, // 구분선의 너비
    backgroundColor: "#d9d9d9", // 구분선 색상
    alignSelf: "center", // 중앙 정렬
  },
  categorytext: {
    textAlign: "center",
    color: "#a5a5a5",
    fontFamily: "Inter-Bold",
    fontWeight: "700",
    //lineHeight: 23,
    letterSpacing: -0.3,
    fontSize: 15,
    flex: 1, // This allows equal space distribution
  },
  parent: {
    flex: 1,
    flexDirection: "column", // Arrange items vertically
    justifyContent: "center", // Center the items vertically
    alignItems: "center", // Center the items horizontally
    width: "100%",
    height: 54,
  },
  categoryContainer: {
    flexDirection: "row", // Arrange text items in a row
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%", // Full width
    paddingHorizontal: 25,
  },
  categorycategoryButton: {
    height: 23,
  },
  lineView: {
    height: 1,
    width: "100%",
    borderColor: "rgba(122, 122, 122, 0.18)",
    borderWidth: 0.9,
    marginVertical: 10, // Space between text and line
  },
  rankings: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginVertical: 20,
    marginHorizontal: 15,
  },
  honeywebContainer: {
    fontSize: 24,
    letterSpacing: -0.6,
    lineHeight: 36,
    fontWeight: "700",
    color: "#000",
    marginBottom: 20,
  },
  honeyweb: {
    color: "#ecae52",
  },
  rankContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    marginLeft: 5,
    marginBottom: 13,
  },
  topRanks: {
    fontSize: 20,
    letterSpacing: -0.5,
    lineHeight: 30,
    fontWeight: "700",
    color: "#ecae52",
    textAlign: "left",
  },
  ranks: {
    fontSize: 20,
    letterSpacing: -0.5,
    lineHeight: 30,
    fontWeight: "700",
    color: "#000",
    textAlign: "left",
  },
  keyword: {
    fontSize: 16,
    letterSpacing: -0.4,
    lineHeight: 24,
    fontWeight: "700",
    color: "#000",
    textAlign: "left",
  },
  container: {
    borderWidth: 1,
    borderColor: "rgba(122, 122, 122, 0.18)",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "rgba(122, 122, 122, 0.18)",
  },
  categoryButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    borderRightWidth: 1,
    borderColor: "rgba(122, 122, 122, 0.18)",
  },
});
