import { apiClient } from "../apiClient";

export async function updateStatus(id: number, status: string) {
  try {
    const response = await apiClient.put(
      `/api/post/updateStatus/${id}/${status}`
    );
    console.log("게시글 상태변경 api 성공", response);
    return response;
  } catch (error) {
    console.log("게시글 상태 변경 api 에러", error);
  }
}
