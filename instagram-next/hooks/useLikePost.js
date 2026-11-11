// ~/instagram-next/hooks/useLikePost.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postApi } from '@/services/api.js';

// liked 는 «바꾸고 싶은» 상태 — 켜려면 누르기, 끄려면 취소.
function changeLike(userId, { postId, liked }) {
  return liked
    ? postApi.likePost(postId, userId)
    : postApi.unlikePost(postId, userId);
}

// 받아 둔 페이지들을 돌며 게시물 하나만 바꾼 새 데이터를 만든다.
// change 는 그 게시물을 받아 바꿀 필드만 돌려주는 함수다.
function changePost(data, postId, change) {
  return {
    ...data,
    pages: data.pages.map((page) => ({
      ...page,
      items: page.items.map((post) =>
        post.id === postId ? { ...post, ...change(post) } : post,
      ),
    })),
  };
}

// userId 는 지금 보는 사람 — 목록을 받은 FeedList 가 카드에 내려 준다.
export function useLikePost(userId) {
  const queryClient = useQueryClient();
  // 피드 목록과 같은 키 — 보는 사람의 번호까지 맞아야 같은 캐시다.
  const postsKey = ['posts', userId];
  console.log('postsKey', postsKey);

  return useMutation({
    mutationFn: (variables) => changeLike(userId, variables),
    onMutate: async (variables) => {
      try {
        await queryClient.cancelQueries({ queryKey: postsKey });
        const previousPosts = queryClient.getQueryData(postsKey);
        console.log('onMutate:', postsKey, previousPosts);

        queryClient.setQueryData(postsKey, (data) =>
          changePost(data, variables.postId, (post) => ({
            liked: variables.liked,
            likeCount: post.likeCount + (variables.liked ? 1 : -1),
          })),
        );

        return { previousPosts };
      } catch (error) {
        console.error('onMuate throws: ', error);
        throw e;
      }
    },
    onSuccess: (result, variables) => {
      // 서버가 돌려준 { liked, likeCount } 로 그 게시물만 맞춘다.
      queryClient.setQueryData(postsKey, (data) =>
        changePost(data, variables.postId, () => result),
      );
    },
    onError: async (error, variables, onMutateResult) => {
      if (onMutateResult !== undefined) {
        queryClient.setQueryData(postsKey, onMutateResult.previousPosts);
      }
      console.error(error);
      // 실패했을 때만 서버의 지금 모습을 다시 받는다.
      await queryClient.invalidateQueries({ queryKey: postsKey });
    },
  });
}
