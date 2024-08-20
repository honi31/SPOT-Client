import WriteForm from "../components/Write/WriteForm";

export default function Write() {
  return (
    <div className="w-full flex flex-col min-h-screen p-6">
      <header className="w-full bg-white border-b border-gray-300 py-4 text-center text-black font-semibold text-2xl fixed top-0 left-0 z-10">
        <h2>글 작성하기</h2>
      </header>

      <div className="flex-grow w-full py-6 pt-12">
        <WriteForm />
      </div>
    </div>
  );
}
