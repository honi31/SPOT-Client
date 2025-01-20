import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { modifyPost, getBeforePost } from "../../api/product/modifyPost";
import useWriteForm from "../Write/useWriteForm";

export default function ModifyForm() {
  const { id } = useParams<{ id: string }>(); // URL 파라미터에서 postId 가져오기
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTrade, setSelectedTrade] = useState<"sell" | "buy">("sell");
  const [previews, setPreviews] = useState<string[]>([]); // 이미지 프리뷰
  const [isSharing, setIsSharing] = useState(false); // 나눔 체크박스 상태
  const { register, handleSubmit, setValue, watch, control, errors } =
    useWriteForm();
  const navigate = useNavigate();

  const handleCategoryChange = (
    option: { value: string; label: string } | null
  ) => {
    setSelectedCategory(option?.value || null);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^0-9]/g, "");
    setValue("price", value);
  };

  const handleSelect = (tradeType: "sell" | "buy") => {
    setSelectedTrade(tradeType);
    setValue("price", "");
    setIsSharing(false);
  };

  const handleShareChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSharing(event.target.checked);
    if (event.target.checked) {
      setValue("price", "0");
    } else {
      setValue("price", "");
    }
  };

  const handleModifyPost = async (data: any) => {
    if (!id || !selectedCategory) {
      alert("카테고리를 선택해주세요.");
      return;
    }

    try {
      await modifyPost(
        Number(id),
        data.title,
        data.description,
        selectedTrade === "sell" ? "SALE" : "PURCHASE",
        "TRADING", // 기본 상태
        Number(data.price),
        selectedCategory
      );
      alert("게시글이 성공적으로 수정되었습니다.");
      navigate("/product"); // 수정 완료 후 페이지 이동
    } catch (error) {
      console.error("게시글 수정 실패:", error);
      alert("게시글 수정에 실패했습니다.");
    }
  };

  const fetchPostData = async () => {
    try {
      if (!id) return;

      const post = await getBeforePost(Number(id));
      if (post) {
        setValue("title", post.title);
        setValue("description", post.content);
        setValue("price", post.price.toString());
        setSelectedCategory(post.category);
        setSelectedTrade(post.postFor === "SALE" ? "sell" : "buy");
        setPreviews(post.imageUrls || []);
      }
    } catch (error) {
      console.error("게시글 데이터를 불러오지 못했습니다:", error);
    }
  };

  useEffect(() => {
    fetchPostData();
  }, [id]);

  const categoryOptions = [
    { value: "CLOTH", label: "의류" },
    { value: "BOOK", label: "교재" },
    { value: "DAILY", label: "생필품" },
    { value: "ELECTRONIC", label: "전자기기" },
    { value: "SHARE", label: "나눔" },
    { value: "OTHER", label: "기타" },
  ];

  return (
    <div className="flex flex-col">
      <label htmlFor="category" className="p-1 text-sm font-semibold pt-5">
        카테고리
      </label>
      <Select
        options={categoryOptions}
        value={categoryOptions.find((opt) => opt.value === selectedCategory)}
        placeholder="상품의 카테고리를 선택해주세요"
        isClearable
        isSearchable
        onChange={handleCategoryChange}
        className="mb-4"
      />

      <form className="flex flex-col gap-1">
        <label htmlFor="photo" className="p-1 text-sm font-semibold pt-5">
          상품 사진
        </label>
        <div className="flex gap-2 flex-wrap">
          {previews.map((preview, index) => (
            <div
              key={index}
              className="relative border-2 aspect-square w-24 h-24 flex items-center justify-center bg-center bg-cover rounded-md"
              style={{
                backgroundImage: `url(${preview})`,
              }}
            >
              <button
                type="button"
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1"
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        <label htmlFor="title" className="p-1 text-sm font-semibold pt-5">
          제목
        </label>
        <input
          type="text"
          id="title"
          placeholder="글 제목을 입력해주세요"
          className="w-full border border-gray-300 h-11 p-2 rounded-lg mb-2"
          {...register("title")}
        />

        <label htmlFor="trade" className="p-1 text-sm font-semibold">
          거래 방식
        </label>
        <div className="flex gap-2 mb-1">
          <button
            type="button"
            onClick={() => handleSelect("sell")}
            className={`border px-2 py-1 text-center rounded-lg ${
              selectedTrade === "sell"
                ? "bg-emerald-500 text-white"
                : "border-gray-500 text-gray-500 bg-gray-100"
            }`}
          >
            팔래요
          </button>
          <button
            type="button"
            onClick={() => handleSelect("buy")}
            className={`border px-2 py-1 text-center rounded-lg ${
              selectedTrade === "buy"
                ? "bg-emerald-500 text-white"
                : "border-gray-500 text-gray-500 bg-gray-100"
            }`}
          >
            살래요
          </button>
        </div>

        <label htmlFor="price" className="p-1 text-sm font-semibold">
          가격
        </label>
        <input
          type="text"
          id="price"
          placeholder="가격을 입력해주세요"
          className="w-full border border-gray-300 h-11 p-2 rounded-lg mb-2"
          {...register("price")}
          onChange={handlePriceChange}
          disabled={isSharing}
        />
        <div className="flex items-center">
          <input
            type="checkbox"
            id="share"
            className="mr-2"
            checked={isSharing}
            onChange={handleShareChange}
          />
          <label htmlFor="share" className="text-sm">
            나눔하기 (무료로 드려요)
          </label>
        </div>

        <label htmlFor="description" className="p-1 text-sm font-semibold">
          내용
        </label>
        <textarea
          id="description"
          placeholder="글 내용을 입력해주세요"
          className="w-full border border-gray-300 h-44 p-2 rounded-lg mb-2 resize-none"
          {...register("description")}
        ></textarea>

        <button
          type="submit"
          className="text-lg font-semibold border bg-emerald-500 text-white rounded-lg h-11 px-4 mt-4"
          onClick={handleModifyPost}
        >
          수정하기
        </button>
      </form>
    </div>
  );
}
