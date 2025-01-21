import { apiClient } from "../apiClient";

export async function downloadImage(filenames: string) {
  try {
    const response = await apiClient.get(`/aws/geturl/${filenames}`);
    console.log("이미지 다운로드 요청 api 성공");
    return response;
  } catch (error) {
    console.log("이미지 다운로드 요청 api 에러", error);
  }
}
