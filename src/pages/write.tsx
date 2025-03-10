import WriteForm from "../components/Write/WriteForm";
import { useAuth } from "../context/AuthContext";
import { createPost } from "../api/write/createPost";

export default function Write() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <>
      {isLoggedIn ? (
        <div className="w-full flex flex-col min-h-screen p-6">
          <header className="w-full bg-white border-b border-gray-300 py-4 text-center text-black font-semibold text-2xl fixed top-0 left-0 z-10">
            <h2>글 작성하기</h2>
          </header>

          <div className="flex-grow w-full py-6 pt-12">
            <WriteForm />
          </div>
        </div>
      ) : (
        <div>로그인이 필요한 서비스입니다.</div>
      )}
    </>
  );
}
