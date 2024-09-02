import PageList from "../components/MyPage/Pagelist";
import Profile from "../components/MyPage/Profile";
import NavBar from "../components/Nav/NavBar";

export default function MyPage() {
  return (
    <div>
      <div className="bg-emerald-500 flex w-full h-16 sticky top-0 z-40 justify-center items-center">
        <span className="items-center text-2xl font-semibold text-neutral-100">
          마이 페이지
        </span>
      </div>
      <div>
        <Profile />
      </div>
      <div className="overflow-y-auto">
        <PageList />
      </div>
      <div>
        <NavBar />
      </div>
    </div>
  );
}
