// ~/instagram-next/components/FeedItemCaption.jsx
import styles from "./FeedItem.module.scss";
import { timeAgo } from "../utils/timeAgo.js";
import HashtagText from "./HashtagText.jsx";

const FeedItemCaption = ({ content, createdAt }) => {
  return (
    <>
      <span className={styles.caption}>
        <HashtagText text={content} />
      </span>
      <div className={styles.time}>{timeAgo(createdAt)}</div>
    </>
  );
};

export default FeedItemCaption;
