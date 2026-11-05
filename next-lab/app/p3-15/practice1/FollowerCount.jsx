// ~/next-lab/app/p3-14/homework2/FollowerCount.jsx
"use client";

import { useProfile } from "./useProfile.js";

export default function FollowerCount() {
  const { data, isPending, isFetching } = useProfile();

  if (isPending) {
    return <p className="mt-4">불러오는 중…</p>;
  }

  return (
    <p className="mt-4">
      팔로워 {data.followerCount.toLocaleString()}명{isFetching && " · 새로 확인하는 중"}
    </p>
  );
}
