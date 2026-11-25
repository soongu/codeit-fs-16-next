// ~/instagram-next/components/ProfileImage.jsx
import { useRef } from "react";
import Image from "next/image";
import styles from "./ProfileImage.module.scss";
import { ApiError } from "@/services/api.js";
import { useUpdateProfileImage } from "@/hooks/useUpdateProfileImage.js";
import { useUiStore } from "@/stores/useUiStore.js";
import { DEFAULT_PROFILE_IMAGE } from "@/utils/profileImage.js";

// editable 이면(내 프로필이면) 사진을 눌러 새 사진을 고를 수 있다.
const ProfileImage = ({ imageUrl, username, editable }) => {
  const fileInputRef = useRef(null);
  const { mutate } = useUpdateProfileImage();
  const showToast = useUiStore((state) => state.showToast);

  // 사진을 누르면 숨겨 둔 파일 입력을 대신 눌러 파일 고르는 창을 연다.
  const handleImageClick = () => {
    if (editable) {
      fileInputRef.current?.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    // 같은 파일을 다시 골라도 onChange 가 일어나게 입력을 비워 둔다.
    e.target.value = "";
    if (!file) return;

    mutate(file, {
      // 바꾸지 못했으면 사진은 그대로 두고 알림을 띄운다.
      onError: (error) => {
        showToast(error instanceof ApiError ? error.message : "프로필 사진을 바꾸지 못했어요. 다시 시도해 주세요.", "error");
      },
    });
  };

  return (
    <div className={styles.profileImageContainer}>
      <div className={`${styles.profileImage} ${editable ? styles.editable : ""}`} onClick={handleImageClick}>
        <Image
          // 프로필 사진이 없는 사람은 기본 이미지를 보여 준다.
          src={imageUrl ?? DEFAULT_PROFILE_IMAGE}
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
