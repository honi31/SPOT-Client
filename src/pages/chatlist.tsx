import ChatRoomList from "../components/Chat/ChatRoomList";
import NavBar from "../components/Nav/NavBar";

export default function ChatList() {
  return (
    <div className="flex flex-col max-h-screen">
      <div className="bg-emerald-500 flex w-full h-14 sticky top-0 z-40 justify-center items-center">
        <span className="items-center text-[22px] font-semibold text-neutral-100">
          내 채팅
        </span>
      </div>

      <ChatRoomList />
      <NavBar />
    </div>
  );
}
