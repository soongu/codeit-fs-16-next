// ~/instagram-next/app/[username]/page.js
import styles from '@/components/ProfilePage.module.scss';
import ProfileImage from '@/components/ProfileImage.jsx';
import { profiles } from '@/data/profiles.js';
import { notFound } from 'next/navigation';

export const instant = false;

export function generateStaticParams() {
  return profiles.map((profile) => ({ username: profile.username }));
}

export default async function ProfilePage({ params }) {
  const { username } = await params;

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const profile = profiles.find((item) => item.username === username);


  if (profile === undefined) {
    notFound();
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
