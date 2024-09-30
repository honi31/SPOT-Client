import React, { useEffect, useState } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import ReportModal from "../Modal/Report";
import { useLocation, useNavigate } from "react-router-dom";
import { getPosts } from "../../api/product/post";

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
  category: number;
  postStatus: string;
  type: string;
}

interface Filters {
  category_id: number;
}
interface ProductListProps {
  selectedTab: string;
}

export default function ProductList({ selectedTab }: ProductListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [posts, setPosts] = useState<Post[]>([]);
  const [filters, setFilters] = useState<Filters>({
    category_id: 1,
  });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts(filters);
        setPosts(response.content); // 서버로부터 받은 데이터를 상태에 저장
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [filters]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get("category_id");
    const category_id = categoryParam ? parseInt(categoryParam, 10) : 1;

    setFilters({
      category_id, // 카테고리 필터만 설정
    });
  }, [location.search]);
  const handleProductClick = (id: number) => {
    navigate(`/product/${id}`);
  };
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
