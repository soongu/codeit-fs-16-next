// ~/instagram-next/components/FollowUser.jsx
import styles from "./FollowModal.module.scss";
import ProfileImage from "./ProfileImage.jsx";
import { useMe } from "@/hooks/useMe.js";
import { useFollow } from "@/hooks/useFollow.js";

// 팔로워·팔로잉 목록의 한 줄 - 사진 · 사용자 이름 · 이름 · 팔로우 버튼.
// 줄마다 useFollow 를 부르려고 한 줄을 컴포넌트 하나로 뗐다(Hook 은 반복문 안에서 부를 수 없다).
const FollowUser = ({ user }) => {
  const { data: me } = useMe();
  const follow = useFollow(user.username);

  return (
    <div className={styles.userItem}>
      <div className={styles.userInfo}>
        <ProfileImage imageUrl={user.profileImage} username={user.username} editable={false} size="small" />
        <div className={styles.textInfo}>
          <span className={styles.username}>{user.username}</span>
          <span className={styles.name}>{user.name}</span>
        </div>
      </div>
      {/* 내 줄에는 버튼이 없다 - 프로필 헤더처럼 «나는 누구» 와 비교한다. */}
      {me && me.username !== user.username && (
        <button
          className={`${styles.followButton} ${user.isFollowing ? styles.following : ""}`}
          onClick={() => follow.mutate(!user.isFollowing)}
          disabled={follow.isPending}
        >
          {user.isFollowing ? "팔로잉" : "팔로우"}
        </button>
      )}
    </div>
  );
};

export default FollowUser;
