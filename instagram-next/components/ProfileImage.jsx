// ~/instagram-react/src/components/ProfileImage.jsx
import Image from 'next/image';
import styles from './ProfileImage.module.scss';

const ProfileImage = ({ imageUrl, username }) => {
  return (
    <div className={styles.profileImageContainer}>
      <div className={styles.profileImage}>
        <Image
          src={imageUrl}
          alt={`${username}의 프로필`}
          width={150}
          height={150}
          loading='eager'
        />
      </div>
    </div>
  );
};

export default ProfileImage;
