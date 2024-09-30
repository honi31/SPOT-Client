import axios from "axios";

export async function authEmail(email: string) {
  try {
    const response = await axios.post(
      "/auth/findPassword",
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("이메일 인증번호 전송 api response : ", response);
    return response;
  } catch (error) {
    console.log("이메일 인증번호 전송 중 오류 발생 : ", error);
    throw error;
  }
}
