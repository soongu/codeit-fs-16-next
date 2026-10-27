// ~/instagram-next/app/jaehoon/page.js
import styles from '@/components/ProfilePage.module.scss';
import ProfileImage from '@/components/ProfileImage.jsx';
import { profile } from './profile.js';

export default function ProfilePage() {
  return (
    <main className={styles.profileMain}>
      <header className={styles.profileHeader}>
        <ProfileImage
          imageUrl={profile.profileImage}
          username={profile.username}
        />

        <div className={styles.profileInfo}>
          <div className={styles.profileActions}>
            <h2 className={styles.username}>{profile.username}</h2>
          </div>

          <ul className={styles.profileStats}>
            <li>
              게시물{' '}
              <span className={styles.statsNumber}>{profile.postCount}</span>
            </li>
            <li>
              팔로워{' '}
              <span className={styles.statsNumber}>
                {profile.followerCount}
              </span>
            </li>
            <li>
              팔로우{' '}
              <span className={styles.statsNumber}>
                {profile.followingCount}
              </span>
            </li>
          </ul>

          <div className={styles.profileBio}>
            <span className={styles.fullName}>{profile.name}</span>
          </div>
        </div>
      </header>
    </main>
  );
}
