// ~/instagram-next/components/HashtagPosts.jsx
import styles from "./StatusMessage.module.scss";
import profile from "./ProfilePage.module.scss";

const HashtagPosts = ({ name }) => {
  return (
    // 바깥 상자는 프로필 화면의 것을 쓴다 - 사이드바만큼 띄우고 그리드와 같은 폭(935px)이다.
    <main className={profile.profileMain}>
      <header className={styles.hashtagHeader}>
        <h1 className={styles.hashtagTitle}>#{name}</h1>
      </header>
    </main>
  );
};

export default HashtagPosts;
