import { useState } from "react";
import useWriteForm from "./useWriteForm";
import { PhotoIcon } from "@heroicons/react/24/solid";
import Select from "react-select";
import { createPost } from "../../api/write/createPost";
import axios from "axios"; // axios for API calls

export default function WriteForm() {
  const { register, handleSubmit, control, setValue, errors, watch } =
    useWriteForm();
  const [selectedTrade, setSelectedTrade] = useState("sell");

  const handleSelect = (tradeType: string) => {
    setSelectedTrade(tradeType);
    setIsSharing(false);
    setValue("price", "");
  };

  const [isSharing, setIsSharing] = useState(false);
  const handleShareChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSharing(event.target.checked);
    if (event.target.checked) {
      setValue("price", "0");
    } else {
      setValue("price", "");
    }
  };

  const formatPrice = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "";
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replace(/[^0-9]/g, "");
    if (value === "") {
      setValue("price", "");
    } else {
      const formattedValue = formatPrice(value);
      setValue("price", formattedValue + " 원");
    }
  };

  const [previews, setPreviews] = useState<string[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]); // Presigned URL 저장할 배열

  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files) {
      const fileArray = Array.from(files);

      if (fileArray.length + previews.length > 5) {
        alert("최대 5장까지 업로드할 수 있습니다.");
        return;
      }

      const newPreviews = fileArray.map((file) => URL.createObjectURL(file));
      setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);

      // Presigned URL을 받아와서 이미지 업로드
      for (const file of fileArray) {
        try {
          // Presigned URL 요청
          const response = await axios.get(`/aws/file/${file.name}`);
          const presignedUrl = response.data;
          console.log(presignedUrl);
          // Presigned URL로 이미지 업로드
          await axios.put(presignedUrl, file, {
            headers: {
              "Content-Type": file.type,
            },
            withCredentials: false,
          });

          // 업로드 완료 후 presigned URL의 이미지 링크를 저장
          const imageUrl = presignedUrl.split("?")[0]; // URL에서 ?를 제외한 순수 URL만 저장
          setImageUrls((prevUrls) => [...prevUrls, imageUrl]);
        } catch (error) {
          console.error("이미지 업로드 실패:", error);
        }
      }
    }
  };

  const removeImage = (index: number) => {
    setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
    setImageUrls((prevUrls) => prevUrls.filter((_, i) => i !== index)); // 이미지 URL 배열에서도 제거
  };

  const handleCreatePost = async () => {
    // 제목, 내용, 가격 등 폼에서 입력된 값 가져오기
    const title = watch("title");
    const content = watch("description");
    const price = watch("price").replace(/[^0-9]/g, ""); // 숫자 형식으로 변경

    // 거래 방식에 따른 postFor 설정
    const postFor = selectedTrade === "sell" ? "SALE" : "PURCHASE";

    // 가격이 입력되지 않았거나 잘못된 경우 처리
    if (!title || !content || (selectedTrade === "sell" && !price)) {
      alert("제목, 내용, 가격을 모두 입력해주세요.");
      return;
    }

    try {
      // 게시글 등록 API 호출
      await createPost(4, title, content, postFor, "TRADING", Number(price)); // imageUrls 추가
      console.log("게시글이 성공적으로 등록되었습니다.");

      // 성공 시 알림 표시 또는 페이지 이동 등의 로직 추가
      alert("게시글이 성공적으로 등록되었습니다.");
    } catch (error) {
      console.error("게시글 등록 실패:", error);
      alert("게시글 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const category = [
    { value: "의류", label: "의류" },
    { value: "교재", label: "교재" },
    { value: "생필품", label: "생필품" },
    { value: "전자기기", label: "전자기기" },
    { value: "나눔", label: "나눔" },
    { value: "기타", label: "기타" },
  ];

  return (
    <div className="flex flex-col">
      <label htmlFor="category" className="p-1 text-sm font-semibold pt-5">
        카테고리
      </label>
      <Select
        options={category}
        placeholder="상품의 카테고리를 정해주세요"
        isClearable
        isSearchable={true}
        className="mb-4"
      ></Select>
      <form className="flex flex-col gap-1">
        <label htmlFor="photo" className="p-1 text-sm font-semibold pt-5">
          상품 사진
        </label>
        <div className="flex gap-2 flex-wrap">
          {previews.map((preview, index) => (
            <div
              key={index}
              className="relative border-2 aspect-square w-24 h-24 flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md bg-center bg-cover"
              style={{
                backgroundImage: `url(${preview})`,
              }}
            >
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1"
              >
                &times;
              </button>
            </div>
          ))}
          {previews.length < 5 && (
            <label
              htmlFor="photo-upload"
              className="border-2 aspect-square w-24 h-24 flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover"
            >
              <PhotoIcon className="w-10" />
              <div className="text-neutral-400 text-center text-sm">
                <p>상품사진</p>
                <p>업로드 {previews.length}/5</p>
              </div>
            </label>
          )}
        </div>
        <input
          onChange={onImageChange}
          type="file"
          id="photo-upload"
          name="photo"
          accept="image/*"
          multiple
          className="hidden"
        />

        <label htmlFor="title" className="p-1 text-sm font-semibold pt-5">
          제목
        </label>
        <div className="flex">
          <input
            type="text"
            id="title"
            placeholder="글 제목을 입력해주세요"
            className="w-full border border-gray-300 h-11 p-2 rounded-lg mb-2"
            {...register("title")}
          />
        </div>

        <label htmlFor="trade" className="p-1 text-sm font-semibold">
          거래 방식
        </label>
        <div className="flex gap-2 mb-1">
          <button
            type="button"
            onClick={() => handleSelect("sell")}
            className={`border px-2 py-1 text-center items-center rounded-lg ${
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
            className={`border px-2 py-1 text-center items-center rounded-lg ${
              selectedTrade === "buy"
                ? "bg-emerald-500 text-white font-semibold border-emerald-500"
                : "border-gray-500 text-gray-500 bg-gray-100"
            }`}
          >
            살래요
          </button>
        </div>
        {selectedTrade === "sell" && (
          <div className="mb-4">
            <input
              type="text"
              id="price"
              placeholder="판매 가격을 입력해주세요 (원)"
              className="w-full border border-gray-300 h-11 p-2 rounded-lg mb-1"
              {...register("price")}
              onChange={handlePriceChange}
              disabled={isSharing}
              value={watch("price") || ""}
            />
            <div className="flex items-center p-1">
              <input
                type="checkbox"
                id="share"
                className="mr-2"
                onChange={handleShareChange}
              />
              <label htmlFor="share" className="text-sm">
                나눔하기 (무료로 드려요)
              </label>
            </div>
          </div>
        )}

        {selectedTrade === "buy" && (
          <input
            type="text"
            id="price"
            placeholder="구매 희망 가격을 입력해주세요 (원)"
            className="w-full border border-gray-300 h-11 p-2 rounded-lg mb-1"
            {...register("price")}
            onChange={handlePriceChange}
            value={watch("price") || ""}
          />
        )}

        <label htmlFor="내용" className="p-1 text-sm font-semibold">
          내용
        </label>
        <div className="flex justify-start items-start">
          <textarea
            id="description"
            placeholder="글 내용을 입력해주세요"
            className="w-full border border-gray-300 h-44 p-2 rounded-lg mb-2 resize-none"
            {...register("description")}
          />
        </div>
        <button
          type="button"
          className="text-lg font-semibold border bg-emerald-500 text-white rounded-lg h-11 px-4 mt-4"
          onClick={handleCreatePost}
        >
          작성하기
        </button>
      </form>
    </div>
  );
}
