// ~/next-lab/app/p3-14/homework2/ProfileName.jsx
"use client";

import { useProfile } from "./useProfile.js";

export default function ProfileName() {
  const { data, isPending } = useProfile();

  if (isPending) {
    return <h2 className="text-xl font-semibold">…</h2>;
  }

  return (
    <h2 className="text-xl font-semibold">
      {data.name} (@{data.username})
    </h2>
  );
}
