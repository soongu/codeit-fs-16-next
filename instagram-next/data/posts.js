// ~/instagram-next/data/posts.js

import { cacheLife, cacheTag } from "next/cache";

// 지금으로부터 몇 분 전인 시각을 만들어요 — 파트2 서버가 보내던 모양의 글자로.
const minutesBefore = (minutes) =>
  new Date(Date.now() - minutes * 60 * 1000).toISOString();

export const posts = [
  {
    id: 1,
    username: 'jaehoon',
    profileImage: 'https://picsum.photos/seed/jaehoon/40/40',
    postImage: 'https://picsum.photos/seed/post1/600/600',
    postAlt: '노을 진 한강',
    content: '퇴근길에 한강이 너무 예뻤어요',
    createdAt: minutesBefore(12),
    likeCount: 130,
    liked: false,
    commentCount: 3,
  },
  {
    id: 2,
    username: 'minji',
    profileImage: 'https://picsum.photos/seed/minji/40/40',
    postImage: 'https://picsum.photos/seed/post2/600/600',
    postAlt: '갓 구운 크루아상',
    content: '오늘 아침에 구운 크루아상',
    createdAt: minutesBefore(45),
    likeCount: 512,
    liked: false,
    commentCount: 4,
  },
  {
    id: 3,
    username: 'seungwoo',
    profileImage: 'https://picsum.photos/seed/seungwoo/40/40',
    postImage: 'https://picsum.photos/seed/post3/600/600',
    postAlt: '농구 코트',
    content: '주말마다 여기 옵니다',
    createdAt: minutesBefore(180),
    likeCount: 76,
    liked: false,
    commentCount: 2,
  },
];


// 게시물 목록을 돌려줘요. 데이터베이스에서 읽는 것처럼 2초 기다려요.
export async function getPosts() {
  'use cache';
  cacheLife("hours");
  cacheTag('posts');

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return posts;
}