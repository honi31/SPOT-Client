import React, { useState, useEffect, useRef } from "react";
import { ArrowUpCircleIcon } from "@heroicons/react/24/solid";
import { Client, StompHeaders } from "@stomp/stompjs";
import { useAuth } from "../context/AuthContext";
import { createChatRoom } from "../api/chat/chat";
import { useParams } from "react-router-dom";
import ProductCard from "../components/Chat/ProductCard";

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

function formatToTimeAgo(date: string): string {
  const diff = (new Date().getTime() - new Date(date).getTime()) / 1000;
  if (diff < 60) return "방금";
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  return `${Math.floor(diff / 86400)}일 전`;
}

export default function Chat() {
  const { id } = useParams<{ id: string }>();
  const { isLoggedIn } = useAuth();
  const [roomId, setRoomId] = useState<number>(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const client = useRef<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const fetchRoomId = async () => {
      try {
        const response = await createChatRoom(Number(id));
        if (response?.data?.roomId) {
          setRoomId(response.data.roomId);
        } else {
          console.error("roomId가 응답에 없습니다.");
        }
      } catch (error) {
        console.error("채팅방 생성 실패:", error);
      }
    };

    fetchRoomId();
  }, [id]);

  const connect = () => {
    client.current = new Client({
      brokerURL: "/ws",
      connectHeaders: {
        login: "guest",
        passcode: "guest",
      },
      debug: (str) => console.log(str),
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,

      onConnect: () => {
        console.log("웹소켓 연결 성공");
        setIsConnected(true); // 연결 상태 업데이트
        subscribe(); // 연결 후에 구독 시작
      },

      onStompError: (frame) => {
        console.error("STOMP 오류:", frame);
        setIsConnected(false);
      },
    });

    client.current.activate();
  };

  const subscribe = () => {
    if (!client.current || !roomId) return;

    const subscription = client.current.subscribe(
      `/sub/room/${roomId}`,
      (message) => {
        const newMessage: Message = JSON.parse(message.body);
        console.log("새 메시지 도착:", newMessage);
        setMessages((prevMessages) => [...prevMessages, newMessage]); // 메시지 추가
      }
    );

    console.log(`구독 완료: /sub/room/${roomId}`);

    return () => subscription.unsubscribe(); // 구독 해제 함수 반환
  };

  useEffect(() => {
    if (!roomId || isConnected) return; // 이미 연결된 경우 재연결 방지

    connect(); // WebSocket 연결 시작

    return () => {
      if (client.current) {
        client.current.deactivate(); // WebSocket 연결 해제
      }
    };
  }, [roomId]);

  // disconnect 함수
  const disconnect = () => {
    if (client.current) {
      client.current.deactivate();
    }
  };

  const publish = (noteContent: string) => {
    if (!client.current || !roomId) {
      console.error("클라이언트 또는 roomId가 없습니다.");
      return;
    }

    client.current.publish({
      destination: `/pub/room/${roomId}`,
      body: JSON.stringify({ payload: noteContent, userId: 1 }), // 필요한 데이터 JSON 형태로 전송
    });

    console.log("메시지 발행:", noteContent);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) {
      console.error("STOMP 연결이 설정되지 않았습니다.");
      return;
    }
    publish(message);
    setMessage(""); // 입력 초기화
  };

  return (
    <>
      {isLoggedIn ? (
        <div className="h-screen flex flex-col">
          <div className="flex-shrink-0 sticky top-0 z-10">
            <ProductCard />
          </div>

          <div className="flex-grow overflow-y-auto p-5 flex flex-col gap-5">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 items-start ${
                  msg.userId === 1 ? "justify-end" : ""
                }`}
              >
                {msg.userId !== 1 && (
                  <img
                    src={msg.user.avatar}
                    alt={msg.user.username}
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <div
                  className={`flex flex-col gap-1 ${
                    msg.userId === 1 ? "items-end" : ""
                  }`}
                >
                  <span
                    className={`p-2.5 rounded-md ${
                      msg.userId === 1
                        ? "bg-gray-500 text-white"
                        : "bg-emerald-500 text-white"
                    }`}
                  >
                    {msg.payload}
                  </span>
                  <span className="text-xs text-gray-400">
                    {formatToTimeAgo(msg.created_at.toString())}
                  </span>
                </div>
              </div>
            ))}

            <div className="sticky bottom-0 p-2">
              <form className="flex relative" onSubmit={handleSubmit}>
                <input
                  required
                  onChange={handleChange}
                  value={message}
                  className="bg-transparent rounded-full w-full h-10 focus:outline-none p-2 ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-neutral-50 border-none placeholder:text-neutral-400"
                  type="text"
                  placeholder="채팅을 입력해주세요..."
                />
                <button type="submit" className="absolute right-0">
                  <ArrowUpCircleIcon className="w-10 h-10 text-emerald-500 transition-colors hover:text-emerald-300" />
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div>로그인이 필요한 서비스입니다.</div>
      )}
    </>
  );
}
