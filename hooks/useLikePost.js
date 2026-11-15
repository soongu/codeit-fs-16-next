// ~/instagram-next/hooks/useLikePost.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postApi } from "@/services/api.js";

// liked 는 «바꾸고 싶은» 상태 — 켜려면 누르기, 끄려면 취소. 누가 누르는지는 서버가 로그인 정보로 정한다.
function changeLike({ postId, liked }) {
  return liked ? postApi.likePost(postId) : postApi.unlikePost(postId);
}

// 피드 목록 — 받아 둔 페이지들을 돌며 게시물 하나만 바꾼 새 데이터를 만든다.
// change 는 그 게시물을 받아 바꿀 필드만 돌려주는 함수다.
// 피드를 거치지 않고 상세 주소로 바로 들어왔으면 받아 둔 목록이 없다(undefined) — 그때는 바꾸지 않는다.
// 글 고치기(useUpdatePost)도 이 함수로 바꾼다.
export function changePost(data, postId, change) {
  if (data === undefined) return data;

  return {
    ...data,
    pages: data.pages.map((page) => ({
      ...page,
      items: page.items.map((post) => (post.id === postId ? { ...post, ...change(post) } : post)),
    })),
  };
}

// 상세 화면 — 받아 둔 게시물 하나를 바꾼 새 객체를 만든다. 받아 둔 게시물이 없으면 바꾸지 않는다.
export function changeDetail(post, change) {
  if (post === undefined) return post;

  return { ...post, ...change(post) };
}

// userId 는 지금 보는 사람 — 카드를 그리는 쪽이 내려 준다. 캐시 키를 맞추는 데만 쓴다.
export function useLikePost(userId) {
  const queryClient = useQueryClient();
  // 피드 목록과 상세 화면의 키 — 보는 사람의 번호까지 맞아야 같은 캐시다.
  const postsKey = ["posts", userId];
  const postKey = (postId) => ["post", postId, userId];

  // 같은 게시물이 두 캐시에 따로 들어 있다 — 둘을 함께 바꾼다.
  const changeBoth = (postId, change) => {
    queryClient.setQueryData(postsKey, (data) => changePost(data, postId, change));
    queryClient.setQueryData(postKey(postId), (post) => changeDetail(post, change));
  };

  return useMutation({
    mutationFn: changeLike,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: postsKey });
      await queryClient.cancelQueries({ queryKey: postKey(variables.postId) });
      const previousPosts = queryClient.getQueryData(postsKey);
      const previousPost = queryClient.getQueryData(postKey(variables.postId));

      changeBoth(variables.postId, (post) => ({
        liked: variables.liked,
        likeCount: post.likeCount + (variables.liked ? 1 : -1),
      }));

      return { previousPosts, previousPost };
    },
    onSuccess: (result, variables) => {
      // 서버가 보낸 { liked, likeCount } 로 두 캐시의 그 게시물만 맞춘다.
      changeBoth(variables.postId, () => result);
    },
    onError: async (error, variables, onMutateResult) => {
      // 받아 두지 않았던 캐시는 undefined 라 setQueryData 가 아무것도 하지 않는다.
      queryClient.setQueryData(postsKey, onMutateResult.previousPosts);
      queryClient.setQueryData(postKey(variables.postId), onMutateResult.previousPost);
      console.error(error);
      // 실패했을 때만 서버의 지금 모습을 다시 받는다.
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: postsKey }),
        queryClient.invalidateQueries({ queryKey: postKey(variables.postId) }),
      ]);
    },
  });
}
