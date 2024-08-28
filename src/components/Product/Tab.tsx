import { useState } from "react";

interface TabProps {
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

export default function Tab({ selectedTab, setSelectedTab }: TabProps) {
  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };
  return (
    <div className="flex justify-center mt-2">
      <button
        className={`flex-1 text-center py-2 ${
          selectedTab === "팝니다" ? "text-emerald-500" : "text-gray-500"
        } font-semibold`}
        onClick={() => handleTabClick("팝니다")}
      >
        팝니다
      </button>
      <button
        className={`flex-1 text-center py-2 ${
          selectedTab === "삽니다" ? "text-emerald-500" : "text-gray-500"
        } font-semibold`}
        onClick={() => handleTabClick("삽니다")}
      >
        삽니다
      </button>
    </div>
  );
}
