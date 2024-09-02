import { UserIcon } from "@heroicons/react/24/outline";
import MannerScoreBar from "../User/MannerScoreBar";

export default function Profile() {
  return (
    <div className="flex flex-col">
      <div className="m-4 *:p-1">
        <h2 className="text-xl font-semibold">내 프로필</h2>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center w-48 h-40 border p-2 rounded-xl shadow-md">
          <div className="border rounded-full mb-2">
            <UserIcon className="size-12 text-gray-500" />
          </div>
          <span className="font-semibold text-lg">호니</span>

          <span className="text-md text-gray-600">한국외대 글로벌캠퍼스</span>
          <span className="text-md text-gray-600">컴퓨터공학과 21학번</span>
        </div>
      </div>
      <div className="m-4 *:p-1">
        <h2 className="text-xl font-semibold">매너학점</h2>
      </div>
      <div className="flex flex-col">
        <span className="flex justify-end mr-8 text-xl font-semibold">3.5</span>
        <MannerScoreBar score={3.5} />
      </div>
    </div>
  );
}
