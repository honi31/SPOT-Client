export default function MainContent() {
  const skeletonArray = Array(20).fill(0);
  return (
    <div>
      <div className="flex flex-col gap-1 m-4">
        <h1 className="text-5xl font-bold">SPOT 🎓</h1>
        <h3 className="text-2xl font-bold">Student Place of Trade</h3>
        <div className="size-40 items-end ml-56">
          <svg
            data-slot="icon"
            fill="none"
            stroke-width="1.5"
            stroke="gray"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            ></path>
          </svg>
        </div>
      </div>
      <hr />

      <div className="flex flex-col justify-between gap-6 p-5">
        <div className="flex flex-col gap-3">
          <h4 className="text-[22px] font-bold">전체 인기순 👍</h4>
          <div className="flex overflow-x-auto gap-2">
            {skeletonArray.map((_, index) => (
              <div
                key={index}
                className="size-20 flex-shrink-0 border-black border bg-gray-300 animate-pulse rounded-md"
              ></div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="text-[22px] font-bold">우리 학과에서 hot한 상품 🔥</h4>
          <div className="flex overflow-x-auto gap-2">
            {skeletonArray.map((_, index) => (
              <div
                key={index}
                className="size-20 flex-shrink-0 border-black border bg-gray-300 animate-pulse rounded-md"
              ></div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="text-[22px] font-bold">나의 찜 리스트 💚</h4>
          <div className="flex overflow-x-auto gap-2">
            {skeletonArray.map((_, index) => (
              <div
                key={index}
                className="size-20 flex-shrink-0 border-black border bg-gray-300 animate-pulse rounded-md"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
