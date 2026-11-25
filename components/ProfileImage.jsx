// ~/instagram-next/components/ProfileImage.jsx
import { useRef } from "react";
import Image from "next/image";
import styles from "./ProfileImage.module.scss";

// editable 이면(내 프로필이면) 사진을 눌러 새 사진을 고를 수 있다.
const ProfileImage = ({ imageUrl, username, editable }) => {
  const fileInputRef = useRef(null);

  // 사진을 누르면 숨겨 둔 파일 입력을 대신 눌러 파일 고르는 창을 연다.
  const handleImageClick = () => {
    if (editable) {
      fileInputRef.current?.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log("고른 사진:", file.name, file.type, file.size);
  };

  return (
    <div className={styles.profileImageContainer}>
      <div className={`${styles.profileImage} ${editable ? styles.editable : ""}`} onClick={handleImageClick}>
        <Image
          // 프로필 사진이 없는 사람은 기본 이미지를 보여 준다.
          src={imageUrl ?? "/default-profile.svg"}
          alt={`${username}의 프로필`}
          width={150}
          height={150}
          loading="eager"
        />
      </div>
      {editable && (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
      )}
    </div>
  );
};

export default ProfileImage;
