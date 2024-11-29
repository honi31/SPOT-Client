import { UserIcon } from "@heroicons/react/24/outline";

export default function UserProfile() {
  return (
    <div className="flex w-full p-4 gap-4 items-center border rounded-lg shadow-md border-gray-100">
      <div>
        <UserIcon className="size-12 border rounded-full" />
      </div>
      <div className="items-start flex flex-col text-center">
        <span className="text-lg font-bold">호니</span>
        <div className="flex gap-2 text-gray-600">
          <span>한국외대 글로벌캠</span>
          <span>컴공</span>
          <span>21학번</span>
        </div>
      </div>
    </div>
  );
}
