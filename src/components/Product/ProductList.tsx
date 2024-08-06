import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProductList() {
  const [posts, setPosts] = useState([]);
  const post = {
    id: 1,
    title: "컴공 교재 팔아요.",
    sellerNickname: "호니",
    price: "23,000",
    content: "공학관 앞에서 직거래 원해요 쿨거",
    likes: 2,
    saleStatus: "판매중",
    createdAt: "10분 전",
    representativePhoto: "/favicon.ico",
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

  return (
    <div className="flex mt-4 w-full">
      {/* {filteredPosts.map((post) => ( */}
      {/* <div
        key={post.id}
        className="w-full border border-gray-300 rounded-lg shadow-lg"
      > */}
      <div className="relative size-24 items-center rounded-md overflow-hidden mx-4">
        <img
          src={post.representativePhoto}
          alt="대표 사진"
          className="size-full"
        />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-bold">{post.title}</h3>
        <span className="text-sm text-gray-600">{post.createdAt}</span>
        <span className="text-sm text-gray-600">
          {post.saleStatus === "판매 완료" ? post.saleStatus : null}
        </span>{" "}
        <div className="flex gap-2 items-center w-full">
          <span className="text-md text-gray-600 text-center items-center">
            {post.sellerNickname}
          </span>
          <span className="text-gray-500">|</span>
          <p className="text-md text-gray-600 font-bold mr-8 text-center items-center">
            {post.price}원
          </p>
          <div className="text-sm text-gray-600 text-center items-center gap-1 flex">
            {" "}
            <div className="size-5 items-center">
              <svg
                data-slot="icon"
                fill="none"
                stroke-width="1.5"
                stroke="currentColor"
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
            <div className="items-end">
              <span>{post.likes}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}
