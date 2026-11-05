// ~/next-lab/app/p3-14/homework2/useProfile.js
import { useQuery } from "@tanstack/react-query";

async function getProfile() {
  const response = await fetch("/p3-15/practice2/api");

  if (!response.ok) {
    throw new Error(`프로필을 불러오지 못했어요 (${response.status})`);
  }

  return response.json();
}

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    retry: 1,
    throwOnError: (error, query) => query.state.data === undefined,
  });
}
