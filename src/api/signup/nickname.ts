import axios from "axios";
import { apiClient } from "../apiClient";

export async function checkNickname(nickname: string) {
  try {
    const response = await axios.post(
      "/auth/nicknameCheck",
      { nickname },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("닉네임 중복검증 api response : ", response);
    return response;
  } catch (error) {
    console.log("닉네임 중복검증 api 오류", error);
  }
}
