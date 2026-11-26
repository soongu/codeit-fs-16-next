// ~/instagram-next/components/FollowUser.jsx
import styles from "./FollowModal.module.scss";
import ProfileImage from "./ProfileImage.jsx";

// 팔로워·팔로잉 목록의 한 줄 - 사진 · 사용자 이름 · 이름.
const FollowUser = ({ user }) => {
  return (
    <div className={styles.userItem}>
      <div className={styles.userInfo}>
        <ProfileImage imageUrl={user.profileImage} username={user.username} editable={false} size="small" />
        <div className={styles.textInfo}>
          <span className={styles.username}>{user.username}</span>
          <span className={styles.name}>{user.name}</span>
        </div>
      </div>
    </div>
  );
};

export default FollowUser;
