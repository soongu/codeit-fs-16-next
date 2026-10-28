// ~/instagram-next/components/FeedItemHeader.jsx
import Link from 'next/link';
import styles from './FeedItem.module.scss';
import { FaEllipsis } from 'react-icons/fa6';
import Image from 'next/image';

const FeedItemHeader = ({
  username,
  profileImage = 'https://picsum.photos/seed/default/40/40',
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.userInfo}>
        <Link
          href={`/${username}`}
          className={styles.profileLink}>
          <div className={styles.profileImage}>
            <Image
              src={profileImage}
              alt={`${username}의 프로필`}
              width={40}
              height={40}
            />
          </div>
        </Link>
        <div className={styles.userDetails}>
          <Link
            href={`/${username}`}
            className={styles.username}>
            {username}
          </Link>
        </div>
      </div>
      <button className={styles.optionsButton}>
        <FaEllipsis />
      </button>
    </header>
  );
};

export default FeedItemHeader;
