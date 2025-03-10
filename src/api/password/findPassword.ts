import axios from "axios";
import { apiClient } from "../apiClient";

export async function authEmail(email: string) {
  try {
    const response = await apiClient.post("/auth/findPassword", { email });
    console.log("이메일 인증번호 전송 api response : ", response);
    return response;
  } catch (error) {
    console.log("이메일 인증번호 전송 중 오류 발생 : ", error);
    throw error;
  }
}

export async function authCode(email: string, code: string) {
  try {
    const response = await apiClient.post("/auth/verification", {
      email,
      code,
    });
    console.log("이메일 인증코드 확인 api response : ", response);
    return response;
  } catch (error) {
    console.log("이메일 인증코드 확인 오류 발생 : ", error);
    throw error;
  }
}

export async function changePassword(email: string, newPassword: string) {
  try {
    const response = await apiClient.post("/auth/changePassword", {
      email,
      newPassword,
    });
    console.log("비밀번호 찾기 후 변경 api response : ", response);
    return response;
  } catch (error) {
    console.log("비밀번호 찾기 후 변경 오류 발생 : ", error);
    throw error;
  }
}
