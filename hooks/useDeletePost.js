// ~/instagram-next/hooks/useDeletePost.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postApi } from "@/services/api.js";

// 피드 목록 — 받아 둔 페이지들에서 그 게시물만 뺀 새 데이터를 만든다. 받아 둔 목록이 없으면 그대로 둔다.
function removeFromPages(data, postId) {
  if (data === undefined) return data;

  return {
    ...data,
    pages: data.pages.map((page) => ({
      ...page,
      items: page.items.filter((post) => post.id !== postId),
    })),
  };
}

// 게시물을 지운다 — 글쓴이(또는 관리자)인지는 서버가 로그인 정보로 확인한다.
// userId 는 지금 보는 사람 — 캐시 키를 맞추는 데만 쓴다. 지운 뒤 어디로 갈지는 부르는 쪽이 정한다.
export function useDeletePost(userId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId) => postApi.remove(postId),
    // 피드 캐시에서는 그 게시물을 빼고, 상세 캐시는 통째로 지운다 — 다시 받지 않아도 피드에서 바로 사라진다.
    onSuccess: (deleted, postId) => {
      queryClient.setQueryData(["posts", userId], (data) => removeFromPages(data, postId));
      queryClient.removeQueries({ queryKey: ["post", postId, userId] });
    },
  });
}
