// ~/instagram-next/components/FeedItemCaption.jsx
import styles from './FeedItem.module.scss';
import { timeAgo } from '../utils/timeAgo.js';

const FeedItemCaption = ({ content, createdAt }) => {
  return (
    <>
      <span className={styles.caption}>{content}</span>
      <div className={styles.time}>{timeAgo(createdAt)}</div>
    </>
  );
};

export default FeedItemCaption;


