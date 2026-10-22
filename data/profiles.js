// ~/instagram-next/data/profiles.js
import { cacheLife } from "next/cache";

export const profiles = [
  {
    username: "jaehoon",
    name: "김재훈",
    profileImage: "https://picsum.photos/seed/jaehoon/150/150",
    postCount: 3,
    followerCount: 1240,
    followingCount: 312,
  },
  {
    username: "minji",
    name: "이민지",
    profileImage: "https://picsum.photos/seed/minji/150/150",
    postCount: 3,
    followerCount: 8520,
    followingCount: 401,
  },
  {
    username: "seungwoo",
    name: "박승우",
    profileImage: "https://picsum.photos/seed/seungwoo/150/150",
    postCount: 3,
    followerCount: 974,
    followingCount: 233,
  },
];

// 한 사람의 프로필을 돌려줘요.
export async function getProfile(username) {
  "use cache";
  cacheLife("hours");

  return profiles.find((item) => item.username === username);
}
