import { apiClient } from "../apiClient";

export async function addWish(targetPostId: number) {
  try {
    const response = apiClient.post("/api/wish/add", { targetPostId });
    return response;
  } catch (error) {
    console.log("찜 하기 api 오류", error);
  }
}
