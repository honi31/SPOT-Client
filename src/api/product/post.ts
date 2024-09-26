import axios from "axios";

export async function getPosts() {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const response = await axios.get("/api/posts", {
      headers: {
        Authorization: `Bearer ${accessToken}`, // 토큰을 Authorization 헤더에 추가
        "Content-Type": "application/json",
      },
    });
    console.log("전체게시글 반환 api 성공 response ", response);
    return response.data;
  } catch (error) {
    console.log("전체 게시글 반환 api 에러", error);
    throw error;
  }
}
