import { useNavigate, useParams } from "react-router-dom";
import { deletePost } from "../../api/product/deletePost";

interface ContextMenuProps {
  options: { label: string; onClick: () => void }[];
}
export default function ContextMenu({ options }: ContextMenuProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const handleDeletePost = async () => {
    try {
      const response = await deletePost(Number(id));
      alert("삭제성공");
    } catch (error) {
      alert("삭제 실패");
    }
  };
  const handleModifyPost = async () => {
    navigate(`/modifyPost/${id}`);
  };
  return (
    <div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto bg-white rounded-xl shadow-lg z-20 *:text-center *:text-lg">
      {options.map((option, index) => (
        <button
          key={index}
          className="w-full p-3 text-gray-800 focus:bg-gray-200 focus:rounded-t-xl"
          onClick={() => {
            if (option.label === "삭제") {
              handleDeletePost();
            } else if (option.label === "수정") {
              handleModifyPost();
            } else {
              option.onClick();
            }
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
