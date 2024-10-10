import React, { useState } from "react";
import { ArrowUpCircleIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../../context/AuthContext";

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

interface ChatMessageListProps {
  initialMessages: Message[];
  userId: number;
  roomId: number;
}

function formatToTimeAgo(date: string): string {
  const diff = (new Date().getTime() - new Date(date).getTime()) / 1000;
  if (diff < 60) return "방금";
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  return `${Math.floor(diff / 86400)}일 전`;
}

export default function ChatMessagesList({
  initialMessages,
  userId,
  roomId,
}: ChatMessageListProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [message, setMessage] = useState("");
  const { clientData } = useAuth();
  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setMessage(event.target.value);
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (message.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        userId: userId,
        user: {
          id: userId,
          username: "You",
          avatar: "https://via.placeholder.com/50",
        },
        payload: message,
        created_at: new Date(),
      };

      setMessages([...messages, newMessage]);

      setMessage("");
    }
  }

  return (
    <div className="p-5 flex flex-col gap-5 h-full justify-end">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex gap-2 items-start ${
            message.userId === userId ? "justify-end" : ""
          }`}
        >
          {message.userId !== userId && (
            <img
              src={message.user.avatar}
              alt={message.user.username}
              className="w-8 h-8 rounded-full"
            />
          )}
          <div
            className={`flex flex-col gap-1 ${
              message.userId === userId ? "items-end" : ""
            }`}
          >
            <span
              className={`${
                message.userId === userId
                  ? "bg-gray-500 text-white"
                  : "bg-emerald-500 text-white"
              } p-2.5 rounded-md`}
            >
              {message.payload}
            </span>
            <span className="text-xs text-gray-400">
              {formatToTimeAgo(message.created_at.toString())}
            </span>
          </div>
        </div>
      ))}
      <div className="sticky bottom-0 p-2">
        <form className="flex relative" onSubmit={onSubmit}>
          <input
            required
            onChange={onChange}
            value={message}
            className="bg-transparent rounded-full w-full h-10 focus:outline-none p-2 ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-neutral-50 border-none placeholder:text-neutral-400"
            type="text"
            name="message"
            placeholder="채팅을 입력해주세요..."
          />
          <button type="submit" className="absolute right-0">
            <ArrowUpCircleIcon className="w-10 h-10 text-emerald-500 transition-colors hover:text-emerald-300" />
          </button>
        </form>
      </div>
    </div>
  );
}
