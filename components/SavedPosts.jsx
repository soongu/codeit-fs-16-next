// ~/instagram-next/components/SavedPosts.jsx
"use client";

import styles from "./StatusMessage.module.scss";
import { useProfile } from "@/hooks/useProfile.js";

// 저장한 게시물 - 아직 저장하기가 없어서 그런 사람이 있는지만 서버에 묻는다.
const SavedPosts = ({ username }) => {
  const { data: profile, isPending, error } = useProfile(username);

  if (isPending) {
    return <p className={styles.loadingText}>로딩 중...</p>;
  }

  if (error?.status === 404) {
    return <p className={styles.emptyHint}>이런 주소는 없어요.</p>;
  }

  if (error) {
    return <p className={styles.errorText}>프로필을 불러오지 못했습니다.</p>;
  }

  return <p className={styles.emptyHint}>{profile.username} 님이 저장한 게시물이 아직 없어요.</p>;
};

export default SavedPosts;
