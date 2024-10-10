// 유예린

/*
로그인 기능을 먼저 구현해야 장바구니도 구현할 수 있을 것 같음

장바구니 목록 받아오기
각 게시글의 필요한 정보: 게시글 번호, 게시글 제목, 작성자, 작성자 전공??(말고 등급이 있어도 괜찮을듯),
게시글 작성일자, 게시글 서브 카테고리, 게시글 마일리지

선택 결제를 어떻게 구현해야 될지 모르겠음...

장바구니가 비어있으면 비어있다고 해야 되나?
*/

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
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import uncheckIcon from "../assets/uncheck.png";
import checkIcon from "../assets/check.png";
import mileageIcon from "../assets/honey_mileage.png";
import { fetchCartLists } from "../services/api";

export default function CartScreen() {
  const [cartLists, setCartLists] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  // api 연결 전까지 사용
  const lists = [
    {
      post_id: 1,
      title: "대외활동 4개 이상 활동한 갓생러의 어쩌구저쩌구쏼라쏼라",
      name: "화학 사랑해요",
      // 전공 또는 등급
      created_at: "09월 14일",
      sub_category_name: "취준",
      post_mileage: 150,
    },
    {
      post_id: 230,
      title: "게시글 예시",
      name: "유저",
      // 전공 또는 등급
      created_at: "10월 09일",
      sub_category_name: "서포터즈/동아리",
      post_mileage: 200,
    },
    {
      post_id: 123,
      title: "게시글 예시2",
      name: "유저2",
      // 전공 또는 등급
      created_at: "09월 30일",
      sub_category_name: "교내",
      post_mileage: 150,
    },
    {
      post_id: 333,
      title: "게시글 예시3",
      name: "유저3",
      // 전공 또는 등급
      created_at: "10월 01일",
      sub_category_name: "공모전",
      post_mileage: 150,
    },
  ];

  const totalMileage = lists.reduce(
    (total, item) => total + item.post_mileage,
    0
  );

  const handleCheckBoxClick = () => {};

  const handlePayClick = () => {
    Alert.alert("구매하기", "선택한 게시글들을 구매하시겠습니까?", [
      {
        text: "예",
        onPress: () => {
          /*
                    if(보유 마일리지가 부족) {
                        Alert.alert("마일리지가 부족합니다.");
                    } else {
                        Alert.alert("~~ 마일리지가 사용되었습니다.");
                        setIsPaid(!isPaid);
                    }
                */
        },
      },
      {
        text: "아니요",
        style: "cancel",
      },
    ]);
  };

  const renderItem = ({ item }) => {
    return (
      <>
        <View style={{ gap: 3 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate("PostDeatil", { postId: item.post_id })
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  letterSpacing: -0.4,
                  lineHeight: 27,
                  fontWeight: "600",
                }}
                numberOfLines={1}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
            <Image style={{ width: 24, height: 24 }} source={uncheckIcon} />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "end",
            }}
          >
            <View style={{}}>
              <Text
                style={{ fontSize: 13, letterSpacing: -0.3, lineHeight: 20 }}
              >
                {item.name} | 화학
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  letterSpacing: -0.2,
                  lineHeight: 15,
                  color: "rgba(97, 97, 100, 0.68)",
                }}
              >
                {item.created_at} | {item.sub_category_name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Image
                style={{ width: 24, height: 24 }}
                source={mileageIcon}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontSize: 16,
                  letterSpacing: -0.4,
                  lineHeight: 24,
                  fontWeight: "500",
                  color: "rgba(97, 97, 100, 0.68)",
                }}
              >
                {item.post_mileage}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            borderStyle: "solid",
            borderColor: "#d9d9d9",
            borderTopWidth: 0.9,
            width: "100%",
            height: 1,
            marginVertical: 10,
          }}
        />
      </>
    );
  };

  /*
  useEffect(() => {
    const lists = await fetchCartLists(userId?);
    setCartLists(lists);
  }, [isPaid]);
  */

  return (
    <View style={{ flex: 1, backgroundColor: "fff" }}>
      <View style={styles.main}>
        <Text style={styles.title}>장바구니</Text>

        <FlatList
          data={lists}
          renderItem={renderItem}
          keyExtractor={(item) => item.post_id.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <TouchableOpacity style={styles.payContainer} onPress={handlePayClick}>
        <Text style={styles.payText}>{totalMileage} 마일리지 결제하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    // backgroundColor: "#fff",
    flex: 1,
    paddingHorizontal: 20,
    //padding: 16,
  },
  title: {
    fontSize: 24,
    letterSpacing: -0.6,
    lineHeight: 36,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 30,
  },
  payContainer: {
    //position: "absolute",
    //bottom: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#000",
    height: 70,
    width: "100%",
    //position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  payText: {
    fontSize: 16,
    letterSpacing: -0.4,
    lineHeight: 24,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    //position: "absolute",
  },
});
