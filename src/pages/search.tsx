import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const handleSearch = () => {
    if (searchInput.trim()) {
      navigate(`/product?keyword=${encodeURIComponent(searchInput)}`);
    }
  };
  console.log(searchInput);
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col gap-5 justify-start relative p-4">
        <input
          required
          onChange={(e) => setSearchInput(e.target.value)}
          className="bg-transparent rounded-full w-full h-11 focus:outline-none px-5 ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-neutral-50 border-none placeholder:text-neutral-400"
          type="text"
          name="message"
          placeholder="제목, 본문 검색 .."
        />
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 items-center p-1"
          onClick={handleSearch}
        >
          <MagnifyingGlassIcon className="size-10 pr-3 text-emerald-500 transition-colors hover:text-emerald-300" />
        </button>
      </div>
      <div className="h-full mb-12 flex flex-col gap-2 items-center justify-center *:text-gray-500">
        <MagnifyingGlassIcon className="size-16 font-bold" />
        <p className="text-xl">원하는 상품을 검색해보세요</p>
      </div>
    </div>
  );
}
