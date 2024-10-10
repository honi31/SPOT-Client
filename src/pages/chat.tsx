import { useEffect, useRef, useState } from "react";
import ChatMessagesList from "../components/Chat/ChatMessageList";
import ProductCard from "../components/Chat/ProductCard";
import { useAuth } from "../context/AuthContext";
import { Stomp } from "@stomp/stompjs";
import { createChatRoom } from "../api/chat/chat";
import { useParams } from "react-router-dom";

interface User {
  id: number;
  username: string;
  avatar: string;
}

interface Message {
  id: number;
  userId: number;
  user: User;
  payload: string;
  created_at: Date;
}
export default function Chat() {
  const { id } = useParams<{ id: string }>();
  const { isLoggedIn, clientData } = useAuth();
  const [roomId, setRoomId] = useState<number>(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const dummyMessages: Message[] = [
    {
      id: 1,
      userId: 1,
      user: {
        id: 1,
        username: "호니",
        avatar: "https://via.placeholder.com/50",
      },
      payload: "요아정 내놔",
      created_at: new Date(new Date().getTime() - 60000),
    },
  ];
  useEffect(() => {
    const fetchRoomId = async () => {
      try {
        const response = await createChatRoom(Number(id));

        // response가 존재하는지 확인
        if (response && response.data && response.data.roomId) {
          setRoomId(response.data.roomId); // 응답에서 roomId 저장
        } else {
          console.error("roomId가 응답에 없습니다.");
        }
      } catch (error) {
        console.error("Chat room 생성 실패:", error);
      }
    };

    fetchRoomId();
  }, [id]);

  return (
    <>
      {isLoggedIn ? (
        <div className="h-screen flex flex-col">
          <div className="flex-shrink-0 sticky top-0 z-10">
            <ProductCard />
          </div>

          <div className="flex-grow overflow-y-auto">
            <ChatMessagesList
              initialMessages={dummyMessages}
              userId={1}
              roomId={roomId}
            />
          </div>
        </div>
      ) : (
        <div>로그인이 필요한 서비스입니다.</div>
      )}
    </>
  );
}
