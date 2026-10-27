// ~/instagram-next/app/[username]/page.js
import styles from '@/components/ProfilePage.module.scss';
import stateStyles from '@/components/StatusMessage.module.scss';
import ProfileImage from '@/components/ProfileImage.jsx';
import { profiles } from '@/data/profiles.js';

export const instant = false;

export default async function ProfilePage({ params }) {
  const { username } = await params;
  const profile = profiles.find((item) => item.username === username);

  if (profile === undefined) {
    return (
      <p className={stateStyles.errorText}>{username} 님의 프로필이 없어요.</p>
    );
  }

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
