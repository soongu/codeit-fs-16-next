// ~/instagram-next/components/ProfileHeader.jsx
"use client";

import styles from "./ProfilePage.module.scss";
import status from "./StatusMessage.module.scss";
import ProfileImage from "./ProfileImage.jsx";
import { useProfile } from "@/hooks/useProfile.js";

// 프로필 헤더 - 사진 · 사용자 이름 · 게시물 수 · 이름을 서버에서 받아 그린다.
const ProfileHeader = ({ username }) => {
  const { data: profile, isPending, error } = useProfile(username);

  if (isPending) {
    return <p className={status.loadingText}>로딩 중...</p>;
  }

  // 그런 사람이 없다는 답(404)이면 없는 주소와 같은 문장을 보여 준다.
  if (error?.status === 404) {
    return <p className={status.emptyHint}>이런 주소는 없어요.</p>;
  }

  if (error) {
    return <p className={status.errorText}>프로필을 불러오지 못했습니다.</p>;
  }

  return (
    <header className={styles.profileHeader}>
      <ProfileImage imageUrl={profile.profileImage} username={profile.username} />

      <div className={styles.profileInfo}>
        <div className={styles.profileActions}>
          <h2 className={styles.username}>{profile.username}</h2>
        </div>

        <ul className={styles.profileStats}>
          <li>
            게시물 <span className={styles.statsNumber}>{profile.postCount}</span>
          </li>
        </ul>

        <div className={styles.profileBio}>
          <span className={styles.fullName}>{profile.name}</span>
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
