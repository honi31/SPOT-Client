import Select from "react-select";
import useSignupForm from "../components/Signup/useSignupForm"; // Import the custom hook
import { Controller } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signup } from "../api/signup/register";
import { sendCode, verifyEmailCode } from "../api/signup/email";

interface EmailFormInputs {
  email: string;
}

export default function NextSignup() {
  const emailSchema = z.object({
    email: z
      .string()
      .nonempty("이메일을 입력해주세요!")
      .regex(/^[a-zA-Z0-9]+$/, "이메일은 문자와 숫자만 입력할 수 있습니다!"),
  });

  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    getValues,
    formState: { errors: emailErrors },
  } = useForm<EmailFormInputs>({
    resolver: zodResolver(emailSchema),
  });

  const { register, handleSubmit, control, setValue, errors } = useSignupForm();

  const options = [
    { value: "컴퓨터공학과", label: "컴퓨터공학과" },
    { value: "경영학과", label: "경영학과" },
    { value: "경제학과", label: "경제학과" },
    { value: "정치외교학과", label: "정치외교학과" },
    { value: "수학과", label: "수학과" },
    { value: "정보통신공학과", label: "정보통신공학과" },
    { value: "전자공학과", label: "전자공학과" },
    { value: "통계학과", label: "통계학과" },
    { value: "건축학과", label: "건축학과" },
    { value: "생명공학과", label: "생명공학과" },
    { value: "화학과", label: "화학과" },
  ];
  const placeholder = "학과를 검색하세요.";

  const [emailDomain, setEmailDomain] = useState("@gmail.com");
  const [verifyCode, setVerifyCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [searchParams] = useSearchParams(); // 쿼리 파라미터 사용

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerifyCode(e.target.value);
  };

  const handleSendCode = async (data: EmailFormInputs) => {
    const fullEmail = `${data.email}${emailDomain}`;
    try {
      await sendCode(fullEmail);
      setIsCodeSent(true);
      console.log(fullEmail);
    } catch (error) {
      console.log("인증번호 전송 중 오류", error);
      console.log(fullEmail);
    }
  };

  const handleVerifyCode = async () => {
    const email = getValues("email"); // Retrieve email from form values
    const fullEmail = `${email}${emailDomain}`;
    try {
      await verifyEmailCode(fullEmail, verifyCode);
      setIsVerified(true);
    } catch (error) {
      console.log("인증번호 검증 오류", error);
    }
  };

  const handleSignup = async () => {};

  useEffect(() => {
    const school = searchParams.get("school");

    if (school === "한국외국어대학교") {
      setEmailDomain("@hufs.ac.kr");
      setValue("emailDomain", "@hufs.ac.kr"); // 이메일 도메인 설정
    }
  }, [searchParams, setValue]);

  return (
    <div className="flex flex-col py-8 px-5">
      <h2 className="text-2xl font-bold">회원 정보</h2>
      {!isVerified ? (
        <div className="flex flex-col mt-12">
          <form onSubmit={handleEmailSubmit(handleSendCode)}>
            <label htmlFor="email" className="p-1 text-sm font-semibold pt-5">
              이메일
            </label>
            <div className="flex">
              <input
                type="text"
                id="email"
                placeholder="이메일 아이디"
                {...registerEmail("email")}
                className="w-1/2 border border-gray-300 h-11 p-2 rounded-l-lg mb-2"
              />
              <input
                type="text"
                id="emailDomain"
                value={emailDomain}
                className="w-1/2 border border-gray-300 h-11 p-2 rounded-r-lg bg-gray-100"
                disabled
                {...register("emailDomain")}
              />
              <button
                type="submit"
                className="ml-2 text-xs border-2 border-emerald-500 text-black rounded-lg h-11 px-4"
              >
                인증번호 전송
              </button>
            </div>
            {emailErrors.email && (
              <p className="text-red-500 mb-0">
                {emailErrors.email?.message?.toString()}
              </p>
            )}
          </form>

          {isCodeSent && (
            <>
              <div className="flex mt-4">
                <input
                  type="text"
                  id="verificationCode"
                  placeholder="인증번호 입력"
                  value={verifyCode}
                  onChange={handleCodeChange}
                  className="w-full border border-gray-300 h-11 p-2 rounded-lg mb-5"
                />
              </div>

              <button
                type="button"
                className="w-full bg-emerald-500 text-white text-center rounded-md hover:bg-emerald-600 focus:animate-pulse py-2 text-xl mt-8"
                onClick={handleVerifyCode} // 인증 완료 버튼 클릭 시 handleVerifyCode 호출
              >
                확인
              </button>
            </>
          )}
        </div>
      ) : (
        // 회원 정보 입력 폼 부분
        <div className="flex flex-col mt-12">
          <form onSubmit={handleSubmit}>
            <label htmlFor="nickname" className="p-1 text-sm font-semibold">
              닉네임
            </label>
            <input
              type="text"
              id="nickname"
              placeholder="닉네임"
              className="w-full border border-gray-300 h-11 p-2 rounded-lg mb-1"
              {...register("nickname")}
            />
            {errors.nickname?.message && (
              <p className="text-red-500 mb-0">
                {errors.nickname?.message?.toString()}
              </p>
            )}
            <div className="mt-5 mb-1">
              <label htmlFor="password" className="p-1 text-sm font-semibold">
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                placeholder="비밀번호"
                className="w-full border border-gray-300 h-11 p-2 rounded-lg mb-1"
                {...register("password")}
              />
              {errors.password?.message && (
                <p className="text-red-500">
                  {errors.password?.message?.toString()}
                </p>
              )}
            </div>
            <input
              type="password"
              id="confirmPassword"
              placeholder="비밀번호 확인"
              className="w-full border border-gray-300 h-11 rounded-lg p-2 mb-1"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword?.message && (
              <p className="text-red-500 mb-0">
                {errors.confirmPassword?.message?.toString()}
              </p>
            )}
            <div className="mt-5">
              <label htmlFor="dept" className="p-1 text-sm font-semibold">
                학과
              </label>
              <Controller
                name="selectedDept"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={options}
                    placeholder="학과를 검색하세요."
                    isClearable
                    className="h-12"
                  />
                )}
              />
              {errors.selectedDept && (
                <p className="text-red-500">
                  {errors.selectedDept.message?.toString()}
                </p>
              )}
            </div>

            <div className="w-full flex flex-col items-center mt-8">
              <button
                type="submit"
                className="bg-emerald-500 flex h-11 rounded-xl text-white justify-center text-center items-center w-full font-medium text-lg hover:bg-emerald-600 transition-colors"
              >
                회원가입
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
