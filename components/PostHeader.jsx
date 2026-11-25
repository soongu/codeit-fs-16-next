// ~/instagram-next/components/PostHeader.jsx
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaEllipsis } from "react-icons/fa6";
import styles from "./PostDetailModal.module.scss";
import { DEFAULT_PROFILE_IMAGE } from "@/utils/profileImage.js";

const PostHeader = ({
  username,
  profileImage,
  onOpenOptions,
}) => {
  const router = useRouter();

  // 사진이나 사용자 이름을 누르면 그 사람의 프로필로 간다.
  const handleUserClick = () => router.push(`/${username}`);

  return (
    <header className={styles.postHeader}>
      <div className={styles.postUserInfo}>
        <div className={styles.postProfileImage} onClick={handleUserClick} style={{ cursor: "pointer" }}>
          <Image
            // 사진이 없는 사람은 profileImage 가 null 로 온다 - 매개변수 기본값은 undefined 일 때만 쓰인다.
            src={profileImage ?? DEFAULT_PROFILE_IMAGE}
            alt="Profile"
            width={40}
            height={40}
          />
        </div>
        <span className={styles.postUsername} onClick={handleUserClick}>
          {username}
        </span>
      </div>
      <div className={styles.postHeaderRight}>
        <button type="button" className={styles.postOptionsButton} onClick={onOpenOptions}>
          <FaEllipsis />
        </button>
      </div>
    </header>
  );
};

export default PostHeader;
