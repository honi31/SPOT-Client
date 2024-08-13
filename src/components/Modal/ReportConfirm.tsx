import { Link } from "react-router-dom";
type ConfirmModalProps = {
  setConfirmModalOpen: (isOpen: boolean) => void;
};
export default function ReportConfirm({
  setConfirmModalOpen,
}: ConfirmModalProps) {
  const modalClose = () => {
    setConfirmModalOpen(false);
  };

  const modalContent = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  return (
    <div
      onClick={modalClose}
      className="fixed bg-black inset-0 w-full flex flex-col justify-center items-center min-h-screen z-40"
    >
      <div
        onClick={modalContent}
        className="bg-white flex flex-col w-96 h-44 p-5 rounded-2xl justify-between relative z-50"
      >
        <div className="text-center flex justify-center items-center">
          <button
            onClick={modalClose}
            className="size-8 absolute top-0 left-0 m-4 items-center"
          >
            <svg
              data-slot="icon"
              fill="none"
              stroke-width="1.5"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold mt-10">제출하시겠습니끼?</h3>
        </div>
        <div className="flex flex-col w-full gap-2 px-3 py-6">
          <Link
            to="/main"
            onClick={() => setConfirmModalOpen(false)}
            className="w-full font-semibold bg-emerald-500 text-white text-center rounded-md hover:bg-emerald-600 focus:animate-pulse py-2 text-xl"
          >
            확인
          </Link>
        </div>
      </div>
    </div>
  );
}
