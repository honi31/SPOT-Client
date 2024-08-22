import { ArrowUpCircleIcon } from "@heroicons/react/24/solid";

import { useRef, useState } from "react";

export default function Chat() {
  const [message, setMessage] = useState("");
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setMessage(value);
  };
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert(message);
    setMessage("");
  };
  return (
    <div className="p-5 flex flex-col gap-5 min-h-screen justify-end">
      <form className="flex relative" onSubmit={onSubmit}>
        <input
          required
          onChange={onChange}
          value={message}
          className="bg-transparent rounded-full w-full h-11 focus:outline-none px-5 ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-neutral-50 border-none placeholder:text-neutral-400"
          type="text"
          name="message"
          placeholder="Write a message..."
        />
        <button className="absolute right-0">
          <ArrowUpCircleIcon className="size-11 text-emerald-500 transition-colors hover:text-emerald-300" />
        </button>
      </form>
    </div>
  );
}
