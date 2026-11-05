// ~/next-lab/app/p3-14/homework2/FollowButton.jsx
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

async function follow() {
  const response = await fetch("/p3-15/practice1/api", { method: "POST" });

  if (!response.ok) {
    throw new Error(`팔로우하지 못했어요 (${response.status})`);
  }

  return response.json();
}

export default function FollowButton() {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: follow,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <div className="mt-4">
      <button type="button" className="rounded border px-2" onClick={() => mutate()} disabled={isPending}>
        {isPending ? "팔로우하는 중…" : "팔로우"}
      </button>
      {error && <p className="mt-2 text-red-500">팔로우하지 못했어요. 잠시 뒤에 다시 눌러 주세요.</p>}
    </div>
  );
}
