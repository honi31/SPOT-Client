import { useEffect } from "react";
import ChatRoomList from "../components/Chat/ChatRoomList";
import NavBar from "../components/Nav/NavBar";
import { useAuth } from "../context/AuthContext";
import { getWishList } from "../api/like/getWishList";
import MyLikeList from "../components/Like/MyLikeList";

export default function Like() {
  const { isLoggedIn, logout } = useAuth();

  // useEffect(() => {
  //   const fetchLikeList = async () => {
  //     try {
  //       const response = await getWishList();
  //       console.log(response);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchLikeList();
  // }, []);

  return (
    <>
      {isLoggedIn ? (
        <div className="flex flex-col max-h-screen">
          <div className="bg-emerald-500 flex w-full h-14 sticky top-0 z-40 justify-center items-center">
            <span className="items-center text-[22px] font-semibold text-neutral-100">
              내 찜 목록
            </span>
          </div>

          <MyLikeList />
          <NavBar />
        </div>
      ) : (
        <div>로그인이 필요한 서비스입니다.</div>
      )}
    </>
  );
}
