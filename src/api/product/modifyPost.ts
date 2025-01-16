import { apiClient } from "../apiClient";

export async function getBeforePost(postId: number) {
  try {
    const response = await apiClient.get(`/api/post/before/${postId}`);
    console.log("수정할 게시글 불러오기 api 성공 response ", response);
    return response.data;
  } catch (error) {
    console.log("수정할 게시글 불러오기 api 에러", error);
  }
}

export async function modifyPost(
  postId: number,
  title: string,
  content: string,
  postFor: "PURCHASE" | "SALE",
  postStatus: "TRADING" | "TRADE_COMPLETE",
  price: number,
  category: string
) {
  try {
    const response = await apiClient.put(`/api/post/modify/${postId}`, {
      title,
      content,
      postFor,
      postStatus,
      price,
      category,
    });
    console.log("게시글 수정 api 성공 response ", response);
    return response.data;
  } catch (error) {
    console.log("게시글 수정 api 에러", error);
  }
}
