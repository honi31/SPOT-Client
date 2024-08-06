export default function Header() {
  return (
    <div className="bg-emerald-500 w-full h-16 flex justify-between items-center">
      <div className="items-center p-4 text-2xl font-bold text-white font-serif">
        SPOT
      </div>
      <div className="items-center size-16 p-4 text-xl text-white font-bold">
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
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}
