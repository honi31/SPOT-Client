import { Link } from "react-router-dom";
import Category from "../components/Main/Category";
import Header from "../components/Main/Header";
import WriteButton from "../components/Main/WriteButton";
import ProductList from "../components/Product/ProductList";
import Tab from "../components/Product/Tab";
import { useState } from "react";
import NavBar from "../components/Nav/NavBar";
import { useAuth } from "../context/AuthContext";

export default function Product() {
  const [selectedTab, setSelectedTab] = useState("팔래요");
  const { isLoggedIn, logout } = useAuth();
  return (
    <>
      {isLoggedIn ? (
        <div className="flex flex-col min-h-screen">
          <div className="sticky top-0 z-40">
            <Header />
            <Category />
          </div>

          <div className="flex-1 overflow-y-auto">
            <Tab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            <ProductList selectedTab={selectedTab} />
          </div>

          <Link
            to="/write"
            className="bg-emerald-500 flex items-center justify-center rounded-full size-16 fixed bottom-20 right-8 text-white transition-colors hover:bg-emerald-600"
          >
            <WriteButton />
          </Link>

          <NavBar />
        </div>
      ) : (
        <div>로그인이 필요한 서비스입니다.</div>
      )}
    </>
  );
}
