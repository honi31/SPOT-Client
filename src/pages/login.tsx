import { Link } from "react-router-dom";

export default function Login() {
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
          className="w-full p-2.5 rounded-md border border-gray-300"
        />
        <input
          type="password"
          required
          placeholder="비밀번호를 입력해주세요"
          className="w-full p-2.5 rounded-md border border-gray-300"
        />
      </div>
      <div className="flex flex-col w-full gap-2 px-3 py-6">
        <Link
          to="/product"
          className="w-full font-semibold bg-emerald-500 text-white text-center rounded-md hover:bg-emerald-600 focus:animate-pulse py-2 text-xl"
        >
          로그인
        </Link>
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
