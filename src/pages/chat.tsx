import React, { useState, useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import { useAuth } from "../context/AuthContext";
import { createChatRoom } from "../api/chat/chat";
import { useParams } from "react-router-dom";
import ProductCard from "../components/Chat/ProductCard";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";

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
  const { isLoggedIn } = useAuth();
  const [roomId, setRoomId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [isConnected, setIsConnected] = useState(false);
  const client = useRef<Client | null>(null);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    // 채팅방 생성
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
    connect();
  }, [roomId]);

  const connect = () => {
    try {
      // Client 객체 생성 및 설정
      const client = new Client({
        brokerURL: "/ws",
        debug: (str) => {
          console.log(str); // 디버그 로깅
        },
        reconnectDelay: 5000, // 자동 재연결 대기 시간 (밀리초)
        heartbeatIncoming: 4000, // 서버->클라이언트 핑 (밀리초)
        heartbeatOutgoing: 4000, // 클라이언트->서버 핑 (밀리초)
      });

      // 이벤트 핸들러 등록
      client.onConnect = () => {
        console.log("WebSocket connected!");
      };

      client.onStompError = (frame) => {
        console.error("Broker reported error:", frame.headers["message"]);
        console.error("Additional details:", frame.body);
      };

      // 연결 활성화
      client.activate();
    } catch (err) {
      console.log("Connection error:", err);
    }
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
    // publish(message);
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
