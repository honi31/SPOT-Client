export default function ChatRoomList() {
  const chatRooms = [
    {
      id: 1,
      profile: "https://via.placeholder.com/50",
      nickname: "헉충이",
      lastMessage: "가격 좀만 더 깎아줘요",
      newMessages: 2,
    },
    {
      id: 2,
      profile: "https://via.placeholder.com/50",
      nickname: "흠충이",
      lastMessage: "공부하러 나와라",
      newMessages: 0,
    },
    {
      id: 3,
      profile: "https://via.placeholder.com/50",
      nickname: "깡통이",
      lastMessage: "이 상품 팔렸나요?",
      newMessages: 5,
    },
  ];
  return (
    <div className="flex flex-col border p-3 h-screen">
      {chatRooms.map((room) => (
        <div
          key={room.id}
          className="flex items-center justify-between p-2 border-b relative"
        >
          <img
            src={room.profile}
            alt="Profile"
            className="size-10 rounded-full mr-2"
          />
          <div className="flex flex-col flex-1">
            <span className="font-semibold mb-1">{room.nickname}</span>
            <span className="text-gray-400 text-sm">{room.lastMessage}</span>
          </div>
          {room.newMessages > 0 && (
            <div className="bg-emerald-500 text-white size-6 rounded-full flex justify-center items-center text-[14px] absolute right-3 top-1/2 transform -translate-y-1/2">
              {room.newMessages}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
