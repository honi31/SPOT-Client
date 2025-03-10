import { ChevronLeftIcon, UserIcon } from "@heroicons/react/24/outline";
import Profile from "../components/User/UserProfile";
import MannerScoreBar from "../components/User/MannerScoreBar";
import PostCount from "../components/User/PostCount";

export default function userProfile() {
  return (
    <div className="gap-3 flex flex-col">
      <header className="w-full border-b flex items-center relative p-3">
        <div className="absolute left-2">
          <ChevronLeftIcon className="size-9" />
        </div>
        <span className="flex-grow text-center text-lg">프로필</span>
      </header>
      <div className="w-full flex flex-col justify-between gap-10 p-3">
        <Profile />
        <div className="flex flex-col gap-2">
          <p className="text-base font-semibold">매너학점</p>
          <span className="flex justify-end text-lg font-semibold text-emerald-600">
            🌱 3.5
          </span>
          <MannerScoreBar score={3.5} />
        </div>
      </div>
      <div className="flex p-3 gap-2">
        <PostCount />
      </div>
    </div>
  );
}
