import { apiClient } from "../apiClient";

export async function cancelWish(targetPostId: number) {
  try {
    const response = await apiClient.post("/api/wish/cancel", { targetPostId });
    return response;
  } catch (error) {
    console.log(error);
  }
}
