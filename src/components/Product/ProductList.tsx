import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getFilterPosts, getPurposePosts } from "../../api/product/post";

interface Post {
  postId: number;
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

interface ProductListProps {
  selectedTab: string;
}

export default function ProductList({ selectedTab }: ProductListProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [lastPostId, setLastPostId] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // 데이터 요청 중 상태임

  const observerRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // 카테고리 추출
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category") || "";

  // 게시글 가져오기
  const fetchPosts = async (isInitialLoad = false) => {
    if (isLoading || (!hasMore && !isInitialLoad)) return;

    setIsLoading(true);

    try {
      let response: { posts: Post[]; hasNext: boolean };

      if (!category) {
        // 전체 카테고리일 때 getPurposePosts 호출
        response = await getPurposePosts({
          limit: 10,
          lastPostId: isInitialLoad ? undefined : lastPostId ?? undefined,
          postFor: selectedTab === "팔래요" ? "SALE" : "PURCHASE",
        });
      } else {
        // 특정 카테고리 선택 시 getFilterPosts 호출
        response = await getFilterPosts({
          limit: 10,
          lastPostId: isInitialLoad ? undefined : lastPostId ?? undefined,
          postFor: selectedTab === "팔래요" ? "SALE" : "PURCHASE",
          category,
        });
      }

      console.log("게시글 리스트 불러오기 API 응답:", response);

      if (isInitialLoad) {
        setPosts(response.posts || []);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...(response.posts || [])]);
      }

      setLastPostId(
        response.posts?.length > 0
          ? response.posts[response.posts.length - 1].postId
          : null
      );
      setHasMore(response.hasNext ?? false);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };
  // 탭 변경 시 상태 초기화
  useEffect(() => {
    setPosts([]); // 기존 게시글 초기화
    setLastPostId(null); // lastPostId 초기화
    setHasMore(true); // hasMore 초기화
    setIsLoading(false); // 로딩 상태 초기화
    fetchPosts(true); // 첫 데이터 가져오기
  }, [selectedTab, location.search]);

  // IntersectionObserver 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !isLoading) {
          fetchPosts(); // 마지막 요소에 도달하면 다음 데이터를 가져옵니다.
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [hasMore, isLoading]);

  const handleProductClick = (id: number) => {
    navigate(`/product/${id}`);
  };

  return (
    <>
      <div className="mt-4 w-full max-w-screen-sm mx-auto relative">
        {posts?.length > 0 ? (
          posts.map((post: Post) => (
            <div
              key={post.postId}
              className="flex mb-4 pb-4 border-b-2"
              onClick={() => handleProductClick(post.postId)}
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
                </div>
                <span className="text-sm text-gray-500">{post.createdAt}</span>
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-1">
                    <span className="text-md text-gray-500 text-center items-center">
                      {post.sellerNickname}
                    </span>
                    <p className="text-md text-gray-600 font-bold mr-8 text-center items-center">
                      {post.price}원
                    </p>
                  </div>
                  <span className="text-sm text-gray-600">{post.likes}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">검색 결과가 없습니다.</div>
        )}
      </div>
      <div ref={observerRef} style={{ height: "1px" }} />
      {isLoading && <div className="text-center text-gray-500">로딩 중...</div>}
    </>
  );
}
