import axios from "axios";
import { reIssueToken } from "../api/login/login";
import { config } from "process";

export const apiClient = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    // 로컬 스토리지에서 accessToken을 가져와 헤더에 설정
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => {
    // 응답이 성공적일 경우 그대로 반환
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // accessToken이 만료되었을 경우
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // 토큰 재발급 요청 (인자 없이 실행, withCredentials로 쿠키 자동 전송)
        const response = await reIssueToken();

        // 새로운 accessToken 설정
        const newAccessToken = response.headers["access"];
        localStorage.setItem("accessToken", newAccessToken);

        // 원래 요청에 새 토큰으로 Authorization 헤더 설정
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // 재요청
        return apiClient(originalRequest);
      } catch (err) {
        console.error("토큰 재발급 실패:", err);
        // 재발급 실패 시, 로그인 페이지로 리다이렉트 등의 처리를 할 수 있습니다.
      }
    }

    return Promise.reject(error);
  }
);
