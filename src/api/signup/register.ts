import axios from "axios";

export async function signup(
  email: string,
  password: string,
  nickname: string,
  university: string,
  major: string,
  entranceYear: string
) {
  try {
    const response = await axios.post(
      "/auth/join",
      { email, password, nickname, university, major, entranceYear },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("회원가입 api response : ", response);
    return response;
  } catch (error) {
    console.log("회원가입 중 오류 발생 : ", error);
    throw error;
  }
}
