// ~/instagram-next/hooks/useFollow.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { profileApi } from "@/services/api.js";
import { useMe } from "@/hooks/useMe.js";

// 받아 둔 목록의 페이지마다 그 사람 줄의 isFollowing 만 바꾼다.
function changeRow(data, username, following) {
  return {
    ...data,
    pages: data.pages.map((page) => ({
      ...page,
      items: page.items.map((user) => (user.username === username ? { ...user, isFollowing: following } : user)),
    })),
  };
}

// 그 사람을 팔로우하거나 그만둔다 - following 은 «바꾸고 싶은» 상태다.
export function useFollow(username) {
  const queryClient = useQueryClient();
  const { data: me } = useMe();

  return useMutation({
    mutationFn: (following) => (following ? profileApi.follow(username) : profileApi.unfollow(username)),
    onSuccess: ({ following, followerCount }) => {
      // 서버가 돌려준 { following, followerCount } 로 그 사람의 프로필 헤더를 고친다.
      // 팔로워 수는 화면이 1을 더해 계산하지 않고 서버가 센 값을 그대로 넣는다.
      // 받아 둔 적이 없는 헤더(undefined)는 만들지 않는다 - 목록에서 누른 사람은 헤더를 아직 안 받았을 수 있다.
      queryClient.setQueryData(["profile", username], (data) =>
        data ? { ...data, isFollowing: following, followerCount } : data,
      );
      // 그 사람이 들어 있는 팔로워·팔로잉 목록 - 키가 ["followList"] 로 시작하는 캐시마다 그 줄의 버튼을 고친다.
      queryClient.setQueriesData({ queryKey: ["followList"] }, (data) =>
        data ? changeRow(data, username, following) : data,
      );
      // 내 팔로잉 수가 바뀌었다 - 내 프로필 헤더가 떠 있으면 바로 다시 받는다.
      queryClient.invalidateQueries({ queryKey: ["profile", me.username] });
    },
  });
}
