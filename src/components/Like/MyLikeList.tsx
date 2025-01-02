import React, { useEffect, useState } from "react";
import { getWishList } from "../../api/like/getWishList";
type LikeList = {
  wishId: number;
  postId: number;
  image: string;
  title: string;
  content: string;
  writer: string;
  price: number;
};

export default function MyLikeList() {
  const [likeList, setlikeList] = useState<LikeList[]>([]);

  useEffect(() => {
    const fetchLikeList = async () => {
      try {
        const lists: LikeList[] = await getWishList(); // getWishList에서 response.data만 반환
        setlikeList(lists); // 바로 상태 업데이트
      } catch (err) {
        console.error("찜 목록 조회 실패", err);
      }
    };

    fetchLikeList();
  }, []);

  return (
    <div className="flex flex-col border p-3 h-screen">
      {likeList.length > 0 ? (
        likeList.map((list) => (
          <div
            key={list.wishId}
            className="flex items-center justify-between p-2 border-b relative"
          >
            <img
              src={list.image}
              alt="Profile"
              className="size-10 rounded-full mr-2"
            />
            <div className="flex flex-col flex-1 ml-2">
              <span className="mb-1">{list.title}</span>
              <span className="text-gray-400 text-sm">{list.writer}</span>
              <span className="font-semibold">{list.price}</span>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 p-4">
          찜한 상품이 없습니다.
        </div>
      )}
    </div>
  );
}
