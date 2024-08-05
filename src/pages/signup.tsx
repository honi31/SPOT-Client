import React from "react";
import Select from "react-select";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Signup() {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("");
  const navigate = useNavigate();
  const onChangeSelectYear = (e: any) => {
    if (e) setSelectedYear(e.value);
    else setSelectedYear("");
  };

  const onChangeSelectSchool = (e: any) => {
    if (e) setSelectedSchool(e.value);
    else setSelectedSchool("");
  };
  const options = [
    { value: "24학번", label: "24학번" },
    { value: "23학번", label: "23학번" },
    { value: "22학번", label: "22학번" },
    { value: "21학번", label: "21학번" },
    { value: "20학번", label: "20학번" },
    { value: "19학번", label: "19학번" },
    { value: "18학번", label: "18학번" },
    { value: "17학번", label: "17학번" },
    { value: "16학번", label: "16학번" },
    { value: "15학번", label: "15학번" },
    { value: "14학번", label: "14학번" },
  ];
  const placeholder = "학번을 선택해주세요";
  const schools = [
    { value: "한국외국어대학교", label: "한국외국어대학교" },
    { value: "제주대학교", label: "제주대학교" },
    { value: "가톨릭대학교", label: "가톨릭대학교" },
    { value: "단국대학교", label: "단국대학교" },
    { value: "서울대학교", label: "서울대학교" },
    { value: "연세대학교", label: "연세대학교" },
    { value: "고려대학교", label: "고려대학교" },
    { value: "서강대학교", label: "서강대학교" },
    { value: "성균관대학교", label: "성균관대학교" },
    { value: "한양대학교", label: "한양대학교" },
    { value: "중앙대학교", label: "중앙대학교" },
  ];
  const secondplaceholder = "학교 이름을 검색하세요.";
  const handleNextClick = () => {
    if (selectedYear === "") {
      alert("입학 연도를 선택해주세요!");
    } else if (selectedSchool === "") {
      alert("학교를 선택해주세요!");
    } else {
      navigate("/register/signup");
    }
  };
  return (
    <div className="flex flex-col py-8 px-5">
      <h2 className="text-2xl font-bold">SPOT 회원가입</h2>
      <p className="mt-1 text-gray-500 text-md">
        SPOT에 가입하고 우리 학교 근처 다양한 중고 상품들을 만나보세요.
      </p>

      <h2 className="mt-12 text-2xl font-bold">학교 선택</h2>
      <div className="flex flex-col py-4">
        <label htmlFor="입학연도" className="p-1 text-sm font-semibold">
          입학연도
        </label>
        <Select
          onChange={onChangeSelectYear}
          options={options}
          placeholder={placeholder}
          isClearable
          isSearchable={false}
          className="mb-8"
        ></Select>
        <label htmlFor="학교" className="p-1 text-sm font-semibold">
          학교
        </label>
        <Select
          onChange={onChangeSelectSchool}
          options={schools}
          placeholder={secondplaceholder}
          isClearable
          isSearchable={true}
          className="mb-8"
        ></Select>
      </div>
      <div className="w-full flex flex-col items-center">
        <button
          onClick={handleNextClick}
          className="bg-emerald-500 flex h-11 rounded-xl text-white justify-center text-center items-center w-full font-medium text-lg hover:bg-emerald-600 transition-colors"
        >
          다음
        </button>
      </div>
    </div>
  );
}
