import React, { useEffect, useState } from "react";
import axios from "axios";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import ReportModal from "../Modal/Report";
import { useLocation, useNavigate } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  sellerNickname: string;
  price: string;
  content: string;
  likes: number;
  saleStatus: string;
  createdAt: string;
  representativePhoto: string;
}

export default function ProductList() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filterPosts = {
    post: [
      {
        id: 1,
        title: "컴공 교재 팔아요.",
        sellerNickname: "호니",
        price: "23,000",
        content: "공학관 앞에서 직거래 원해요 쿨거",
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
        content: "공학관 앞에서 직거래 원해요 쿨거",
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

  const handleProductClick = (id: number) => {
    navigate(`/product/${id}`);
  };
  // useEffect(() => {
  //
  //   axios
  //     .get("api/posts")
  //     .then((response) => {
  //
  //       setPosts(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching posts:", error);
  //     });
  // }, []);

  //
  // const filteredPosts = posts.filter((post) => !post.isDeleted);

  const [posts, setPosts] = useState(filterPosts.post);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get("keyword");

    if (searchTerm) {
      const filtered = filterPosts.post.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setPosts(filtered);
    } else {
      setPosts(filterPosts.post); // 검색어가 없을 때 전체 목록을 보여줌
    }
  }, [location.search]);

  return (
    <>
      <div className="mt-4 w-full max-w-screen-sm mx-auto relative">
        {posts.length > 0 ? (
          posts.map((post: Post) => (
            <div
              key={post.id}
              className="flex mb-4 pb-4 border-b-2"
              onClick={() => handleProductClick(post.id)}
            >
              <div className="relative size-24 items-center rounded-md overflow-hidden mx-4">
                <img
                  src={post.representativePhoto}
                  alt="대표 사진"
                  className="size-full"
                />
              </div>
              <div className="flex flex-col gap-1 flex-grow">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold">{post.title}</h3>
                  <div
                    className="size-5 mr-4 z-2"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <EllipsisVerticalIcon className="h-6 w-6 text-gray-500" />
                  </div>
                </div>
                <span className="text-sm text-gray-500">{post.createdAt}</span>

                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-1">
                    {post.saleStatus === "판매 완료" && (
                      <span className="text-xs rounded-md font-semibold bg-gray-500 text-white p-1">
                        {post.saleStatus}
                      </span>
                    )}
                    {post.saleStatus === "예약중" && (
                      <span className="text-xs rounded-md font-semibold bg-emerald-500 text-white p-1">
                        {post.saleStatus}
                      </span>
                    )}
                    <span className="text-md text-gray-500 text-center items-center">
                      {post.sellerNickname}
                    </span>
                    <span className="text-gray-400">|</span>
                    <p className="text-md text-gray-600 font-bold mr-8 text-center items-center">
                      {post.price}원
                    </p>
                  </div>
                  <div className="text-sm text-gray-600 ml-auto mr-4 items-center flex">
                    {" "}
                    <div className="size-5 items-center">
                      <svg
                        data-slot="icon"
                        fill="none"
                        stroke-width="1.5"
                        stroke="red"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                        ></path>
                      </svg>{" "}
                    </div>
                    <span className="text-center items-center ml-1">
                      {" "}
                      {post.likes}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">검색 결과가 없습니다.</div>
        )}
      </div>
      {isModalOpen && <ReportModal setIsModalOpen={setIsModalOpen} />}
    </>
  );
}
