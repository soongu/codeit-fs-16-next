// ~/instagram-next/hooks/useUpdateProfileImage.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { memberApi, uploadApi } from "@/services/api.js";

// 내 프로필 사진을 바꾼다 - 사진을 먼저 올리고, 받은 주소를 프로필 사진으로 적는다.
export function useUpdateProfileImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file) => {
      const { imageUrls } = await uploadApi.images([file]);
      return memberApi.updateProfileImage(imageUrls[0]);
    },
    // 서버가 돌려준 주소로 사이드바(«나는 누구»)와 내 프로필 헤더의 사진을 바꾼다 - 지금 화면에 떠 있는 두 캐시다.
    // 피드 · 상세 · 댓글은 다시 열 때 서버에서 다시 받으니 여기서 고치지 않는다.
    onSuccess: ({ profileImage }) => {
      const me = queryClient.getQueryData(["me"]);
      queryClient.setQueryData(["me"], (data) => ({ ...data, profileImage }));
      queryClient.setQueryData(["profile", me.username], (data) => (data ? { ...data, profileImage } : data));
    },
  });
}
