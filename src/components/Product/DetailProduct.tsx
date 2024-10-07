import { UserIcon } from "@heroicons/react/24/solid";
import { Link, useParams } from "react-router-dom";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { FaceFrownIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import MannerScoreBar from "../User/MannerScoreBar";
import { getDetailProduct } from "../../api/product/post";

export default function DetailProduct() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const [isWished, setIsWished] = useState(false); // 초기 찜 상태를 false로 설정
  const [likes, setLikes] = useState(0); // 초기 찜 수를 0으로 설정

  const handleDetailProduct = async () => {
    try {
      const response = await getDetailProduct(Number(id));
      setPost(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // 컴포넌트가 마운트될 때 handleDetailProduct 호출
  useEffect(() => {
    handleDetailProduct();
  }, [id]); // id가 변경될 때마다 다시 호출

  const formatToWon = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleWishToggle = () => {
    setIsWished(!isWished); // 찜 상태를 토글
    setLikes(isWished ? likes - 1 : likes + 1); // 찜 수를 업데이트
  };
  const categoryMapping: { [key: string]: string } = {
    book: "교재",
    electric: "전자기기",
    etc: "기타",
    production: "생필품",
    share: "나눔",
  };
  // const translatedCategory = categoryMapping[category] || post.category;

  if (!post) {
    // 데이터를 아직 받아오지 않았을 때
    return <div>Loading...</div>;
  }

  return (
    // 당근 버전
    // <div>
    //   <div className="relative aspect-square w-full items-center justify-center">
    //     <img
    //       src={post.representativePhoto}
    //       alt={post.title}
    //       className="object-cover size-full"
    //     />
    //   </div>
    //   <div className="p-5 flex items-center gap-3 border-b">
    //     <div className="size-9 rounded-full">
    //       <UserIcon />
    //     </div>
    //     <div>
    //       <h3 className="text-lg">{post.sellerNickname}님</h3>
    //     </div>
    //   </div>
    //   <div className="p-5">
    //     <h1 className="text-2xl font-semibold">{post.title}</h1>
    //     <p>{post.post_date}</p>
    //   </div>
    //   <div className="px-5 py-4">
    //     <p className="text-lg">{post.content}</p>
    //   </div>
    //   <div className="fixed w-full bottom-0 left-0 p-4 px-5 border-t bg-white flex justify-between items-center">
    //     <span className="font-semibold text-xl">
    //       {formatToWon(post.price)}원
    //     </span>
    //     <Link
    //       className="bg-emerald-500 p-3 rounded-full text-white font-semibold"
    //       to=""
    //     >
    //       <ChatBubbleOvalLeftEllipsisIcon className="size-9" />
    //     </Link>
    //   </div>
    // </div>
    <div>
      <header className="w-full border-b flex justify-between items-center">
        <div className="p-5">
          <ChevronLeftIcon className="size-10" />
        </div>
        {/* <div className="p-5 text-2xl font-bold">{translatedCategory}</div> */}
        <div className="p-5">
          <EllipsisVerticalIcon className="size-10" />
        </div>
      </header>
      <div className="relative aspect-square w-full items-center justify-center">
        <img
          src={post.title}
          alt={post.title}
          className="object-cover size-full"
        />
      </div>
      <div className="p-5 flex items-center gap-3 border-b">
        <div className="size-9 rounded-full">
          <UserIcon />
        </div>
        <div className="flex gap-1 items-center">
          <h3 className="text-lg">{post.userNickname}님</h3>
          <p className="text-lg">🌱</p>
        </div>
        <div className="flex-grow"></div>
        <div className="flex flex-col text-right">
          <MannerScoreBar score={3} />
          <span className="text-lg text-emerald-800 font-semibold">{3}</span>
        </div>
      </div>

      <div className="p-5 pb-0">
        <div>
          <h1 className="text-2xl font-semibold">{post.title}</h1>
          <p>{post.date}</p>
        </div>
      </div>
      <div className="px-5 flex justify-end">
        {post.saleStatus === "판매 완료" ? (
          <span className="text-2xl font-bold text-black p-1 py-2 ml-auto">
            {post.postStatus}
          </span>
        ) : (
          <span className="font-semibold text-2xl ml-auto">
            {formatToWon(post.price)}
          </span>
        )}
      </div>
      <div className="px-5 py-4">
        <p className="text-lg">{post.content}</p>
      </div>

      <div className="fixed w-full bottom-0 left-0 border-t py-2 px-4 bg-white flex justify-between items-center gap-3">
        <div className="flex justify-end border-gray-300 border-2 rounded-md p-2">
          <div className="flex flex-col items-center justify-center">
            <div onClick={handleWishToggle}>
              {isWished ? (
                <SolidHeartIcon className="size-8 text-red-500" />
              ) : (
                <HeartIcon className="size-8 text-gray-500" />
              )}
            </div>
          </div>
        </div>
        <Link
          to="/chat"
          className="w-full h-full flex items-center justify-center font-semibold bg-emerald-500 text-white text-center rounded-md hover:bg-emerald-600 focus:animate-pulse p-2 text-xl"
        >
          <div className="flex justify-center items-center gap-1">
            채팅하기
            <ChatBubbleOvalLeftEllipsisIcon className="size-8 items-center" />
          </div>
        </Link>
      </div>
    </div>
  );
}
