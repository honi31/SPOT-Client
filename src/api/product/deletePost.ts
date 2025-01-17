import { apiClient } from "../apiClient";

export async function deletePost(postId: number) {
  try {
    const response = await apiClient.delete(`/api/post/delete/${postId}`);
    console.log("게시글 삭제 api 성공 response ", response);
    return response.data;
  } catch (error) {
    console.log("게시글 삭제 api 에러", error);
  }
}
