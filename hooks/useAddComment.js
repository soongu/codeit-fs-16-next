// ~/instagram-next/hooks/useAddComment.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { commentApi } from "@/services/api.js";
import { changePost, changeDetail } from "@/hooks/useLikePost.js";
import { changeComment } from "@/hooks/useComments.js";

// 받아 둔 댓글 목록의 마지막 페이지 끝에 새 댓글을 붙인 새 데이터를 만든다. 답글 목록도 같은 꼴이라 함께 쓴다.
// 새 댓글은 가장 늦게 단 것이라 오래된 순 목록의 맨 끝에 온다.
// 마지막 페이지 뒤에 아직 받을 페이지가 남았으면(hasNext) 그대로 둔다. + 로 끝까지 받으면 그 페이지에 함께 온다.
// 받아 둔 목록이 없으면(모달을 연 적이 없으면) 그대로 둔다.
function appendComment(data, comment) {
  if (data === undefined) return data;

  const lastIndex = data.pages.length - 1;
  if (data.pages[lastIndex].hasNext) return data;

  return {
    ...data,
    pages: data.pages.map((page, index) =>
      index === lastIndex ? { ...page, items: [...page.items, comment] } : page,
    ),
  };
}

// 게시물에 댓글을 단다. 누가 다는지는 서버가 로그인 정보로 정한다.
// userId 는 지금 보는 사람이다. 피드 목록과 상세 화면의 캐시 키를 맞추는 데만 쓴다.
export function useAddComment(userId) {
  const queryClient = useQueryClient();

  return useMutation({
    // parentId 가 있으면 답글이다. 답글을 다는 입력창이 원댓글 번호를 넣어 보낸다.
    mutationFn: ({ postId, content, parentId }) => commentApi.create(postId, content, parentId),
    // 다시 받지 않고 서버가 돌려준 댓글을 받아 둔 목록에 붙인다.
    // 댓글 수는 서버가 센 commentCount 로 피드 목록과 상세 화면 두 캐시의 그 게시물을 함께 바꾼다.
    onSuccess: ({ comment, commentCount }, { postId, parentId }) => {
      if (parentId === undefined) {
        queryClient.setQueryData(["comments", postId], (data) => appendComment(data, comment));
      } else {
        // 답글은 원댓글 목록이 아니라 그 원댓글의 답글 목록 끝에 붙인다. 원댓글 목록과 같은 규칙이라 끝까지 받아 둔 때만 붙인다.
        queryClient.setQueryData(["replies", postId, parentId], (data) => appendComment(data, comment));
        // 원댓글 줄의 답글 수를 하나 올린다. «답글 보기(N개)» 의 남은 수는 이 숫자에서 받은 답글 수를 뺀 값이다.
        queryClient.setQueryData(["comments", postId], (data) =>
          changeComment(data, parentId, (root) => ({ replyCount: root.replyCount + 1 })),
        );
      }

      // 답글은 게시물의 댓글 수에 세지 않는다. 서버가 그대로인 commentCount 를 보내므로 같은 줄로 덮어도 숫자는 그대로다.
      queryClient.setQueryData(["posts", userId], (data) => changePost(data, postId, () => ({ commentCount })));
      queryClient.setQueryData(["post", postId, userId], (post) => changeDetail(post, () => ({ commentCount })));
    },
  });
}
