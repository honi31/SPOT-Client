import Category from "../components/Main/Category";
import Header from "../components/Main/Header";
import MainContent from "../components/Main/Main";
import NavBar from "../components/Nav/NavBar";

export default function Main() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-40">
        <Header />
        <Category />
      </div>
      <div className="flex-1 overflow-y-auto">
        <MainContent />
      </div>

      <NavBar />
    </div>
  );
}
