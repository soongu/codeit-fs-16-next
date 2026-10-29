// ~/instagram-next/app/(main)/[username]/page.js
import { notFound, redirect } from 'next/navigation';
import styles from '@/components/ProfilePage.module.scss';
import ProfileImage from '@/components/ProfileImage.jsx';
import { profiles, getProfile } from '@/data/profiles.js';

export const instant = false;

export function generateStaticParams() {
  return profiles.map((profile) => ({ username: profile.username }));
}

export async function generateMetadata({ params }) {
  const { username } = await params;
  const profile = await getProfile(username);

  if (profile === undefined) {
    return {};
  }

  return {
    title: `${profile.name}(@${profile.username})`,
    description: `게시물 ${profile.postCount}개, 팔로워 ${profile.followerCount}명, 팔로우 ${profile.followingCount}명`,
  };
}

export default async function ProfilePage({ params }) {
  const { username } = await params;

  if (username !== username.toLowerCase()) {
    redirect(`/${username.toLowerCase()}`);
  }

  const profile = await getProfile(username);

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
