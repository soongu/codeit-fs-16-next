// ~/instagram-next/components/FeedItemCaption.jsx
import styles from './FeedItem.module.scss';
import { formatDate } from '../utils/formatDate.js';

const FeedItemCaption = ({ content, createdAt }) => {
  return (
    <>
      <span className={styles.caption}>{content}</span>
      <div className={styles.time}>{formatDate(createdAt)}</div>
    </>
  );
};

export default FeedItemCaption;
