import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "https://백엔드api주소";

// 로그인 함수
export async function login(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // 로그인 성공 시 token을 AsyncStorage에 저장
      await AsyncStorage.setItem("userToken", data.token);

      // 추가로 사용자 정보도 저장할 수 있어
      await AsyncStorage.setItem("userId", data.user.id);

      return true;
    } else {
      // 로그인 실패 처리
      console.error(data.message);
      return false;
    }
  } catch (error) {
    console.error("Error logging in:", error);
  }
}

// 인기글 받아오는 함수
export async function fetchHotPosts() {
  const response = await fetch(`${API_BASE_URL}/api/posts/popular`);
  if (!response.ok) {
    throw new Eror("error!");
  }
  const body = await response.json();
  return body;
}

// 검색 API 요청 함수
export async function fetchSearchResults(
  keyword,
  parentCategoryId,
  subCategoryId
) {
  if (searchQuery.trim() === "") {
    Alert.alert("검색어를 입력해 주세요.");
    return;
  }
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/search?keyword=${keyword}&parentCategoryId=${parentCategoryId}&subCategoryId=${subCategoryId}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("검색 결과를 가져오는 중 오류가 발생했습니다:", error);
  }
}

// 게시글 정보 받아오는 함수 => API 명세서에는 post_id와 author_id를 request body로 보내게 되어있음. 나중에 수정
export async function fetchPostDetail(postId) {
  const response = await fetch(`${API_BASE_URL}/api/posts/${postId}`);
  if (!response.ok) {
    throw new Eror("error!");
  }
  const body = await response.json();
  return body;
}

// 유저 정보 받아오는 함수
export async function fetchUserData(userId) {
  // 추후 수정
}

// 장바구니에 담기 함수 => 장바구니에 성공적으로 담으면 true를 리턴. 이를 이용해 state에 반영하기
// cratedAt이 정확히 뭘 의미하는지??
export async function handleCartClick(
  postId,
  authorId,
  createdAt,
  title,
  postMileage
) {
  const userId = await AsyncStorage.getItem("userId");
  const response = await fetch(`${API_BASE_URL}/api/cart/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: userId,
      post_id: postId,
      author_id: authorId,
      created_at: createdAt,
      title: title,
      post_mileage: postMileage,
    }),
  });

  if (!response.ok) {
    //throw new Error("error!");
    return false;
  } else {
    return true;
  }
}

// 좋아요 보내기 함수
// reactionType이 정확히 어떤 건지 물어보기
export async function handleLikeClick(postId, reactionType, reactionAt) {
  try {
    // fetch를 이용해 POST 요청 보내기
    const response = await fetch(`${API_BASE_URL}/api/posts/${postId}/like`, {
      method: "POST", // POST 요청
      headers: {
        "Content-Type": "application/json", // 요청의 내용 형식을 JSON으로 지정
      },
      body: JSON.stringify({
        post_id: postId, // 요청 바디에 post_id 포함
        reaction_type: reactionType, // 요청 바디에 reaction_type 포함 (예: "like")
        reaction_at: reactionAt, // 요청 바디에 reaction_at 포함 (예: ISO 형식의 날짜)
      }),
    });

    // 응답 상태 처리
    if (response.ok) {
      const data = await response.json(); // 응답을 JSON으로 변환
      return true;
    } else {
      console.log("좋아요 전송 실패: ", response.status);
      return false;
    }
  } catch (error) {
    console.error("좋아요 전송 중 에러 발생: ", error);
  }
}

// 좋아요 취소 함수
export async function handleRemoveLikeClick(post_id, author_id) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/posts/${post_id}/like`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post_id, author_id }),
    });

    if (!response.ok) {
      //throw new Error("Failed to remove like");
      console.log("좋아요 취소 실패");
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error("Error removing like:", error);
    throw error; // 실패 시 에러를 반환
  }
}

// 장바구니 목록 받아오는 함수
export async function fetchCartLists() {
  try {
    const userId = await AsyncStorage.getItem("userId");
    const response = await fetch(`${API_BASE_URL}/api/cart/items`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userId }),
    });

    const data = await response.json();
    if (response.ok) {
      return data.items; // 장바구니 항목 반환
    } else {
      throw new Error(
        data.message || "장바구니 항목을 가져오는 데 실패했습니다."
      );
    }
  } catch (error) {
    console.error("오류 발생:", error);
    return []; // 오류 발생 시 빈 배열 반환
  }
}

/*
// 게시글 구매 여부 받아오는 함수
export async function 어쩌구저쩌구(userId, postId) {
    const response = await fetch(...);
    if (response.ok){
      return true;
    } else {
     return false;
    }
}

// 좋아요 여부 받아오는 함수
export async function 어쩌구저쩌구(userId, postId) {
    const response = await fetch(...);
    if (response.ok){
      return true;
    } else {
     return false;
    }
}

// 장바구니에 담았는지 확인하는 함수
export async function 어쩌구저쩌구(userId, postId) {
    const response = await fetch(...);
    if (response.ok){
      return true;
    } else {
     return false;
    }
}
*/
