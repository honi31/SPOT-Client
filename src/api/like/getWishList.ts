import { apiClient } from "../apiClient";

export async function getWishList() {
  try {
    const response = await apiClient.get("/api/wish/wishes");
    return response.data; // 데이터만 반환
  } catch (error) {
    console.error("찜 목록 가져오기 실패:", error);
    throw error;
  }
}
