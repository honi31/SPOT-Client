import { dividerClasses } from "@mui/material";

export default function MainContent() {
  const skeletonArray = Array(20).fill(0);
  return (
    <>
      <div className="flex flex-col justify-between p-5 w-full min-h-screen mb-16">
        <div className="flex flex-col gap-3">
          <h4 className="text-[22px] font-bold">전체 인기순 👍</h4>
          <div className="flex overflow-x-auto gap-4">
            {skeletonArray.map((_, index) => (
              <div
                key={index}
                className="flex-shrink-0 border border-gray-400 shadow-lg p-3 bg-white rounded-md"
                style={{ width: "150px" }}
              >
                <div className="w-full h-32 bg-gray-300 animate-pulse rounded-md"></div>
                <div className="mt-2">
                  <p className="text-sm font-semibold text-gray-700">
                    상품 제목 {index + 1}
                  </p>
                  <p className="text-sm text-gray-500">20,000원</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="text-[22px] font-bold">우리 학과에서 hot한 상품 🔥</h4>
          <div className="flex overflow-x-auto gap-4">
            {skeletonArray.map((_, index) => (
              <div
                key={index}
                className="flex-shrink-0 border border-gray-400 shadow-lg p-3 bg-white rounded-md"
                style={{ width: "150px" }}
              >
                <div className="w-full h-32 bg-gray-300 animate-pulse rounded-md"></div>
                <div className="mt-2">
                  <p className="text-sm font-semibold text-gray-700">
                    상품 제목 {index + 1}
                  </p>
                  <p className="text-sm text-gray-500">1,500원</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="text-[22px] font-bold">나의 찜 리스트 💚</h4>
          <div className="flex overflow-x-auto gap-4">
            {skeletonArray.map((_, index) => (
              <div
                key={index}
                className="flex-shrink-0 border border-gray-400 shadow-lg p-3 bg-white rounded-md"
                style={{ width: "150px" }}
              >
                <div className="w-full h-32 bg-gray-300 animate-pulse rounded-md"></div>
                <div className="mt-2">
                  <p className="text-sm font-semibold text-gray-700">
                    상품 제목 {index + 1}
                  </p>
                  <p className="text-sm text-gray-500">15,000원</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
