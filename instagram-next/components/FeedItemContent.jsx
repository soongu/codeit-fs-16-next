// ~/instagram-next/components/FeedItemContent.jsx
import Link from 'next/link';
import styles from './FeedItem.module.scss';
import FeedItemCaption from './FeedItemCaption.jsx';

const FeedItemContent = ({ username, content, createdAt }) => {
  return (
    <div className={styles.text}>
      <Link
        href={`/${username}`}
        className={styles.username}>
        {username}
      </Link>
      <FeedItemCaption
        content={content}
        createdAt={createdAt}
      />
    </div>
  );
};

export default FeedItemContent;
