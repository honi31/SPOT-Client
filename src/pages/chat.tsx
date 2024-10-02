import ChatMessagesList from "../components/Chat/ChatMessageList";
import ProductCard from "../components/Chat/ProductCard";
import { useAuth } from "../context/AuthContext";
interface User {
  id: number;
  username: string;
  avatar: string;
}

interface Message {
  id: number;
  userId: number;
  user: User;
  payload: string;
  created_at: Date;
}
export default function Chat() {
  const { isLoggedIn, logout } = useAuth();
  const dummyMessages: Message[] = [
    {
      id: 1,
      userId: 1,
      user: {
        id: 1,
        username: "호니",
        avatar: "https://via.placeholder.com/50",
      },
      payload: "요아정 내놔",
      created_at: new Date(new Date().getTime() - 60000),
    },
    {
      id: 2,
      userId: 2,
      user: {
        id: 2,
        username: "흠",
        avatar: "https://via.placeholder.com/50",
      },
      payload: "싫은데",
      created_at: new Date(new Date().getTime() - 120000),
    },
  ];

  return (
    <>
      {isLoggedIn ? (
        <div className="h-screen flex flex-col">
          <div className="flex-shrink-0 sticky top-0 z-10">
            <ProductCard />
          </div>

          <div className="flex-grow overflow-y-auto">
            <ChatMessagesList initialMessages={dummyMessages} userId={1} />
          </div>
        </div>
      ) : (
        <div>로그인이 필요한 서비스입니다.</div>
      )}
    </>
  );
}
