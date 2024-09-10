import axios from "axios";

export async function login(username: string, password: string) {
  try {
    const response = await axios.post(
      "/login",
      { username, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("로그인 api response : ", response);
    return response;
  } catch (error) {
    console.log("로그인 중 오류 발생 : ", error);
    throw error;
  }
}

export async function reIssueToken() {
  try {
    const response = await axios.post("/token/reissue");
    console.log("토큰 재발급 api response:", response);
    return response;
  } catch (error) {
    console.log("토큰 재발급 중 오류 발생 : ", error);
    throw error;
  }
}

export async function logout() {
  try {
    const response = await axios.post("/logout");
    console.log("로그아웃 api response : ", response);
    return response;
  } catch (error) {
    console.log("로그아웃 중 오류 발생 : ", error);
    throw error;
  }
}
