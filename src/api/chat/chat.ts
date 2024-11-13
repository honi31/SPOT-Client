import { apiClient } from "../apiClient";

export async function createChatRoom(postId: number) {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await apiClient.post(
      "/noteRoom/createRoom",
      { postId },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("채팅방 생성 api 성공", response);

    return response;
  } catch (error) {
    console.log("채팅방 생성 api 오류", error);
  }
}
