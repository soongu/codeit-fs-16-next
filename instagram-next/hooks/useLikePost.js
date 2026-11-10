import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MY_USER_ID } from '@/utils/me.js';
import { postApi } from '@/services/api.js';

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

// liked 는 «바꾸고 싶은» 상태 — 켜려면 누르기, 끄려면 취소.
function changeLike({ postId, liked }) {
  return liked ? postApi.likePost(postId, MY_USER_ID) : postApi.unlikePost(postId, MY_USER_ID);
}

export function useLikePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changeLike,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ['posts'] });
      const previousPosts = queryClient.getQueryData(['posts']);

      queryClient.setQueryData(['posts'], (data) =>
        changePost(data, variables.postId, (post) => ({
          liked: variables.liked,
          likeCount: post.likeCount + (variables.liked ? 1 : -1),
        })),
      );

      return { previousPosts };
    },
    onSuccess: (result, variables) => {
      // 서버가 돌려준 { liked, likeCount } 로 그 게시물만 맞춘다.
      queryClient.setQueryData(['posts'], (data) =>
        changePost(data, variables.postId, () => result),
      );
    },
    onError: async (error, variables, onMutateResult) => {
      queryClient.setQueryData(['posts'], onMutateResult.previousPosts);
      console.error(error);
      // 실패했을 때만 서버의 지금 모습을 다시 받는다.
      await queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}
