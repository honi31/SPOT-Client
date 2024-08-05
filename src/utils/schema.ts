import { z } from "zod";

const checkPassword = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => password === confirmPassword;

export const schema = z
  .object({
    nickname: z.string({
      invalid_type_error: "닉네임은 문자로 입력해주세요!",
      required_error: "사용하실 닉네임을 입력해주세요!",
    }),
    email: z.string().email({ message: "유효한 이메일 주소를 입력해주세요." }),
    password: z
      .string({ required_error: "비밀번호를 입력해주세요!" })
      .min(6, "비밀번호는 최소 6자 이상이어야 합니다.")
      .max(100, {
        message: "비밀번호는 최대 100자 이하로 입력해주세요.",
      }),
    confirmPassword: z
      .string({ required_error: "비밀번호 확인을 입력해주세요!" })
      .min(6, "비밀번호 확인은 최소 6자 이상이어야 합니다.")
      .max(100, {
        message: "비밀번호 확인은 최대 100자 이하로 입력해주세요.",
      }),
    selectedDept: z.object({
      value: z.string({
        required_error: "학과를 선택해주세요!",
        invalid_type_error: "유효한 학과를 선택해주세요!",
      }),
    }),
  })
  .refine(checkPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });
