import Select from "react-select";
import useSignupForm from "../components/Signup/useSignupForm";
import { Controller } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signup } from "../api/signup/register";
import { sendCode, verifyEmailCode } from "../api/signup/email";
import { checkNickname } from "../api/signup/nickname";
import { useDebounce } from "use-debounce";
import { majors } from "../data/major";

interface EmailFormInputs {
  email: string;
}

interface SignupFormInputs {
  nickname: string;
  password: string;
  confirmPassword: string;
  selectedDept: { value: string; label: string } | null;
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

  const {
    register,
    handleSubmit: handleSignupSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<SignupFormInputs>();

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
  const navigate = useNavigate();

  const [emailDomain, setEmailDomain] = useState("@gmail.com");
  const [verifyCode, setVerifyCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3분(180초) 타이머 초기화
  const timerRef = useRef<NodeJS.Timeout | null>(null); // 타이머 제어용 ref
  const [searchParams] = useSearchParams();

  const [nickname, setNickname] = useState("");
  const [nicknameFeedback, setNicknameFeedback] = useState<string | null>(null);

  const startTimer = () => {
    setTimeLeft(180); // 3분(180초) 초기화
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!); // 타이머 종료
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerifyCode(e.target.value);
  };

  const handleSendCode = async (data: EmailFormInputs) => {
    const fullEmail = `${data.email}${emailDomain}`;
    try {
      await sendCode(fullEmail);
      setIsCodeSent(true);
      startTimer();
    } catch (error) {
      console.log("인증번호 전송 중 오류", error);
      alert("이미 존재하는 이메일입니다!");
    }
  };

  const handleVerifyCode = async () => {
    const email = getValues("email");
    const fullEmail = `${email}${emailDomain}`;
    try {
      await verifyEmailCode(fullEmail, verifyCode);
      setIsVerified(true);
      clearInterval(timerRef.current!); // 타이머 정지
    } catch (error) {
      console.log("인증번호 검증 오류", error);
    }
  };

  const handleSignup = async (data: SignupFormInputs) => {
    const email = getValues("email");
    const fullEmail = `${email}${emailDomain}`;
    const university = searchParams.get("school") || "Unknown University";
    const entranceYear = searchParams.get("year") || "Unknown Year";
    if (data.password !== data.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await signup(
        fullEmail,
        data.password,
        data.nickname,
        university,
        data.selectedDept?.value || "",
        entranceYear
      );
      alert("회원가입 성공!");
      navigate("/login");
    } catch (error) {
      console.log("회원가입 중 오류 발생: ", error);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    const school = searchParams.get("school");
    if (school === "한국외국어대학교") {
      setEmailDomain("@hufs.ac.kr");
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current); // 컴포넌트 언마운트 시 타이머 정지
    };
  }, [searchParams, setValue]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
    }`;
  };

  const [debouncedNickname] = useDebounce(nickname, 500);

  useEffect(() => {
    if (debouncedNickname) {
      handleCheckNickname(debouncedNickname);
    }
  }, [debouncedNickname]);

  const handleCheckNickname = async (nickname: string) => {
    try {
      const response = await checkNickname(nickname);
      if (response && response.status === 200) {
        setNicknameFeedback("사용 가능한 닉네임입니다.");
      } else {
        setNicknameFeedback("이미 사용 중인 닉네임입니다.");
      }
    } catch (error) {
      setNicknameFeedback("닉네임 확인 중 오류가 발생했습니다.");
    }
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setNicknameFeedback(null);
  };

  const toLogin = () => {
    navigate("/login");
  };

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
              <div className="border rounded-lg">
                <input
                  type="text"
                  id="email"
                  placeholder="이메일 아이디"
                  {...registerEmail("email")}
                  className="w-1/2 h-11 p-2 focus:outline-none"
                />
                <input
                  type="text"
                  id="emailDomain"
                  value={emailDomain}
                  className="w-1/2 h-11 p-2 bg-white"
                  disabled
                />
              </div>
              <button
                type="submit"
                className="ml-2 w-20 text-md border-2 border-emerald-500 text-emerald-600 rounded-lg h-11 px-2"
              >
                인증 요청
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
              <div className="flex items-center text-center">
                <div className="border rounded-lg">
                  <input
                    type="text"
                    id="verificationCode"
                    placeholder="인증번호 입력"
                    value={verifyCode}
                    onChange={handleCodeChange}
                    className="w-full p-2 rounded-lg"
                  />
                </div>
                <div className="ml-2 w-20 text-lg h-11 font-semibold justify-center items-center text-center px-2 mt-4">
                  <span className="items-center justify-center w-full text-center text-emerald-600">
                    {formatTime(timeLeft)}
                  </span>
                </div>
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
          <div className="flex text-gray-500 gap-2 mt-4 p-1">
            <p>이미 회원가입을 하셨나요?</p>
            <button onClick={toLogin}>로그인 하러가기</button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col mt-12">
          <form onSubmit={handleSignupSubmit(handleSignup)}>
            <label htmlFor="nickname" className="p-1 text-sm font-semibold">
              닉네임
            </label>
            <input
              type="text"
              id="nickname"
              placeholder="닉네임"
              className="w-full border border-gray-300 h-11 p-2 rounded-lg mb-1"
              {...register("nickname")}
              value={nickname}
              onChange={handleNicknameChange}
            />
            {nicknameFeedback && (
              <p
                className={
                  nicknameFeedback.includes("사용 가능")
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {nicknameFeedback}
              </p>
            )}
            {errors.nickname && (
              <p className="text-red-500 mb-0">
                {errors.nickname.message?.toString()}
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
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <input
              type="password"
              id="confirmPassword"
              placeholder="비밀번호 확인"
              className="w-full border border-gray-300 h-11 rounded-lg p-2 mb-1"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 mb-0">
                {errors.confirmPassword.message?.toString()}
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
                    options={majors}
                    placeholder={placeholder}
                    isClearable
                    className="h-12"
                  />
                )}
              />
              {errors.selectedDept && (
                <p className="text-red-500">{errors.selectedDept.message}</p>
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
