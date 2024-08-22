import { UserIcon } from "@heroicons/react/24/solid";
import { Link, useParams } from "react-router-dom";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { FaceFrownIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/outline";
export default function DetailProduct() {
  const { id } = useParams<{ id: string }>();
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
        representativePhoto: "/img/csbook.jpeg",
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
        representativePhoto: "/img/benz.png",
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
        representativePhoto: "/img/dubai.jpg",
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
        representativePhoto: "/img/yogurt.jpeg",
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
        representativePhoto: "/favicon.ico",
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
        representativePhoto: "/favicon.ico",
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
        representativePhoto: "/favicon.ico",
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
        representativePhoto: "/favicon.ico",
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
      <header className="w-full border-b flex justify-between">
        <div className="p-5">
          <ChevronLeftIcon className="size-10" />
        </div>
        <div className="p-5">
          <FaceFrownIcon className="size-10" />
        </div>
      </header>
      <div className="flex p-5 gap-3 items-center">
        <div className="size-12 rounded-full items-center">
          <UserIcon className="border rounded-full p-2" />
        </div>
        <div className="items-center justify-center">
          <h3 className="text-lg font-semibold">{post.sellerNickname}님</h3>
          <p className="text-gray-600">{post.createdAt}</p>
        </div>
      </div>
      <div className="px-5 py-3">
        <h1 className="text-2xl font-semibold">{post.title}</h1>
      </div>
      <div className="px-5">
        <p className="text-lg">{post.content}</p>
      </div>
      <div className="p-5">
        <img
          src={post.representativePhoto}
          alt={post.title}
          className="size-50"
        />
      </div>

      <div className="flex justify-end p-5">
        <div className="flex flex-col items-center">
          <HeartIcon className="size-10 text-gray-500" />
          <span className="items-center text-center">{post.likes}</span>
        </div>
      </div>

      <div className="fixed w-full bottom-0 left-0 p-4 px-5 border-t bg-white flex justify-between items-center">
        {post.saleStatus === "판매 완료" ? (
          <span className="text-xl font-bold text-black p-1 py-2">
            {post.saleStatus}
          </span>
        ) : (
          <span className="font-semibold text-xl">
            {formatToWon(post.price)}원
          </span>
        )}

        <Link
          className="bg-emerald-500 p-3 rounded-full text-white font-semibold"
          to="/chat"
        >
          <ChatBubbleOvalLeftEllipsisIcon className="size-9" />
        </Link>
      </div>
    </div>
  );
}
