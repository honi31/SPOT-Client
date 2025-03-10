import { apiClient } from "../apiClient";

export async function downloadImage(filenames: string) {
  try {
    const response = await apiClient.get(`/aws/geturl?filenames=${filenames}`);
    console.log("이미지 다운로드 요청 api 성공", response);
    return response;
  } catch (error) {
    console.log("이미지 다운로드 요청 api 에러", error);
  }
}
