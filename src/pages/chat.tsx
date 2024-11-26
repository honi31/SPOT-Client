import React, { useState, useEffect, useRef } from "react";
import { Client, IMessage } from "@stomp/stompjs";
import { useAuth } from "../context/AuthContext";
import { createChatRoom } from "../api/chat/chat";
import { useParams } from "react-router-dom";
import ProductCard from "../components/Chat/ProductCard";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import ChatMessageList from "../components/Chat/ChatMessageList";

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

interface Chatting {
  id: number;
  nickname: string;
  profile: string;
  chatting: string;
  time: string;
  isMe: boolean;
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

  const [chattings, setChattings] = useState<Chatting[]>([]);
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
  }, []);

  useEffect(() => {
    if (roomId) {
      connect();
    }
  }, [roomId]);

  const connect = () => {
    try {
      // Client 객체 생성 및 설정
      const stompClient = new Client({
        brokerURL: "ws://localhost:8080/ws",
        debug: (str) => {
          console.log("STOMP Debug:", str);
        },

        connectHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },

        reconnectDelay: 5000, // 자동 재연결 대기 시간 (밀리초)
        heartbeatIncoming: 4000, // 서버->클라이언트 핑 (밀리초)
        heartbeatOutgoing: 4000, // 클라이언트->서버 핑 (밀리초)
      });

      // 이벤트 핸들러 등록
      // 연결 성공
      stompClient.onConnect = () => {
        console.log("WebSocket connected!");
        setIsConnected(true);

        try {
          // 채팅방 구독
          stompClient.subscribe(`/sub/room/${roomId}`, (message: IMessage) => {
            const receivedMessage = JSON.parse(message.body);
            const newChat = {
              id: receivedMessage.id,
              nickname: receivedMessage.user.username,
              profile: receivedMessage.user.avatar || "default",
              chatting: receivedMessage.payload,
              time: new Date(receivedMessage.created_at).toLocaleTimeString(),
              isMe: receivedMessage.userId === 1, // 본인 여부 판단 로직 (수정 가능)
            };

            setChattings((prevChattings) => [...prevChattings, newChat]);
          });
          console.log(`Successfully subscribed to /sub/room/${roomId}`);
        } catch (subError) {
          console.error("Failed to subscribe to the channel:", subError);
        }
      };

      stompClient.onStompError = (frame) => {
        console.error("Broker reported error:", frame.headers["message"]);
        console.error("Additional details:", frame.body);
      };

      // 연결 활성화
      stompClient.activate();
      client.current = stompClient;
    } catch (err) {
      console.log("Connection error:", err);
    }
  };

  const publishMessage = (content: string) => {
    if (client.current && client.current.connected) {
      client.current.publish({
        destination: `/pub/room/${roomId}`,
        body: JSON.stringify({ noteContent: content }),
      });
    } else {
      console.error("STOMP 클라이언트가 연결되지 않았습니다.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      publishMessage(message);

      // 로컬에서 전송 메시지 즉시 반영
      setChattings((prev) => [
        ...prev,
        {
          id: Date.now(), // 임시 ID
          nickname: "나",
          profile: "default_avatar",
          chatting: message,
          time: new Date().toLocaleTimeString(),
          isMe: true,
        },
      ]);
      setMessage(""); // 입력 초기화
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <div className="h-screen flex flex-col">
          <div className="flex-shrink-0 sticky top-0 z-10">
            <ProductCard />
          </div>

          <div className="flex-grow overflow-y-auto p-5">
            {/* {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 items-end ${
                  msg.userId === 1 ? "justify-end" : ""
                }`}
              >
                {msg.userId !== 1 && (
                  // <img
                  //   src={msg.user.avatar}
                  //   alt={msg.user.username}
                  //   className="w-8 h-8 rounded-full"
                  // />
                  <div></div>
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
            ))} */}
            {chattings.map(({ id, nickname, chatting, time, isMe }) => (
              <ChatMessageList
                key={id}
                nickname={nickname}
                chatting={chatting}
                time={time}
                isMe={isMe}
              />
            ))}
          </div>
          <div className="fixed bottom-0 left-0 items-center w-full bg-white p-2 z-20 pb-4 px-4">
            <form
              className="flex w-full items-center gap-2 relative"
              onSubmit={handleSubmit}
            >
              <input
                required
                onChange={handleChange}
                value={message}
                className="flex-grow bg-gray-100 rounded-full h-11 focus:outline-none p-2 ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-neutral-50 border-none placeholder:text-neutral-400"
                type="text"
                placeholder="채팅을 입력해주세요..."
              />
              <button
                type="submit"
                className="absolute right-1 top-1/2 transform -translate-y-1/2"
              >
                <ArrowUpCircleIcon className="w-11 h-11 text-emerald-500 transition-colors hover:text-emerald-300" />
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div>로그인이 필요한 서비스입니다.</div>
      )}
    </>
  );
}
