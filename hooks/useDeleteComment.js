// ~/instagram-next/hooks/useDeleteComment.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { commentApi, ApiError } from "@/services/api.js";
import { changePost, changeDetail } from "@/hooks/useLikePost.js";
import { changeComment } from "@/hooks/useComments.js";

// 받아 둔 댓글 페이지들에서 그 댓글만 뺀 새 데이터를 만든다. 받아 둔 목록이 없으면 그대로 둔다. 답글 목록에도 쓴다.
function removeFromPages(data, commentId) {
  if (data === undefined) return data;

  return {
    ...data,
    pages: data.pages.map((page) => ({
      ...page,
      items: page.items.filter((comment) => comment.id !== commentId),
    })),
  };
}

// 댓글을 지운다. 다른 탭에서 먼저 지웠으면 404 가 온다. 이미 없는 댓글이니 지운 것으로 보고 null 을 돌려준다.
async function removeComment({ postId, commentId }) {
  try {
    return await commentApi.remove(postId, commentId);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}

// 쓴 사람이나 게시물 주인인지는 서버가 로그인 정보로 확인한다.
// userId 는 지금 보는 사람이다. 피드 목록과 상세 화면의 캐시 키를 맞추는 데만 쓴다.
// 답글을 지울 때는 parentId 에 원댓글 번호를 넣는다. 원댓글을 지울 때는 parentId 가 undefined 다.
export function useDeleteComment(userId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeComment,
    onSuccess: async (result, { postId, commentId, parentId }) => {
      if (parentId === undefined) {
        // 받아 둔 목록에서 그 댓글을 뺀다.
        queryClient.setQueryData(["comments", postId], (data) => removeFromPages(data, commentId));
        // 서버는 원댓글을 지울 때 그 답글도 함께 지운다. 받아 둔 그 원댓글의 답글 목록도 버린다.
        queryClient.removeQueries({ queryKey: ["replies", postId, commentId] });
      } else {
        // 답글이면 그 원댓글의 답글 목록에서 빼고 원댓글 줄의 답글 수를 하나 내린다.
        queryClient.setQueryData(["replies", postId, parentId], (data) => removeFromPages(data, commentId));
        queryClient.setQueryData(["comments", postId], (data) =>
          changeComment(data, parentId, (root) => ({ replyCount: root.replyCount - 1 })),
        );
      }

      // 이미 지워져 있었으면 지금 댓글 수를 모른다. 두 캐시를 서버에서 다시 받는다.
      if (result === null) {
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ["posts", userId] }),
          queryClient.invalidateQueries({ queryKey: ["post", postId, userId] }),
        ]);
        return;
      }

      // 지웠으면 서버가 센 commentCount 로 두 캐시의 그 게시물을 바꾼다.
      const { commentCount } = result;
      queryClient.setQueryData(["posts", userId], (data) => changePost(data, postId, () => ({ commentCount })));
      queryClient.setQueryData(["post", postId, userId], (post) => changeDetail(post, () => ({ commentCount })));
    },
  });
}
