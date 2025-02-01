import { Link, useLocation } from "react-router-dom";

export default function Category() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedCategory = searchParams.get("category") || "";

  const getCategoryLink = (category: string) => {
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set("category", category);
    return `/product?${newSearchParams.toString()}`;
  };

  const getLinkClass = (category: string) =>
    selectedCategory === category ? "text-black" : "text-gray-400";

  return (
    <div className="w-full bg-white h-12 border border-gray-200 flex justify-between items-center text-md font-semibold">
      <Link
        to={"/product"}
        className={`flex-1 text-center ${getLinkClass("")}`}
      >
        전체
      </Link>
      <Link
        to={getCategoryLink("CLOTH")}
        className={`flex-1 text-center ${getLinkClass("CLOTH")}`}
      >
        의류
      </Link>
      <Link
        to={getCategoryLink("BOOK")}
        className={`flex-1 text-center ${getLinkClass("BOOK")}`}
      >
        교재
      </Link>
      <Link
        to={getCategoryLink("DAILY")}
        className={`flex-1 text-center ${getLinkClass("DAILY")}`}
      >
        생필품
      </Link>
      <Link
        to={getCategoryLink("ELECTRONIC")}
        className={`flex-1 text-center ${getLinkClass("ELECTORONIC")}`}
      >
        전자기기
      </Link>
      <Link
        to={getCategoryLink("SHARE")}
        className={`flex-1 text-center ${getLinkClass("SHARE")}`}
      >
        나눔
      </Link>
      <Link
        to={getCategoryLink("OTHER")}
        className={`flex-1 text-center ${getLinkClass("OTHER")}`}
      >
        기타
      </Link>
    </div>
  );
}
