import React, { useEffect, useState } from "react";
import { getChatList } from "../../api/chat/chatList"; // getChatList 가져오기
type ChatRoom = {
  roomId: number; // 채팅방 ID
  nickname: string; // 상대 닉네임
  profile: string; // 상대 프로필 사진
  lastMessage: string; // 마지막 채팅 내역
  lastMessageTime: string; // 마지막 채팅 시간
};

export default function ChatRoomList() {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  // API 호출로 채팅방 목록 가져오기
  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await getChatList();
        if (response && response.data) {
          // API 응답 데이터 매핑
          const rooms: ChatRoom[] = response.data.map((room: any) => ({
            roomId: room.roomId,
            nickname: room.nickname,
            profile: room.profile,
            lastMessage: room.lastMessage,
            lastMessageTime: room.lastMessageTime,
          }));
          setChatRooms(rooms);
        }
      } catch (err) {
        console.error("채팅방 목록 조회 실패", err);
      }
    };

    fetchChatRooms();
  }, []);

  return (
    <div className="flex flex-col border p-3 h-screen">
      {chatRooms.length > 0 ? (
        chatRooms.map((room) => (
          <div
            key={room.roomId}
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
            {/* {room.newMessages > 0 && (
              <div className="bg-emerald-500 text-white size-6 rounded-full flex justify-center items-center text-[14px] absolute right-3 top-1/2 transform -translate-y-1/2">
                {room.newMessages}
              </div>
            )} */}
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 p-4">채팅방이 없습니다.</div>
      )}
    </div>
  );
}

//  const chatRooms = [
//     {
//       id: 1,
//       profile: "https://via.placeholder.com/50",
//       nickname: "헉충이",
//       lastMessage: "가격 좀만 더 깎아줘요",
//       newMessages: 2,
//     },
//     {
//       id: 2,
//       profile: "https://via.placeholder.com/50",
//       nickname: "흠충이",
//       lastMessage: "공부하러 나와라",
//       newMessages: 0,
//     },
//     {
//       id: 3,
//       profile: "https://via.placeholder.com/50",
//       nickname: "깡통이",
//       lastMessage: "이 상품 팔렸나요?",
//       newMessages: 5,
//     },
//   ];
