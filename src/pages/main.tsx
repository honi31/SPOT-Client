import Category from "../components/Main/Category";
import Header from "../components/Main/Header";
import MainContent from "../components/Main/Main";

export default function Main() {
  return (
    <div>
      <div className="sticky top-0 z-40">
        <Header />
        <Category />
      </div>
      <MainContent />
    </div>
  );
}
