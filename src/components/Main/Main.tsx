import { useEffect, useState } from "react";
import { getMajorPost } from "../../api/home/getMajorPost";
import { getWishList } from "../../api/like/getWishList";
import { downloadImage } from "../../api/s3/downloadImage";
import { getFilterPosts } from "../../api/product/post";

type Post = {
  id: number;
  title: string;
  price: number;
  image?: string;
};

export default function MainContent() {
  const skeletonArray = Array(20).fill(0);

  const [posts, setPosts] = useState<Post[]>([]); // 게시글 상태
  const [likeList, setLikeList] = useState<Post[]>([]);
  const [popularPosts, setPopularPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태
  const fetchImage = async (filename: string) => {
    try {
      const response = await downloadImage(filename);
      const values = Object.values(response?.data || {}) as string[];

      return values.length > 0 ? values[0] : "";
    } catch (error) {
      console.error("이미지 다운로드 실패:", error);
      return "";
    }
  };

  useEffect(() => {
    const fetchMajorList = async () => {
      try {
        setLoading(true);
        const response = await getMajorPost({
          limit: 10,
          startIndex: 0,
          sortBy: "LATEST",
        });

        const data = response.posts || [];

        const updatedMajorPosts = await Promise.all(
          data.map(async (post: any) => ({
            id: post.postId,
            title: post.title,
            price: post.price,
            image: post.firstImageUrl
              ? await fetchImage(post.firstImageUrl)
              : "",
          }))
        );
        setPosts(updatedMajorPosts);
      } catch (error) {
        console.error("게시글 데이터 가져오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchLikeList = async () => {
      try {
        setLoading(true);
        const response = await getWishList();
        const updatedLikeList = await Promise.all(
          response.map(async (post: any) => ({
            id: post.postId,
            title: post.title,
            price: post.price,
            image: post.image ? await fetchImage(post.image) : "",
          }))
        );
        setLikeList(updatedLikeList);
      } catch (error) {
        console.error("찜 리스트 불러오기 실패", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchPopularList = async () => {
      try {
        setLoading(true);
        const response = await getFilterPosts({
          limit: 10,
          category: "",
          sortBy: "POPULAR",
        });

        const data = response.posts || [];

        const updatedPopularPosts = await Promise.all(
          data.map(async (post: any) => ({
            id: post.postId,
            title: post.title,
            price: post.price,
            image: post.firstImageUrl
              ? await fetchImage(post.firstImageUrl)
              : "",
          }))
        );
        console.log("인기 게시글 데이터 확인", data);
        setPopularPosts(updatedPopularPosts);
      } catch (error) {
        console.error("인기 게시글 데이터 가져오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPopularList();
    fetchMajorList();
    fetchLikeList();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-between px-5 w-full min-h-screen pt-2 mb-20">
        {/* 전체 인기순 섹션 */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h4 className="text-[20px] font-bold">전체 인기순 👍</h4>
            <p className="text-sm pr-4 text-gray-500 mt-4">더보기</p>
          </div>
          <div className="flex overflow-x-auto gap-4">
            {loading
              ? skeletonArray.map((_, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 border border-gray-400 shadow-lg p-3 bg-white rounded-md"
                    style={{ width: "150px" }}
                  >
                    <div className="w-full h-32 bg-gray-300 animate-pulse rounded-md"></div>
                    <div className="mt-2">
                      <p className="text-sm font-semibold text-gray-700">
                        로딩 중...
                      </p>
                      <p className="text-sm text-gray-500">-</p>
                    </div>
                  </div>
                ))
              : popularPosts.map((post) => (
                  <div
                    key={post.id}
                    className="flex-shrink-0 border border-gray-400 shadow-lg p-3 bg-white rounded-md"
                    style={{ width: "150px" }}
                  >
                    <img
                      src={post.image}
                      alt="인기순  이미지"
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <div className="mt-2">
                      <p className="text-sm font-semibold text-gray-700">
                        {post.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {post.price.toLocaleString()}원
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        </div>

        {/* 우리 학과에서 hot한 상품 섹션 */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h4 className="text-[20px] font-bold">
              우리 학과에서 hot한 상품 🔥
            </h4>
            <p className="text-sm pr-4 text-gray-500 mt-4">더보기</p>
          </div>
          <div className="flex overflow-x-auto gap-4">
            {loading
              ? skeletonArray.map((_, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 border border-gray-400 shadow-lg p-3 bg-white rounded-md"
                    style={{ width: "150px" }}
                  >
                    <div className="w-full h-32 bg-gray-300 animate-pulse rounded-md"></div>
                    <div className="mt-2">
                      <p className="text-sm font-semibold text-gray-700">
                        로딩 중...
                      </p>
                      <p className="text-sm text-gray-500">-</p>
                    </div>
                  </div>
                ))
              : posts.map((post) => (
                  <div
                    key={post.id}
                    className="flex-shrink-0 border border-gray-400 shadow-lg p-3 bg-white rounded-md"
                    style={{ width: "150px" }}
                  >
                    <img
                      src={post.image}
                      alt="전공별 인기 상품 이미지"
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <div className="mt-2">
                      <p className="text-sm font-semibold text-gray-700">
                        {post.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {post.price.toLocaleString()}원
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        </div>

        {/* 나의 찜 리스트 섹션 */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <h4 className="text-[20px] font-bold">나의 찜 리스트 💚</h4>
            <p className="text-sm pr-4 text-gray-500 mt-4">더보기</p>
          </div>
          <div className="flex overflow-x-auto gap-4">
            {loading
              ? skeletonArray.map((_, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 border border-gray-400 shadow-lg p-3 bg-white rounded-md"
                    style={{ width: "150px" }}
                  >
                    <div className="w-full h-32 bg-gray-300 animate-pulse rounded-md"></div>
                    <div className="mt-2">
                      <p className="text-sm font-semibold text-gray-700">
                        로딩 중...
                      </p>
                      <p className="text-sm text-gray-500">-</p>
                    </div>
                  </div>
                ))
              : likeList.map((post) => (
                  <div
                    key={post.id}
                    className="flex-shrink-0 border border-gray-400 shadow-lg p-3 bg-white rounded-md"
                    style={{ width: "150px" }}
                  >
                    <img
                      src={post.image}
                      alt="찜한 상품 이미지"
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <div className="mt-2">
                      <p className="text-sm font-semibold text-gray-700">
                        {post.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {post.price.toLocaleString()}원
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </>
  );
}
