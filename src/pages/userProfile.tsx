import { ChevronLeftIcon, UserIcon } from "@heroicons/react/24/outline";

export default function userProfile() {
  return (
    <div>
      <header className="w-full border-b flex items-center relative p-3">
        <div className="absolute left-2">
          <ChevronLeftIcon className="size-9" />
        </div>
        <span className="flex-grow text-center text-lg">프로필</span>
      </header>
      <div className="flex">
        <div>
          <UserIcon className="size-9" />
        </div>
        <span>호니</span>
      </div>
    </div>
  );
}
