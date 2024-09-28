import useSignupForm from "../components/Signup/useSignupForm";
import { useState, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { authEmail } from "../api/password/findPassword";
import { verifyEmailCode } from "../api/signup/email";
interface EmailFormInputs {
  email: string;
}
export default function FindPassword() {
  const { register, handleSubmit, control, setValue, errors } = useSignupForm();
  const emailSchema = z.object({
    email: z
      .string()
      .nonempty("이메일을 입력해주세요!")
      .email("올바른 이메일 형식이 아닙니다!"),
  });

  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    getValues,
    formState: { errors: emailErrors },
  } = useForm<EmailFormInputs>({
    resolver: zodResolver(emailSchema),
  });

  const [verifyCode, setVerifyCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(true);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerifyCode(e.target.value);
  };

  const handleSendCode = async (data: EmailFormInputs) => {
    const fullEmail = `${data.email}`;
    setIsSubmitting(false);
    try {
      await authEmail(fullEmail);
      setIsCodeSent(true);
      setIsSubmitting(true);
    } catch (error) {
      console.log("인증번호 전송 중 오류", error);
    }
  };

  const handleVerifyCode = async () => {
    const email = getValues("email");
    const fullEmail = `${email}`;
    try {
      await verifyEmailCode(fullEmail, verifyCode);
      setIsVerified(true);
    } catch (error) {
      console.log("인증번호 검증 오류", error);
    }
  };

  return (
    <div className="flex flex-col py-8 px-5">
      {!isVerified ? (
        <>
          <h2 className="text-xl font-bold">이메일 인증</h2>
          <p className="mt-1 text-gray-500 text-md">
            이메일 인증 후 비밀번호 찾기를 진행해주세요.
          </p>
          <div className="flex flex-col mt-12 w-full">
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
                  className="w-1/2 border border-gray-300 h-11 p-2 rounded-lg mb-2"
                />
                <button
                  type="submit"
                  className="ml-2 text-xs border-2 border-emerald-500 text-black rounded-lg h-11 px-4"
                  disabled={!isSubmitting}
                >
                  {isSubmitting ? "인증번호 전송" : "전송 중 ... "}
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
                  onClick={handleVerifyCode}
                >
                  확인
                </button>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold">비밀번호 변경</h2>
          <div className="flex flex-col">
            <div className="mt-5 mb-1">
              <label htmlFor="password" className="p-1 text-sm font-semibold">
                새 비밀번호
              </label>
              <input
                type="password"
                id="password"
                placeholder="새 비밀번호"
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
              placeholder="새 비밀번호 확인"
              className="w-full border border-gray-300 h-11 rounded-lg p-2 mb-1"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword?.message && (
              <p className="text-red-500 mb-0">
                {errors.confirmPassword?.message?.toString()}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
