import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Label } from "../../components/ui/label";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import ReportConfirm from "./ReportConfirm";
type ReportModalProps = {
  setIsModalOpen: (isOpen: boolean) => void;
};
export default function ReportModal({ setIsModalOpen }: ReportModalProps) {
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const modalClose = () => {
    setIsModalOpen(false);
  };

  const modalContent = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  return (
    <>
      <div
        onClick={modalClose}
        className="fixed bg-black inset-0 w-full flex flex-col justify-center items-center min-h-screen z-40"
      >
        <div
          onClick={modalContent}
          className="bg-white flex flex-col w-96 h-[350px] p-5 rounded-2xl justify-between relative z-50"
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
            <h3 className="text-xl font-semibold mt-10">
              해당 게시글을 신고하는 이유를 알려주세요
            </h3>
            <div className="mt-6 gap-5">
              <RadioGroup defaultValue="option-one">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-one" id="option-one" />
                  <Label htmlFor="option-one" className="text-lg">
                    스팸/홍보글이에요
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-two" id="option-two" />
                  <Label htmlFor="option-two" className="text-lg">
                    도배글이에요
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-three" id="option-three" />
                  <Label htmlFor="option-three" className="text-lg">
                    욕설/비하글이에요
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-four" id="option-four" />
                  <Label htmlFor="option-four" className="text-lg">
                    부적절한 내용이에요
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <div className="flex flex-col w-full gap-2 px-3 py-6 mt-3">
            <button
              onClick={() => {
                setConfirmModalOpen(true);
              }}
              className="w-full font-semibold bg-emerald-500 text-white text-center rounded-md hover:bg-emerald-600 focus:animate-pulse py-2 text-xl"
            >
              제출하기
            </button>
          </div>
        </div>
      </div>
      {confirmModalOpen && (
        <ReportConfirm setConfirmModalOpen={setConfirmModalOpen} />
      )}
    </>
  );
}
