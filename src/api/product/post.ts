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

export async function getAllPosts(filters: Filters) {
  try {
    const response = await apiClient.get(`/api/posts/`, {
      headers: {
        // 토큰을 Authorization 헤더에 추가
        "Content-Type": "application/json", // Content-Type 설정
      },
    });
    console.log("전체게시글 반환 api 성공 response ", response);
    return response.data; // API로부터 받은 데이터 반환
  } catch (error) {
    console.log("전체 게시글 반환 api 에러", error);
    throw error;
  }
}

// 살래요/팔래요 게시글 리스트 반환 API
export async function getPurposePosts({
  limit,
  lastPostId,
  postFor,
}: {
  limit: number;
  lastPostId?: number;
  postFor: string;
}) {
  try {
    const params = { limit, lastPostId, postFor };
    const response = await apiClient.get(`/api/posts/purpose`, {
      params,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("살래요/팔래요 게시글 반환 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("살래요/팔래요 게시글 반환 실패:", error);
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
