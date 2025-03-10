import { apiClient } from "../apiClient";

export async function getChatList() {
  try {
    const response = await apiClient.get("/noteRoom/roomList");
    console.log("채팅방 목록 조회 api성공");
    return response;
  } catch (error) {
    console.log("채팅방 목록 조회 api실패", error);
  }
}
