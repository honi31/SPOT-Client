import { Link } from "react-router-dom";

export default function Category() {
  return (
    <div className="w-full bg-white h-12 border border-gray-200 flex justify-between items-center *:text-gray-400 text-md font-semibold">
      <Link
        to="/product"
        className="flex-1 text-center items-center focus:text-black"
      >
        전체
      </Link>
      <Link
        to="/product?category_id=2"
        className="flex-1 text-center focus:text-black"
      >
        의류
      </Link>
      <Link
        to="/product?category_id=3"
        className="flex-1 text-center focus:text-black"
      >
        교재
      </Link>
      <Link
        to="/product?category_id=4"
        className="flex-1 text-center focus:text-black"
      >
        생필품
      </Link>
      <Link
        to="/product?category_id=5"
        className="flex-1 text-center focus:text-black"
      >
        전자기기
      </Link>
      <Link
        to="/product?category_id=6"
        className="flex-1 text-center focus:text-black"
      >
        나눔
      </Link>
      <Link
        to="/product?category_id=7"
        className="flex-1 text-center focus:text-black"
      >
        기타
      </Link>
    </div>
  );
}
