import React, { useState, useEffect, useRef } from "react";

export default function ChatMessageList({
  nickname,
  chatting,
  time,
  isMe,
}: any) {
  const [chatNick, setChatNick] = useState("");

  useEffect(() => {
    setChatNick(isMe ? "나" : nickname);
  }, [isMe, nickname]);

  return (
    <div>
      {isMe ? (
        <div className="flex justify-end my-5">
          <div className="flex flex-col justify-end mr-3">
            <p className="text-xs text-gray-600">{time}</p>
          </div>
          <div className="mr-3">
            <div className="flex justify-end">
              <p className="text-xs text-gray-500">{chatNick}</p>
            </div>
            <div className="p-3 bg-emerald-500 rounded-md mt-2">
              <span className="text-xs text-gray-50">{chatting}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex my-5">
          <div className="ml-3">
            <p className="text-xs text-gray-500">{chatNick}</p>
            <div className="p-3 bg-gray-300 rounded-md mt-2">
              <span className="text-xs text-black">{chatting}</span>
            </div>
          </div>
          <div className="flex flex-col justify-end ml-3">
            <p className="text-xs text-black">{time}</p>
          </div>
        </div>
      )}
    </div>
  );
}
