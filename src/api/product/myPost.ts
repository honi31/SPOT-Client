import { apiClient } from "../apiClient";

export async function getMyPosts() {
  try {
    const response = await apiClient.get(`/api/post/feed/user`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("내가쓴 게시글 반환 api 성공 response ", response);
    return response.data;
  } catch (error) {
    console.log("내가 쓴 게시글 반환 api 에러", error);
    throw error;
  }
}
