// ~/instagram-next/components/FeedItemHeader.jsx
import Link from "next/link";
import Image from "next/image";
import styles from "./FeedItem.module.scss";
import { FaEllipsis } from "react-icons/fa6";
import { DEFAULT_PROFILE_IMAGE } from "@/utils/profileImage.js";
const FeedItemHeader = ({
  username,
  profileImage,
  onOpenOptions,
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.userInfo}>
        <Link href={`/${username}`} className={styles.profileLink}>
          <div className={styles.profileImage}>
            <Image
              // 사진이 없는 사람은 profileImage 가 null 로 온다 - 매개변수 기본값은 undefined 일 때만 쓰인다.
              src={profileImage ?? DEFAULT_PROFILE_IMAGE}
              alt={`${username}의 프로필`}
              width={40}
              height={40}
            />
          </div>
        </Link>
        <div className={styles.userDetails}>
          <Link href={`/${username}`} className={styles.username}>{username}</Link>
        </div>
      </div>
      <button className={styles.optionsButton} onClick={onOpenOptions}><FaEllipsis /></button>
    </header>
  );
};

export default FeedItemHeader;
