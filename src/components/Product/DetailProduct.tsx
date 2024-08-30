import { UserIcon } from "@heroicons/react/24/solid";
import { Link, useParams } from "react-router-dom";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { FaceFrownIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import MannerScoreBar from "../User/MannerScoreBar";

export default function DetailProduct() {
  const { id } = useParams<{ id: string }>();
  const [isWished, setIsWished] = useState(false); // 초기 찜 상태를 false로 설정
  const [likes, setLikes] = useState(0); // 초기 찜 수를 0으로 설정
  const filterPosts = {
    post: [
      {
        id: 1,
        title: "컴공 교재 팔아요.",
        sellerNickname: "호니",
        price: "23,000",
        content: "공학관 앞에서 직거래 원해요 쿨거래" + "\n" + "새상품입니다",
        likes: 2,
        saleStatus: "판매중",
        createdAt: "1분 전",
        category: "book",
        representativePhoto: "/img/csbook.jpeg",
        mannerScore: 3.5,
      },
      {
        id: 2,
        title: "벤츠 E클래스",
        sellerNickname: "깡통이",
        price: "6,300만",
        content: "공학관 앞에서 직거래 원해요 쿨거",
        likes: 2,
        saleStatus: "판매중",
        createdAt: "10분 전",
        category: "electric",
        representativePhoto: "/img/benz.png",
        mannerScore: 2.5,
      },
      {
        id: 3,
        title: "두바이 초콜릿 개당 3500",
        sellerNickname: "헉",
        price: "3,500",
        content: "공학관 앞에서 직거래 원해요 쿨거",
        likes: 12,
        saleStatus: "판매 완료",
        createdAt: "10분 전",
        category: "production",
        representativePhoto: "/img/dubai.jpg",
        mannerScore: 3.5,
      },
      {
        id: 4,
        title: "요아정 기프티콘 팝니다",
        sellerNickname: "흠",
        price: "11,000",
        content: "공학관 앞에서 직거래 원해요 쿨거래" + "\n" + "새상품입니다",
        likes: 7,
        saleStatus: "예약중",
        createdAt: "30분 전",
        category: "etc",
        representativePhoto: "/img/yogurt.jpeg",
        mannerScore: 2.5,
      },
      {
        id: 5,
        title: "공학용 계산기 카시오 ES-1276",
        sellerNickname: "과니",
        price: "10,000",
        content: "공학관 앞에서 직거래 원해요 쿨거",
        likes: 7,
        saleStatus: "판매중",
        createdAt: "30분 전",
        category: "electric",
        representativePhoto: "/favicon.ico",
        mannerScore: 3.5,
      },
      {
        id: 6,
        title: "컴프실 23-2 족보",
        sellerNickname: "익명",
        price: "50,000",
        content: "공학관 앞에서 직거래 원해요 쿨거",
        likes: 7,
        saleStatus: "판매 완료",
        createdAt: "30분 전",
        category: "book",
        representativePhoto: "/favicon.ico",
        mannerScore: 1.5,
      },
      {
        id: 7,
        title: "정유진 교수님 이산수학 교재",
        sellerNickname: "현현준준",
        price: "20,000",
        content: "공학관 앞에서 직거래 원해요 쿨거",
        likes: 0,
        saleStatus: "판매중",
        createdAt: "50분 전",
        category: "book",
        representativePhoto: "/favicon.ico",
        mannerScore: 2.5,
      },
      {
        id: 8,
        title: "얼른 데려가세요~",
        sellerNickname: "미누리",
        price: "5,000",
        content: "공학관 앞에서 직거래 원해요 쿨거",
        likes: 0,
        saleStatus: "판매중",
        createdAt: "1시간 전",
        category: "share",
        representativePhoto: "/favicon.ico",
        mannerScore: 3.5,
      },
    ],
  };

  const post = filterPosts.post.find((p) => p.id === Number(id));
  if (!post) {
    return <div>Product not found</div>;
  }
  const formatToWon = (price: string) => {
    return price.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const isOwner = true;

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
  const translatedCategory = categoryMapping[post.category] || post.category;

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
    //     <p>{post.createdAt}</p>
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
        <div className="p-5 text-2xl font-bold">{translatedCategory}</div>
        <div className="p-5">
          <EllipsisVerticalIcon className="size-10" />
        </div>
      </header>
      <div className="relative aspect-square w-full items-center justify-center">
        <img
          src={post.representativePhoto}
          alt={post.title}
          className="object-cover size-full"
        />
      </div>
      <div className="p-5 flex items-center gap-3 border-b">
        <div className="size-9 rounded-full">
          <UserIcon />
        </div>
        <div className="flex gap-1 items-center">
          <h3 className="text-lg">{post.sellerNickname}님</h3>
          <p className="text-lg">🌱</p>
        </div>
        <div className="flex-grow"></div>
        <div className="flex flex-col text-right">
          <MannerScoreBar score={post.mannerScore} />
          <span className="text-lg text-emerald-800 font-semibold">
            {post.mannerScore}
          </span>
        </div>
      </div>

      <div className="p-5 pb-0">
        <div>
          <h1 className="text-2xl font-semibold">{post.title}</h1>
          <p>{post.createdAt}</p>
        </div>
      </div>
      <div className="px-5 flex justify-end">
        {post.saleStatus === "판매 완료" ? (
          <span className="text-2xl font-bold text-black p-1 py-2 ml-auto">
            {post.saleStatus}
          </span>
        ) : (
          <span className="font-semibold text-2xl ml-auto">
            {formatToWon(post.price)}원
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
