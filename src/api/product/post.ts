import axios from "axios";
import { apiClient } from "../apiClient";

interface Filters {
  keyword?: string;
  category_id?: number;
  postStatus?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}

export async function getPosts(filters: Filters) {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const params = new URLSearchParams(filters as any); // 필터를 쿼리 파라미터로 변환
    const response = await apiClient.get(`/api/posts/querydsl`, {
      params,
      headers: {
        // 토큰을 Authorization 헤더에 추가
        "Content-Type": "application/json", // Content-Type 설정
      },
    });
    return response.data; // API로부터 받은 데이터 반환
    console.log("전체게시글 반환 api 성공 response ", response);
    return response.data;
  } catch (error) {
    console.log("전체 게시글 반환 api 에러", error);
    throw error;
  }
}

export async function getDetailProduct(postId: number) {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await apiClient.get(`/api/post/${postId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // 토큰을 Authorization 헤더에 추가
        "Content-Type": "application/json", // Content-Type 설정
      },
    });

    return response;
  } catch (error) {
    console.log("상세 게시글 정보 반환 api 에러", error);
    throw error;
  }
}
