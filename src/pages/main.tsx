import { dividerClasses } from "@mui/material";
import Category from "../components/Main/Category";
import Header from "../components/Main/Header";
import MainContent from "../components/Main/Main";
import NavBar from "../components/Nav/NavBar";
import { useAuth } from "../context/AuthContext";

export default function Main() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <>
      {isLoggedIn ? (
        <div className="flex flex-col min-h-screen">
          <div className="sticky top-0 z-40">
            <Header />
            <Category />
          </div>
          <div className="flex-grow overflow-y-auto">
            <MainContent />
          </div>

          <div className="sticky bottom-0">
            <NavBar />
          </div>
        </div>
      ) : (
        <div>로그인이 필요한 서비스입니다.</div>
      )}
    </>
  );
}
