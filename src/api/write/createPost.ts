import { apiClient } from "../apiClient";

export async function createPost(
  userId: number,
  title: string,
  content: string,
  postFor: "PURCHASE" | "SALE",
  postStatus: "TRADING" | "TRADE_COMPLETE",
  price: number,
  imageUrls: string[]
) {
  try {
    const response = await apiClient.post("api/post/create", {
      userId, // 작성자 ID
      title, // 게시글 제목
      content, // 게시글 본문
      postFor, // 구매/판매 여부 ("PURCHASE" 또는 "SALE")
      postStatus: "TRADING", // 고정값으로 설정 (현재 진행 중인 상태로 기본 설정)
      price, // 금액
      imageUrls,
    });

    console.log("게시글 등록 성공:", response.data);

    return response.data; // 서버에서 응답 받은 데이터 반환
  } catch (error) {
    console.error("게시글 등록 실패:", error);

    throw error; // 에러를 호출한 쪽에서 처리할 수 있게 던짐
  }
}
