// AuthContext.tsx
import React, { createContext, useState, useEffect, useContext } from "react";
import { login as apiLogin, reIssueToken } from "../api/login/login";
import { useNavigate } from "react-router-dom";
import * as StompJs from "@stomp/stompjs";

interface AuthContextType {
  accessToken: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<void>;
  isLoggedIn: boolean;
  clientData: StompJs.Client | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [clientData, setClientData] = useState<StompJs.Client | null>(null);
  const navigate = useNavigate();

  const onConnect = () => {
    const clientData = new StompJs.Client({
      brokerURL: "ws://localhost:8080/ws",
      debug: function (str) {
        console.log(str);
      },
    });
  };

  // 로그인 시 토큰 저장 및 상태 업데이트
  const login = async (username: string, password: string) => {
    try {
      const response = await apiLogin(username, password);
      const newAccessToken = response.headers["access"];

      if (newAccessToken) {
        setAccessToken(newAccessToken);
        localStorage.setItem("accessToken", newAccessToken);
        console.log("Login successful, accessToken:", newAccessToken);
        onConnect();
        navigate("/main");
      } else {
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("아이디나 비밀번호를 다시 확인해주세요!");
    }
  };

  // 로그아웃 처리
  const logout = async () => {
    try {
      setAccessToken(null);
      localStorage.removeItem("accessToken");
      navigate("/login");
      console.log("로그아웃 성공");
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
    }
  };

  // 토큰 재발급
  const refreshAccessToken = async () => {
    try {
      const response = await reIssueToken();
      const newAccessToken = response.headers["access"];

      if (newAccessToken) {
        setAccessToken(newAccessToken);
        localStorage.setItem("accessToken", newAccessToken);
        console.log("Access token refreshed:", newAccessToken);
      } else {
        console.log("토큰 재발급 실패");
      }
    } catch (error) {
      console.error("토큰 재발급 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("accessToken");
    if (savedToken) {
      setAccessToken(savedToken);
    }
  }, []);

  const value = {
    accessToken,
    login,
    logout,
    refreshAccessToken,
    isLoggedIn: !!accessToken,
    clientData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// AuthContext를 쉽게 사용하기 위한 훅
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth는 AuthProvider 내에서만 사용될 수 있습니다.");
  }
  return context;
};
