import { HomeIcon } from "@heroicons/react/24/outline";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
export default function NavBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 flex justify-around py-4 px-1">
      <Link to="/main">
        <HomeIcon className="size-8 text-gray-500" />
      </Link>
      <Link to="/chatlist">
        <ChatBubbleOvalLeftIcon className="size-8 text-gray-500" />
      </Link>
      <Link to="/like">
        <HeartIcon className="size-8 text-gray-500" />
      </Link>
      <Link to="/mypage">
        <UserIcon className="size-8 text-gray-500" />
      </Link>
    </div>
  );
}
