import { Link, useNavigate } from "react-router-dom";
import { login, reIssueToken } from "../api/login/login";
import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
axios.defaults.withCredentials = true;
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies(["refresh"]);

  async function handleLogin() {
    try {
      const response = await login(username, password);

      let accessToken = response.headers["access"];
      let refreshToken = cookies.refresh;
      console.log("refreshToken", refreshToken);
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken); // 토큰 저장
        console.log("Token saved successfully:", accessToken);
        navigate("/main");
      } else {
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("login failed", error);
      alert("아이디나 비밀번호를 다시 확인해주세요!");
    }
  }

  async function refreshAccessToken() {
    try {
      const refreshToken = cookies.refresh;
      console.log("Refresh token from cookie:", refreshToken);

      if (!refreshToken) {
        console.log("No refresh token found");
        return;
      }

      const response = await reIssueToken();

      const newAccessToken = response.headers["access"];

      if (newAccessToken) {
        localStorage.setItem("accessToken", newAccessToken);
        console.log("Access token refreshed:", newAccessToken);
      } else {
        console.log("Failed to refresh token");
      }
    } catch (error) {
      console.error("Failed to refresh token", error);
    }
  }
  return (
    <div className="w-full flex flex-col items-center min-h-screen p-6">
      <div className="items-center text-black font-semibold text-2xl">
        <h2>로그인</h2>
      </div>

      <div className="mt-20 w-full items-center flex flex-col gap-2 p-3">
        <input
          type="text"
          required
          placeholder="학교 이메일을 입력해주세요"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          className="w-full p-2.5 rounded-md border border-gray-300"
        />
        <input
          type="password"
          required
          placeholder="비밀번호를 입력해주세요"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="w-full p-2.5 rounded-md border border-gray-300"
        />
      </div>
      <div className="flex flex-col w-full gap-2 px-3 py-6">
        <button
          className="w-full font-semibold bg-emerald-500 text-white text-center rounded-md hover:bg-emerald-600 focus:animate-pulse py-2 text-xl"
          onClick={handleLogin}
        >
          로그인
        </button>
        <Link
          to="/register"
          className="w-full font-semibold bg-white border border-emerald-500 text-emerald-500 text-center rounded-md focus:animate-pulse py-2 text-xl"
        >
          회원가입
        </Link>
      </div>
      <div className="flex gap-2 text-sm text-gray-600">
        <span>비밀번호를 잊어버리셨나요?</span>
        <Link
          to="/searchPassword"
          className="hover:underline underline-offset-4"
        >
          비밀번호 찾기
        </Link>
      </div>
    </div>
  );
}
