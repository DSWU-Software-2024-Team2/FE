import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://172.18.37.130:3000";
const userId = 0;

// 로그인 함수
export async function login(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    const data = await response.json();

    if (response.ok) {
      // 로그인 성공 시 token을 AsyncStorage에 저장
      await AsyncStorage.setItem("userToken", data.token);

      // 추가로 사용자 정보도 저장할 수 있어
      await AsyncStorage.setItem("userId", JSON.stringify(userId));

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
  if (keyword.trim() === "") {
    Alert.alert("검색어를 입력해 주세요.");
    return;
  }
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/search?keyword=${keyword}&parentCategoryId=${parentCategoryId}&subCategoryId=${subCategoryId}`
    );

    /*if (response.status === 404) {
      return [];
    }*/
    const data = await response.json();
    console.log("데이터를 가져오는 중");
    console.log(data);
    return data.results;
  } catch (error) {
    console.error("검색 결과를 가져오는 중 오류가 발생했습니다:", error);
  }
}

// 검색어 저장 함수
// 검색어는 같고 카테고리는 다른 경우에도 저장하게 할 건지??
export async function saveSearchKeyword(keyword) {
  // const userId = await AsyncStorage.getItem("userId");
  const response = await fetch(`${API_BASE_URL}/api/search/keyword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id: userId, keyword: keyword }),
  });

  const data = await response.json();

  if (!response.ok) {
    return false;
  }

  return true;
}

// 게시글 정보 받아오는 함수 => API 명세서에는 post_id와 author_id를 request body로 보내게 되어있음. 나중에 수정
// 문제!!! 게시글 구매 안 한 경우 구매 후 이용 가능하다는 메세지만 도착함. 메세지랑 함께 게시글 정보를 같이 줘야 함.
// 게시글 구매 여부를 같이 보내줬으면 좋겠음
export async function fetchPostDetail(postId) {
  // const userId = await AsyncStorage.getItem("userId");
  try {
    //console.log("api호출");
    const response = await fetch(`${API_BASE_URL}/api/posts/${postId}`);
    if (!response.ok) {
      throw new Eror("error!");
    }
    const body = await response.json();
    console.log(body);
    return body;
  } catch (error) {
    console.error("오류 발생", error);
  }
}

// 유저 정보 받아오는 함수
export async function fetchUserData(userId) {
  // 추후 수정
}

// 바로 결제 함수
export async function buyDirect(postId) {
  const userId = await AsyncStorage.getItem("userId");
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/payment/direct?userId=${userId}&postId=${postId}`
    );

    const result = await response.json();

    if (response.ok) {
      console.log("결제 성공");
      return result.remainingMileage;
    } else if (result.status === "fail") {
      if (result.message === "이미 존재하는 거래 기록입니다.") {
        return { success: false, reason: "alreadyBuy" };
      } else if (result.message === "잔액이 부족합니다.") {
        return { success: false, reason: "noMileage" };
      } else {
        return { success: false, reason: "otherError" };
      }
    }
  } catch (error) {
    console.error("Error during payment:", error);
  }
}

// 장바구니에 담기 함수 => 장바구니에 성공적으로 담으면 true를 리턴. 이를 이용해 state에 반영하기
export async function handleCartClick(postId) {
  const userId = await AsyncStorage.getItem("userId");
  const response = await fetch(
    `${API_BASE_URL}/api/cart/items?userId=${userId}&postId=${postId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    // 장바구니에 이미 담겨져 있는 경우를 따로 처리
    if (
      response.status === 400 &&
      data.message === "장바구니에 이미 담겨져 있습니다."
    ) {
      return { success: false, reason: "alreadyInCart" }; // 특정 오류를 구분할 수 있게 리턴
    }
    return { success: false, reason: "otherError" }; // 다른 오류
  } else {
    return { success: true }; // 성공 시
  }
}

