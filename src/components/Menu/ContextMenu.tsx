import React, { useState } from "react";

export default function ContextMenu() {
  return (
    <div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto bg-white rounded-xl shadow-lg z-20 *:text-center *:text-lg">
      <div className="">
        <button
          className="w-full p-3 text-gray-800 focus:bg-gray-200 focus:rounded-t-xl"
          onClick={() => console.log("수정")}
        >
          수정
        </button>
        <button
          className="w-full p-3 text-gray-800 focus:bg-gray-200"
          onClick={() => console.log("삭제")}
        >
          삭제
        </button>
        <button
          className="w-full p-3 text-red-500 focus:bg-gray-200 focus:rounded-b-xl"
          onClick={() => console.log("신고")}
        >
          신고
        </button>
      </div>
    </div>
  );
}
