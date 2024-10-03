import { useEffect, useRef, useState } from "react";
import ChatMessagesList from "../components/Chat/ChatMessageList";
import ProductCard from "../components/Chat/ProductCard";
import { useAuth } from "../context/AuthContext";
import { Stomp } from "@stomp/stompjs";
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
  const roomId = 1;
  const { isLoggedIn, logout } = useAuth();
  const stompClient = useRef<any>(null);
  const [message, setMessage] = useState<string>("");
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
    {
      id: 2,
      userId: 2,
      user: {
        id: 2,
        username: "흠",
        avatar: "https://via.placeholder.com/50",
      },
      payload: "싫은데",
      created_at: new Date(new Date().getTime() - 120000),
    },
  ];

  // 웹소켓 연결 및 메시지 구독
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:80/ws");
    stompClient.current = Stomp.over(socket);

    stompClient.current.connect({}, () => {
      // 특정 채팅방에 구독
      stompClient.current.subscribe(
        `/sub/chatroom/${roomId}`,
        (message: any) => {
          const newMessage: Message = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, newMessage]); // 새 메시지를 상태에 추가
        }
      );
    });

    // // 초기 메시지 로드
    // fetchMessages();

    // 컴포넌트 언마운트 시 웹소켓 연결 해제
    return () => {
      if (stompClient.current) {
        stompClient.current.disconnect();
      }
    };
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <div className="h-screen flex flex-col">
          <div className="flex-shrink-0 sticky top-0 z-10">
            <ProductCard />
          </div>

          <div className="flex-grow overflow-y-auto">
            <ChatMessagesList initialMessages={dummyMessages} userId={1} />
          </div>
        </div>
      ) : (
        <div>로그인이 필요한 서비스입니다.</div>
      )}
    </>
  );
}
