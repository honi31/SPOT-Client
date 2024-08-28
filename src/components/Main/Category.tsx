import { Link } from "react-router-dom";

export default function Category() {
  return (
    <div className="w-full bg-white h-12 border border-gray-200 flex justify-between items-center *:text-gray-400 text-md font-semibold">
      <Link
        to="/product?category=all"
        className="flex-1 text-center items-center hover:text-black"
      >
        전체
      </Link>
      <Link
        to="/product?category=cloth"
        className="flex-1 text-center hover:text-black"
      >
        의류
      </Link>
      <Link
        to="/product?category=book"
        className="flex-1 text-center hover:text-black"
      >
        교재
      </Link>
      <Link
        to="/product?category=production"
        className="flex-1 text-center hover:text-black"
      >
        생필품
      </Link>
      <Link
        to="/product?category=electric"
        className="flex-1 text-center hover:text-black"
      >
        전자기기
      </Link>
      <Link
        to="/product?category=share"
        className="flex-1 text-center hover:text-black"
      >
        나눔
      </Link>
      <Link
        to="/product?category=etc"
        className="flex-1 text-center hover:text-black"
      >
        기타
      </Link>
    </div>
  );
}