// 장바구니 목록 받아오는 함수
export async function fetchCartLists() {
  try {
    //const userId = await AsyncStorage.getItem("userId");
    const response = await fetch(`${API_BASE_URL}/api/cart/items?userId=2`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      //body: JSON.stringify({ userId: 2 }),
    });

    const data = await response.json();
    if (response.ok) {
      return data; // 장바구니 항목 반환
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

// 장바구니 전체 삭제
export async function clearCart() {
  // const userId = await AsyncStorage.getItem("userId");
  const response = await fetch(
    `${API_BASE_URL}/api/cart/items/clear?userId=${userId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    return false;
  }

  return true;
}

// 장바구니 선택 삭제
export async function deleteActiveCartItems(userId) {
  // const userId = await AsyncStorage.getItem("userId");
  const response = await fetch(
    `${API_BASE_URL}/api/cart/items?userId=${userId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    return false;
  }

  return true;
}

// 장바구니 아이템 토글
export async function handleCartToggle(itemId) {
  // const userId = await AsyncStorage.getItem("userId");

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/cart/items/toggle?userId=2&itemId=${itemId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "서버 요청 실패");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error toggling cart item active state:", error);
  }
}

// 좋아요 보내기 함수
export async function handleLikeClick(postId) {
  // const userId = await AsyncStorage.getItem("userId");

  try {
    // fetch를 이용해 POST 요청 보내기
    const response = await fetch(`${API_BASE_URL}/api/post/${postId}/like`, {
      method: "POST", // POST 요청
      headers: {
        "Content-Type": "application/json", // 요청의 내용 형식을 JSON으로 지정
      },
    });

    const data = await response.json();

    // 응답 상태 처리
    if (!response.ok) {
      // 이미 좋아요를 누른 경우를 따로 처리
      if (
        response.status === 400 &&
        data.error === "이미 좋아요를 눌렀습니다."
      ) {
        return { success: false, reason: "alreadyLiked" }; // 이미 좋아요를 눌렀다는 구분
      }
      return { success: false, reason: "otherError" }; // 다른 오류
    } else {
      return { success: true }; // 성공 시
    }
  } catch (error) {
    console.error("좋아요 전송 중 에러 발생: ", error);
  }
}

// 좋아요 취소 함수
export async function handleRemoveLikeClick(postId) {
  // const userId = await AsyncStorage.getItem("userId");

  try {
    const response = await fetch(`${API_BASE_URL}/api/post/${postId}/like`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
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

// 싫어요 보내기 함수
export async function handleDislikeClick(postId) {
  try {
    // AsyncStorage에서 userId를 가져와서 사용할 수 있지만, 여기서는 백엔드에서 처리하므로 생략 가능
    const userId = await AsyncStorage.getItem("userId");
    if (!userId) {
      throw new Error("User ID가 없습니다. 로그인하세요.");
    }

    // API 호출
    const response = await fetch(`${API_BASE_URL}/api/post/${postId}/dislike`, {
      method: "POST", // POST 또는 PUT 요청
      headers: {
        "Content-Type": "application/json",
      },
      //body: JSON.stringify({ userId }), // 만약 필요한 경우 userId를 전달할 수 있습니다.
    });

    const data = await response.json();

    if (!response.ok) {
      // 이미 싫어요를 누른 경우를 따로 처리
      if (
        response.status === 400 &&
        data.error === "이미 싫어요를 눌렀습니다."
      ) {
        return { success: false, reason: "alreadyDisliked" }; // 이미 싫어요를 누른 경우
      }
      return { success: false, reason: "otherError" }; // 다른 오류
    } else {
      return { success: true, message: data.message }; // 성공 시
    }
  } catch (error) {
    console.error("싫어요 요청 중 에러 발생:", error);
    return false; // 에러 발생 시 null 반환
  }
}

// 싫어요 삭제
export async function handleRemoveDislikeClick(postId) {
  //const userId = await AsyncStorage.getItem("userId");

  try {
    const response = await fetch(`${API_BASE_URL}/api/post/${postId}/dislike`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      //throw new Error("Failed to remove like");
      console.log("싫어요 취소 실패");
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error("Error removing dislike:", error);
    throw error; // 실패 시 에러를 반환
  }
}

// 결제 요청
export async function requestPayment() {
  try {
    // AsyncStorage에서 userId를 가져옴
    const userId = await AsyncStorage.getItem("userId");

    if (!userId) {
      throw new Error("User ID가 없습니다. 로그인하세요.");
    }

    // API 호출
    const response = await fetch(`${API_BASE_URL}/api/payment?userId=2`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      // 결제 요청 성공 시 처리
      console.log("결제 요청 성공:", data);
      return data; // 성공 시 응답 데이터 반환
    } else {
      // 결제 요청 실패 시 처리
      console.error("결제 요청 실패:", data.message);
      return null; // 실패 시 null 반환
    }
  } catch (error) {
    console.error("결제 요청 중 에러 발생:", error);
    return null; // 에러 발생 시 null 반환
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
