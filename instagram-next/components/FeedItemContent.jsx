// ~/instagram-next/components/FeedItemContent.jsx
import styles from './FeedItem.module.scss';
import FeedItemCaption from './FeedItemCaption.jsx';

const FeedItemContent = ({ username, content, createdAt }) => {
  return (
    <div className={styles.text}>
      <a
        href={`/${username}`}
        className={styles.username}>
        {username}
      </a>
      <FeedItemCaption
        content={content}
        createdAt={createdAt}
      />
    </div>
  );
};

export default FeedItemContent;
