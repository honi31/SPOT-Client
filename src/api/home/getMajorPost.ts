import { apiClient } from "../apiClient";

type SortBy = "LATEST" | "POPULAR";

interface GetMajorPostParams {
  limit: number; // 한 번에 가져올 게시글 수
  startIndex?: number; // 가져올 게시글 시작 인덱스 (기본값 0)
  sortBy?: SortBy; // 정렬 기준 ("LATEST" 또는 "POPULAR")
}

export async function getMajorPost(params: GetMajorPostParams) {
  try {
    // 기본값 처리
    const { limit, startIndex = 0, sortBy = "LATEST" } = params;

    // GET 요청 전송
    const response = await apiClient.get("/api/post/feed/major", {
      params: {
        limit,
        startIndex,
        sortBy,
      },
    });

    return response.data; // 데이터 반환
  } catch (error) {
    console.error("전공별 게시글 목록 조회 실패:", error);
    throw error; // 에러를 상위로 전달
  }
}
