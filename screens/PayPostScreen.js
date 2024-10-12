// 유예린
// 유료 게시글(꿀팁 거래 게시판 게시글)
/*
  꿀팁 게시판에서 연결은 나중에  

  댓글 목록은 일단 보류

  현재 유저의 id를 어떻게 받아오지??? 로그인 이후에 유저 id를 context에 저장하면 될 듯 나중에 구현
*/

/*
  api를 통해서 받아야 될 것:
  1. 게시글 정보 - 게시글 가격(마일리지), 게시글 제목, 게시글 내용, (사진이랑 파일 첨부가 가능하다면 게시글 사진, 파일),
  조회수, 좋아요 수, 작성자 id(이걸 넘겨줘야 유저 정보를 받아올 수 있게 됨)
  
  2. 작성자 정보 - 작성자 프로필 사진, 작성자 이름, 작성자 등급(아니면 membershipController로 가져와도 될 듯)
  
  3. 좋아요 여부(중복 좋아요 방지 위함)
  
  4. 장바구니에 담았는지 여부(중복 장바구니 방지 위함)

  5. 이용자가 해당 게시글을 구매했는지 여부(이걸 알아야 게시글 내용을 블러처리 할 수 있음)

  api 관련 함수는 한 파일에 모아둘 생각
*/

import { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  View,
  Text,
  Pressable,
  Alert,
} from "react-native";
import { BlurView } from "expo-blur"; // 블러 처리를 위한 라이브러리
import goBackIcon from "../assets/go_back.png";
import userImg from "../assets/user_img.png";
// 마일리지 아이콘 바뀔 확률 높음
//import mileageIcon from "../assets/mileage.png";
import mileageIcon from "../assets/honey_mileage.png";
import buyIcon from "../assets/buy.png";
import cartIcon from "../assets/cart.png";
import viewIcon from "../assets/view.png";
import likeIcon from "../assets/like.png";
import dislikeIcon from "../assets/dislike.png";
import lockIcon from "../assets/lock.png";
import vvipIcon from "../assets/vvip.png";
import vipIcon from "../assets/vip.png";
import basicIcon from "../assets/basic.png";
import { useRoute } from "@react-navigation/native";
import {
  fetchPostDetail,
  fetchUserData,
  handleCartClick,
  handleLikeClick,
  handleRemoveLikeClick,
  handleDislikeClick,
  handleRemoveDislikeClick,
  buyDirect,
} from "../services/api";

