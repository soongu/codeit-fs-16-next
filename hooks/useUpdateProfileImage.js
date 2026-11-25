// ~/instagram-next/hooks/useUpdateProfileImage.js
import { useMutation } from "@tanstack/react-query";
import { memberApi, uploadApi } from "@/services/api.js";

// 내 프로필 사진을 바꾼다 - 사진을 먼저 올리고, 받은 주소를 프로필 사진으로 적는다.
export function useUpdateProfileImage() {
  return useMutation({
    mutationFn: async (file) => {
      const { imageUrls } = await uploadApi.images([file]);
      return memberApi.updateProfileImage(imageUrls[0]);
    },
  });
}
