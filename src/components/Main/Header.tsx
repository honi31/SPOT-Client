import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { useNavigate } from "react-router-dom";
export default function Header() {
  const navigate = useNavigate();

  const navigateToSearch = () => {
    navigate("/search");
  };
  return (
    <div className="bg-emerald-500 w-full h-16 flex justify-between items-center">
      <div className="items-center p-4 text-2xl font-bold text-white font-serif">
        SPOT
      </div>
      <div className="flex items-center mr-4">
        <MagnifyingGlassIcon
          className="w-8 h-16 text-white"
          onClick={navigateToSearch}
        />
      </div>
    </div>
  );
}