export default function PayPostScreen() {
  // 이렇게 하면 게시글 들어올 때마다 좋아요 여부와 장바구니 여부가 리셋돼서 중복 좋아요와 장바구니 담기 가능하게 됨
  // 좋아요 여부, 장바구니에 해당 게시글이 담겨있는지 여부 확인하는 api가 있으면 좋을 것 같긴 함
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [cart, setCart] = useState(false);
  const [post, setPost] = useState(null);
  //const [user, setUser] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState(null);

  const route = useRoute();
  const { postId } = route.params;

  const handleBuyPress = () => {
    if (isAuthorized) {
      Alert.alert("이미 구매한 게시글입니다!");
    } else {
      Alert.alert("구매하기", "해당 글을 구매하시겠습니까?", [
        {
          text: "예",
          onPress: async () => {
            // 장바구니에 추가하는 api.
            const result = await buyDirect(postId);
            // 만약 장바구니에 이미 담겨있다면??
            if (result.success === false) {
              if (result.reason === "alreadyBuy") {
                Alert.alert(
                  "결제 실패",
                  "이미 해당 게시글에 대한 거래가 존재합니다."
                );
              } else if (result.reason === "noMileage") {
                Alert.alert(
                  "결제 실패",
                  "잔액이 부족합니다. 마일리지를 충전하세요."
                );
              } else {
                Alert.alert("결제 실패", "알 수 없는 오류가 발생했습니다.");
              }
            } else {
              Alert.alert(
                "결제 성공",
                `결제가 완료되었습니다! 남은 마일리지: ${result}`
              );
            }

            /*setCart(true);
            Alert.alert("게시글을 장바구니에 담았습니다!");*/
          }, // 장바구니에 담기. api 보내는 거 추가
        },
        {
          text: "아니요",
          style: "cancel",
        },
      ]);
    }
  };

  const handleCartPress = () => {
    if (isAuthorized) {
      Alert.alert("이미 구매한 게시글입니다!");
    } else {
      if (cart) {
        Alert.alert("이미 장바구니에 담은 글입니다!"); // 여유되면 장바구니 삭제 api 연결하기?
      } else {
        Alert.alert("장바구니 담기", "해당 글을 장바구니에 담으시겠습니까?", [
          {
            text: "예",
            onPress: async () => {
              // 장바구니에 추가하는 api.
              const result = await handleCartClick(postId);
              // 만약 장바구니에 이미 담겨있다면??
              if (result.success) {
                setCart(true);
                Alert.alert("게시글을 장바구니에 담았습니다!");
              } else if (result.reason === "alreadyInCart") {
                setCart(true);
                Alert.alert("이미 장바구니에 담은 글입니다!");
              } else {
                Alert.alert("장바구니 담기에 실패했습니다.");
              }

              /*setCart(true);
            Alert.alert("게시글을 장바구니에 담았습니다!");*/
            }, // 장바구니에 담기. api 보내는 거 추가
          },
          {
            text: "아니요",
            style: "cancel",
          },
        ]);
      }
    }
  };

  const handleDislikePress = async () => {
    if (isAuthorized) {
      if (disliked) {
        Alert.alert("싫어요 취소", "싫어요를 취소하겠습니까?", [
          {
            text: "예",
            onPress: async () => {
              // 싫어요 취소 보내기
              const result = await handleRemoveDislikeClick(postId);
              if (result) {
                setLiked(false);
                Alert.alert("싫어요를 취소했습니다.");
              } else {
                Alert.alert("싫어요 취소에 실패했습니다.");
              }

              /*setDisliked(false);
              Alert.alert("싫어요를 취소했습니다.");*/
            }, // '예'를 누르면 좋아요 취소 + api 보내는 거 추가하기
          },
          {
            text: "아니요",
            style: "cancel",
          },
        ]);
      } else {
        Alert.alert("싫어요", "이 게시글에 싫어요를 누르겠습니까?", [
          {
            text: "예",
            onPress: async () => {
              // 싫어요 보내기.
              const result = await handleDislikeClick(postId);
              if (result.success) {
                setDisliked(true);
                Alert.alert("싫어요를 눌렀습니다!");
              } else if (result.reason === "alreadyDisliked") {
                setDisliked(true);
                Alert.alert("이미 싫어요를 누르셨습니다.");
              } else {
                Alert.alert("싫어요 추가에 실패했습니다.");
              }
              /*
              setDisliked(true);
              Alert.alert("싫어요를 눌렀습니다!");
              */
            }, // '예'를 누르면 좋아요 + api 보내는 거 추가하기
          },
          {
            text: "아니요",
            style: "cancel",
          },
        ]);
      }
    }
  };

  const handleLikePress = async () => {
    if (isAuthorized) {
      if (liked) {
        Alert.alert("좋아요 취소", "좋아요를 취소하겠습니까?", [
          {
            text: "예",
            onPress: async () => {
              // 좋아요 취소 보내기

              const result = await handleRemoveLikeClick(postId, post.userId);
              if (result) {
                setLiked(false);
                Alert.alert("좋아요를 취소했습니다.");
              } else {
                Alert.alert("좋아요 취소에 실패했습니다.");
              }
              /*
              setLiked(false);
              Alert.alert("좋아요를 취소했습니다.");
              */
            }, // '예'를 누르면 좋아요 취소 + api 보내는 거 추가하기
          },
          {
            text: "아니요",
            style: "cancel",
          },
        ]);
      } else {
        Alert.alert("좋아요", "이 게시글에 좋아요를 누르겠습니까?", [
          {
            text: "예",
            onPress: async () => {
              // 좋아요 보내기. reactionType이 정확히 뭔지 모르겠음
              const result = await handleLikeClick(postId);
              if (result.success) {
                setLiked(true);
                Alert.alert("좋아요를 눌렀습니다!");
              } else if (result.reason === "alreadyLiked") {
                setLiked(true);
                Alert.alert("이미 좋아요를 눌렀습니다.");
              } else {
                Alert.alert("좋아요 누르기에 실패했습니다.");
              }
              /* setLiked(true);
              Alert.alert("좋아요를 눌렀습니다!");*/
            }, // '예'를 누르면 좋아요 + api 보내는 거 추가하기
          },
          {
            text: "아니요",
            style: "cancel",
          },
        ]);
      }
    }
  };

  const getGradeImage = (grade) => {
    switch (grade) {
      case "VVIP":
        return vvipIcon; // VIP 등급 이미지
      case "VIP":
        return vipIcon; // Gold 등급 이미지
      case "BASIC":
        return basicIcon; // Silver 등급 이미지
    }
  };

  // api 연결하기 전까지 사용할 객체들
  const user = {
    profileImg: userImg,
    name: "유저",
    user_grade: "VVIP",
  };

  /*
  const post = {
    post_mileage: 200,
    title:
      "꿀팁 거래 게시글 예시. 제목 길어지면 어떻게 되는지 한번 확인해볼게요. 자동으로 두 줄 되는지 확인해봅시다.",
    content:
      "게시글 내용. 몇글자만 맛보기로 보여주고 나머지는 블러처리. 예를 들어서 100글자?는 보여주고 나머지는 ... 처리하다가 블러. 사진도 블러???",
    // image: [이미지가 여러 개면 리스트 형태로 갖다줄려나??],
    // file: 파일 첨부가 가능하다면 추가,
    views: 12,
    likes: 2,
    dislikes: 0,
    author_Id: 1,
    author_name: "유저",
    author_grade: "VVIP",
  };
  */

  const fetchData = async () => {
    try {
      const postData = await fetchPostDetail(postId);
      setPost(postData);

      //const userData = await fetchUserData(postData.author_Id);
      //setUser(userData);
    } catch (error) {
      setError(error.message);
    }
  };

  //post 변수도 state로 만들지 고민
  /*useEffect(() => {
    fetchData();
  }, [liked, cart, post, user, isAuthorized]);*/

  return (
    <ScrollView style={styles.main}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Image style={styles.goBackIcon} source={goBackIcon} />
      </TouchableOpacity>

      <View style={styles.lineView} />

      <View style={styles.header}>
        <Pressable
          style={styles.profileContainer}
          onPress={() => {
            // 작성자 프로필로 이동
          }}
        >
          <Image
            style={styles.profileImg}
            source={user.profileImg}
            resizeMode="cover"
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 3,
            }}
          >
            <Text style={styles.profileName}>{post.author_name}</Text>
            <Image
              source={getGradeImage(post.author_grade)}
              style={{ width: 15, height: 15 }}
              resizeMode="contain"
            />
          </View>
        </Pressable>
        <View style={styles.mileageContainer}>
          <Image style={styles.mileageIcon} source={mileageIcon} />
          <Text style={styles.mileageText}>{post.post_mileage}</Text>
        </View>
      </View>

      <Text style={styles.postTitle}>{post.title}</Text>
      {/* 구매 전이면 게시글 내용 한 줄만 미리보기로 보여주기 */}
      {isAuthorized || (
        <Text style={styles.postContentPreview} numberOfLines={1}>
          {post.content}
        </Text>
      )}
      <View style={styles.contentContainer}>
        <Text style={styles.postContent}>{post.content}</Text>

        {/* 이미지가 있다면 */}
        <ScrollView
          horizontal={true} // 가로 스크롤 활성화. 근데 블러 처리된 경우 가로 스크롤이 안됨.
          showsHorizontalScrollIndicator={false} // 가로 스크롤바 숨기기
          style={styles.scrollView}
        >
          {/* <Image style={styles.imageLayout} source={{uri: post.imageUrl}} resizeMode="cover" /> */}
          <Image
            style={styles.imageLayout}
            source={{
              uri: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            resizeMode="cover"
          />
          <View style={[styles.imageLayout]} />
          <View style={[styles.imageLayout]} />
          <View style={[styles.imageLayout]} />
          <View style={[styles.imageLayout]} />
          <View style={[styles.imageLayout]} />
        </ScrollView>
        {isAuthorized || (
          <BlurView
            intensity={25}
            tint="light"
            experimentalBlurMethod="dimezisBlurView"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Image style={{ width: 40, height: 40 }} source={lockIcon} />
            <Text
              style={{
                width: "70%",
                fontSize: 19,
                textAlign: "center",
                fontWeight: "700",
              }}
            >
              게시글을 구매하여 전체 내용을 확인하세요!
            </Text>
          </BlurView>
        )}
      </View>

      <View style={styles.footer}>
        {/* 장바구니에 담겠냐는 팝업 띄우고 "네"라고 대답한 경우 장바구니에 담았다는 팝업 띄우기 */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
          }}
        >
          <TouchableOpacity
            style={styles.buyContainer}
            onPress={handleBuyPress}
          >
            <Image
              style={styles.cartIcon}
              source={buyIcon}
              resizeMode="contain"
            />
            <Text style={styles.buyText}>구매하기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cartContainer}
            onPress={handleCartPress}
          >
            <Image style={styles.cartIcon} source={cartIcon} />
            <Text style={styles.cartText}>장바구니</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.viewAndLike}>
          <View style={styles.footerContainer}>
            <Image style={styles.viewIcon} source={viewIcon} />
            <Text>{post.views}</Text>
          </View>
          {/* 구매한 경우 좋아요 가능하게 할 것. 좋아요 누르겠냐는 팝업 띄우기. 이미 누른 경우 이미 눌렀다고 띄우기?? */}
          <TouchableOpacity
            style={styles.footerContainer}
            onPress={handleLikePress}
          >
            <Image style={styles.likeIcon} source={likeIcon} />
            <Text>{post.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.footerContainer}
            onPress={handleDislikePress}
          >
            <Image style={styles.likeIcon} source={dislikeIcon} />
            <Text>{post.dislikes}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#fff",
    flex: 1,
    paddingHorizontal: 20,
  },
  goBackIcon: {
    width: 20,
    height: 16,
    //marginVertical: 22,
    marginTop: 30,
    marginBottom: 22,
  },
  lineView: {
    borderStyle: "solid",
    borderColor: "rgba(122, 122, 122, 0.18)",
    borderTopWidth: 0.9,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 5,
    marginTop: 20,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  profileImg: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  profileName: {
    fontSize: 16,
    letterSpacing: -0.4,
    lineHeight: 24,
    fontWeight: "700",
  },
  mileageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  mileageIcon: {
    //width: 20,
    //height: 18,
    width: 20,
    height: 19.94,
  },
  mileageText: {
    fontSize: 13,
    letterSpacing: -0.3,
    lineHeight: 20,
    fontWeight: "500",
    color: "rgba(97, 97, 100, 0.68)",
  },
  postTitle: {
    fontSize: 18,
    letterSpacing: -0.4,
    lineHeight: 27,
    fontWeight: "600",
    marginHorizontal: 5,
    marginTop: 15,
  },
  contentContainer: {
    marginHorizontal: 5,
    marginTop: 15,
  },
  postContentPreview: {
    fontSize: 13,
    letterSpacing: -0.3,
    lineHeight: 20,
    marginHorizontal: 5,
    marginTop: 15,
  },
  postContent: {
    fontSize: 13,
    letterSpacing: -0.3,
    lineHeight: 20,
  },
  scrollView: {
    flexDirection: "row",
    marginTop: 12,
    //marginLeft: 5,
  },
  imageLayout: {
    backgroundColor: "#d9d9d9",
    borderRadius: 20,
    width: 122,
    height: 122,
    marginRight: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 5,
    marginTop: 20,
  },
  buyContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "#000",
    gap: 10,
    width: 85,
    height: 30,
  },
  cartContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    gap: 10,
    width: 85,
    height: 30,
  },
  cartIcon: {
    width: 15.2,
    height: 15.75,
  },
  buyText: {
    color: "#fff",
    fontSize: 12,
    letterSpacing: -0.2,
    lineHeight: 14,
    fontWeight: "700",
  },
  cartText: {
    fontSize: 12,
    letterSpacing: -0.2,
    lineHeight: 14,
    fontWeight: "700",
  },
  viewAndLike: {
    fontSize: 10,
    letterSpacing: -0.2,
    lineHeight: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  viewIcon: {
    width: 17,
    height: 17,
  },
  likeIcon: {
    width: 15,
    height: 15,
  },
});
