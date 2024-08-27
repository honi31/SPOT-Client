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
    nickname: z.string().nonempty("이메일을 입력해주세요!"),
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
    selectedDept: z
      .object({
        value: z.string({
          required_error: "학과를 선택해주세요!",
          invalid_type_error: "유효한 학과를 선택해주세요!",
        }),
      })
      .refine((data) => !!data.value, {
        message: "학과를 선택해주세요!",
        path: ["selectedDept"],
      }),
  })
  .refine(checkPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });
