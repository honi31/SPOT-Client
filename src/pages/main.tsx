import { useEffect, useState } from "react";
import Category from "../components/Main/Category";
import Header from "../components/Main/Header";
import MainContent from "../components/Main/Main";
import NavBar from "../components/Nav/NavBar";
import { useAuth } from "../context/AuthContext";
import { getMajorPost } from "../api/home/getMajorPost";

export default function Main() {
  const { isLoggedIn, logout } = useAuth();
  const [posts, setPosts] = useState([]); // 게시글 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await getMajorPost({
          limit: 10,
          startIndex: 0,
          sortBy: "LATEST",
        });
        setPosts(data); // 데이터 설정
      } catch (error) {
        console.error("게시글 데이터 가져오기 실패:", error);
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };

    if (isLoggedIn) {
      fetchPosts();
    }
  }, [isLoggedIn]);
  return (
    <>
      {isLoggedIn ? (
        <div className="flex flex-col min-h-screen">
          <div className="sticky top-0 z-40">
            <Header />
            <Category />
          </div>
          <div className="flex-grow overflow-y-auto">
            <MainContent />
          </div>

          <div className="sticky bottom-0">
            <NavBar />
          </div>
        </div>
      ) : (
        <div>로그인이 필요한 서비스입니다.</div>
      )}
    </>
  );
}
