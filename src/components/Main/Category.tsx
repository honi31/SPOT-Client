import { Link, useLocation } from "react-router-dom";

export default function Category() {
  const location = useLocation();

  const getCategoryLink = (category: string) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("category", category);
    return `/product?${searchParams.toString()}`;
  };

  return (
    <div className="w-full bg-white h-12 border border-gray-200 flex justify-between items-center *:text-gray-400 text-md font-semibold">
      <Link
        to={getCategoryLink("")}
        className="flex-1 text-center focus:text-black"
      >
        전체
      </Link>
      <Link
        to={getCategoryLink("CLOTH")}
        className="flex-1 text-center focus:text-black"
      >
        의류
      </Link>
      <Link
        to={getCategoryLink("BOOK")}
        className="flex-1 text-center focus:text-black"
      >
        교재
      </Link>
      <Link
        to={getCategoryLink("DAILY")}
        className="flex-1 text-center focus:text-black"
      >
        생필품
      </Link>
      <Link
        to={getCategoryLink("ELECTRONIC")}
        className="flex-1 text-center focus:text-black"
      >
        전자기기
      </Link>
      <Link
        to={getCategoryLink("SHARE")}
        className="flex-1 text-center focus:text-black"
      >
        나눔
      </Link>
      <Link
        to={getCategoryLink("OTHER")}
        className="flex-1 text-center focus:text-black"
      >
        기타
      </Link>
    </div>
  );
}
