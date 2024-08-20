import { z } from "zod";

// const fileSchema = z.object({
//   type: z.string().refine((value) => value.includes("image"), {
//     message: "이미지 파일만 업로드 가능합니다.",
//   }),
//   size: z.number().max(1024 * 1024 * 2, {
//     message: "이미지 파일은 2MB 이하로 업로드 가능합니다.",
//   }),
// });

export const writeSchema = z.object({
  photo: z.string({
    required_error: "Photo is required",
  }),
  title: z.string({
    required_error: "Title is required",
  }),
  description: z.string({
    required_error: "Description is required",
  }),
  price: z.coerce.number({
    required_error: "Price is required",
  }),
});
