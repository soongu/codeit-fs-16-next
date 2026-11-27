// ~/instagram-next/hooks/useUpdatePost.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postApi } from "@/services/api.js";
import { changePost, changeDetail } from "@/hooks/useLikePost.js";

// 게시물의 글을 고친다 — 사진은 고치지 않아서 글만 보낸다. 글쓴이인지는 서버가 로그인 정보로 확인한다.
// userId 는 지금 보는 사람 — 캐시 키를 맞추는 데만 쓴다.
export function useUpdatePost(userId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, content }) => postApi.update(postId, { content }),
    // 서버가 돌려준 게시물로 두 캐시의 그 게시물을 바꾼다 — 다시 받지 않아도 고친 글이 바로 보인다.
    onSuccess: (post) => {
      queryClient.setQueryData(["posts", userId], (data) => changePost(data, post.id, () => post));
      queryClient.setQueryData(["post", post.id, userId], (data) => changeDetail(data, () => post));
    },
  });
}
