export default function PostCount() {
  return (
    <div className="text-base font-semibold w-full justify-between h-40 items-cente bg-gray-50 gap-2 pb-2">
      <div className="h-1/2 flex items-center justify-between border-b">
        <span>거래완료된 게시글</span>
        <span className="pr-2">4</span>
      </div>
      <div className="h-1/2 flex items-center justify-between">
        <span>거래중 게시글</span>
        <span className="pr-2">2</span>
      </div>
    </div>
  );
}
