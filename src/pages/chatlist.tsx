import ChatRoomList from "../components/Chat/ChatRoomList";
import NavBar from "../components/Nav/NavBar";
import { useAuth } from "../context/AuthContext";

export default function ChatList() {
  const { isLoggedIn, logout } = useAuth();
  return (
    <>
      {isLoggedIn ? (
        <div className="flex flex-col max-h-screen">
          <div className="bg-emerald-500 flex w-full h-14 sticky top-0 z-40 justify-center items-center">
            <span className="items-center text-[22px] font-semibold text-neutral-100">
              내 채팅
            </span>
          </div>

          <ChatRoomList />
          <NavBar />
        </div>
      ) : (
        <div>로그인이 필요한 서비스입니다.</div>
      )}
    </>
  );
}
