// ~/instagram-next/hooks/useFollow.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { profileApi } from "@/services/api.js";

// 그 사람을 팔로우하거나 그만둔다 - following 은 «바꾸고 싶은» 상태다.
export function useFollow(username) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (following) => (following ? profileApi.follow(username) : profileApi.unfollow(username)),
    // 서버가 돌려준 { following, followerCount } 로 그 사람의 프로필 헤더를 고친다.
    // 팔로워 수는 화면이 1을 더해 계산하지 않고 서버가 센 값을 그대로 넣는다.
    onSuccess: ({ following, followerCount }) => {
      queryClient.setQueryData(["profile", username], (data) => ({ ...data, isFollowing: following, followerCount }));
    },
  });
}
