import { UserIcon } from "@heroicons/react/24/solid";
import { useNavigate, useParams } from "react-router-dom";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import MannerScoreBar from "../User/MannerScoreBar";
import { getDetailProduct } from "../../api/product/post";
import { addWish } from "../../api/like/addWish";
import { cancelWish } from "../../api/like/cancelWish";
import { createChatRoom } from "../../api/chat/chat";
import { enterChat } from "../../api/chat/enterChat";
import ContextMenu from "../Menu/ContextMenu";
import { downloadImage } from "../../api/s3/downloadImage";
import { updateStatus } from "../../api/product/updateStatus";

export default function DetailProduct() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const [isWished, setIsWished] = useState(false); // 초기 찜 상태를 false로 설정
  const [likes, setLikes] = useState(0); // 초기 찜 수를 0으로 설정
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [writerId, setWriterId] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 메뉴 열림 상태 관리
  const [isAuthor, setIsAuthor] = useState(false); // 작성자인지 여부
  const [filenames, setFilenames] = useState<string[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]); // 다운로드한 이미지 URL
  const [status, setStatus] = useState("판매중");

  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    try {
      const newStatus = e.target.value;
      setStatus(newStatus);
      const response = await updateStatus(Number(id), newStatus);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();

  // 상품 상세 정보 가져오기
  const handleDetailProduct = async () => {
    try {
      const response = await getDetailProduct(Number(id));
      setPost(response.data);
      setWriterId(response.data.writerId);
      setIsAuthor(response.data.isAuthor);
      setFilenames(response.data.images || []);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  // 컴포넌트가 마운트될 때 handleDetailProduct 호출
  useEffect(() => {
    handleDetailProduct();
  }, [id]); // id가 변경될 때마다 다시 호출

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // 모든 filenames에 대해 다운로드 요청
        const allUrls = await Promise.all(
          filenames.map(async (filename) => {
            const response = await downloadImage(filename);
            const values = Object.values(response?.data || {}) as string[];

            return values;
          })
        );

        const urls = allUrls.flat();

        setImageUrls(urls.filter((url) => url));
      } catch (error) {
        console.error("이미지 다운로드 실패:", error);
      }
    };
    fetchImages();
  }, [filenames]);

  const handleWishToggle = async () => {
    if (loading) return; // 중복 클릭 방지
    setLoading(true);

    try {
      if (isFavorite) {
        await cancelWish(Number(id));
      } else {
        await addWish(Number(id));
      }
      setIsFavorite(!isFavorite); // 찜 상태 업데이트
    } catch (error) {
      console.error("찜 상태 업데이트 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatToWon = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

  const toProfile = () => {
    navigate(`/userProfile/${writerId}`);
  };

  const handleChat = async () => {
    try {
      // 채팅방 생성 또는 기존 채팅방 입장 로직
      const response = await createChatRoom(Number(id));
      if (response?.data?.roomId) {
        navigate(`/chat/${response.data.roomId}`); // 채팅방으로 이동
      } else {
        // 만약 createChatRoom 실패 시 기존 채팅방으로 입장 시도
        const existingRoom = await enterChat(Number(id));
        if (existingRoom?.data?.roomId) {
          navigate(`/chat/${existingRoom.data.roomId}`); // 기존 채팅방으로 이동
        } else {
          console.error("채팅방 정보를 찾을 수 없습니다.");
        }
      }
    } catch (error) {
      console.error("채팅 연결 실패:", error);
    }
  };

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <div>
      <header className="w-full border-b flex justify-between items-center">
        <div className="p-5">
          <ChevronLeftIcon className="size-10" />
        </div>
        {/* <div className="p-5 text-2xl font-bold">{translatedCategory}</div> */}
        <div className="p-5">
          <EllipsisVerticalIcon
            className="size-10 cursor-pointer"
            onClick={handleMenuToggle} // 메뉴 토글
          />
        </div>
      </header>
      <div className="relative aspect-square w-full items-center justify-center">
        {imageUrls.length > 0 ? (
          imageUrls.map((url, index) => (
            <div
              key={index}
              className="relative aspect-square w-full items-center justify-center"
            >
              <img
                src={url}
                alt={`상품 이미지 ${index + 1}`}
                className="object-cover w-full rounded-lg h-full"
              />
            </div>
          ))
        ) : (
          <div>이미지를 불러오는 중입니다...</div>
        )}
      </div>
      <div className="p-5 flex items-center gap-3 border-b">
        <div onClick={toProfile} className="size-9 rounded-full">
          <UserIcon />
        </div>
        <div className="flex gap-1 items-center">
          <h3 className="text-lg">{post.userNickname}님</h3>
        </div>

        <div className="flex-grow"></div>
        <div className="flex flex-col text-right w-20 justify-center">
          <MannerScoreBar score={3.5} />
          <span className="text-lg text-emerald-800 font-semibold">
            {3.5} 🌱
          </span>
        </div>
      </div>
      <div className="p-5 pb-0">
        {post.isAuthor && (
          <div className="pb-5">
            <select
              name="상태"
              id="status"
              value={status}
              onChange={handleStatusChange}
              className="border p-1.5 text-sm font-semibold"
            >
              <option value="판매중">판매중</option>
              <option value="판매완료">판매완료</option>
              <option value="삭제">삭제</option>
            </select>
          </div>
        )}
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
              {isFavorite ? (
                <SolidHeartIcon className="size-8 text-red-500" />
              ) : (
                <HeartIcon className="size-8 text-gray-500" />
              )}
            </div>
          </div>
        </div>
        <button
          onClick={handleChat}
          className="w-full h-full flex items-center justify-center font-semibold bg-emerald-500 text-white text-center rounded-md hover:bg-emerald-600 focus:animate-pulse p-2 text-xl"
        >
          <div className="flex justify-center items-center gap-1">
            채팅하기
            <ChatBubbleOvalLeftEllipsisIcon className="size-8 items-center" />
          </div>
        </button>
      </div>{" "}
      {/* ContextMenu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-10">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={handleMenuClose}
          ></div>

          {/* 컨텍스트 메뉴: isAuthor에 따라 조건부 렌더링 */}
          {isAuthor ? (
            <ContextMenu
              options={[
                { label: "수정", onClick: () => console.log("수정") },
                { label: "삭제", onClick: () => console.log("삭제") },
              ]}
            />
          ) : (
            <ContextMenu
              options={[{ label: "신고", onClick: () => console.log("신고") }]}
            />
          )}
        </div>
      )}
    </div>
  );
}
