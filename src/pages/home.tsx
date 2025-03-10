import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-emerald-500 flex flex-col items-center justify-between min-h-screen p-6">
      <div className="flex flex-col my-auto items-center">
        <span className="text-7xl">🎓</span>
        <span className="text-6xl text-white font-serif font-bold">SPOT</span>
      </div>
      <div className="flex flex-col items-center gap-3 w-full">
        <Link
          to="/register"
          className="w-full font-semibold bg-white text-emerald-600 text-center rounded-md hover:bg-gray-100 focus:animate-pulse py-3 text-xl"
        >
          시작하기
        </Link>
        <div className="flex gap-2 text-white">
          <span>이미 계정이 있나요?</span>
          <Link
            to="/login"
            className="hover:underline underline-offset-4 text-white focus:underline"
          >
            로그인 하러가기
          </Link>
        </div>
      </div>
    </div>
  );
}
