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
        const response = await getWishList();
        if (response && response.data) {
          // API 응답 데이터 매핑
          const lists: LikeList[] = response.data.map((list: any) => ({
            wishId: list.wishId,
            writer: list.writer,
            image: list.image,
            title: list.title,
            content: list.content,
          }));
          setlikeList(lists);
        }
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
            <div className="flex flex-col flex-1">
              <span className="font-semibold mb-1">{list.writer}</span>
              <span className="text-gray-400 text-sm">{list.title}</span>
              <span className="text-gray-400 text-sm">{list.content}</span>
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
