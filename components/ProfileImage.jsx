// ~/instagram-next/components/ProfileImage.jsx
import Image from "next/image";
import styles from "./ProfileImage.module.scss";

const ProfileImage = ({ imageUrl, username }) => {
  return (
    <div className={styles.profileImageContainer}>
      <div className={styles.profileImage}>
        <Image
          // 프로필 사진이 없는 사람은 기본 이미지를 보여 준다.
          src={imageUrl ?? "/default-profile.svg"}
          alt={`${username}의 프로필`}
          width={150}
          height={150}
          loading="eager"
        />
      </div>
    </div>
  );
};

export default ProfileImage;
