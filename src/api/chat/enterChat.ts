import { apiClient } from "../apiClient";

export async function enterChat(roomId: number) {
  try {
    const response = await apiClient.get(`/noteRoom/enterRoom/${roomId}`);
    console.log("이미 존재하는 채팅방 입장 성공");
    return response;
  } catch (error) {
    console.log("이미 존재하는 채팅방 입장 오류", error);
  }
}
