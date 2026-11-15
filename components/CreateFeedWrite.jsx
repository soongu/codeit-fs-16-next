// ~/instagram-next/components/CreateFeedWrite.jsx
import Image from "next/image";
import styles from "./CreateFeedModal.module.scss";
import Carousel from "./Carousel.jsx";
import { useMe } from "@/hooks/useMe.js";

// 게시물 글은 2,200자까지 쓸 수 있다.
const MAX_CONTENT_LENGTH = 2200;

// 만들기 모달의 단계 2 — 왼쪽은 고른 사진들, 오른쪽은 글쓴이와 글 입력칸.
const CreateFeedWrite = ({ previewUrls, content, onContentChange }) => {
  const { data: me } = useMe();

  // 2,200자를 넘게 붙여 넣으면 넘친 만큼 잘라서 넘긴다.
  const handleInput = (event) => {
    onContentChange(event.target.value.slice(0, MAX_CONTENT_LENGTH));
  };

  return (
    <div className={styles.writeContainer}>
      <div className={styles.writeLayout}>
        <div className={styles.previewArea}>
          <Carousel imageUrls={previewUrls} alt="고른 사진 미리보기" />
        </div>

        <div className={styles.writeArea}>
          <div className={styles.userInfo}>
            <div className={styles.profileImage}>
              <Image
                // 프로필 사진이 없는 사람은 기본 이미지를 보여 준다.
                src={me?.profileImage ?? "/default-profile.svg"}
                alt="프로필"
                width={28}
                height={28}
              />
            </div>
            <span className={styles.username}>{me?.username}</span>
          </div>

          <div className={styles.contentInput}>
            <textarea
              rows={10}
              value={content}
              onChange={handleInput}
              placeholder="문구 입력..."
            />
            <div className={`${styles.charCounter} ${content.length >= MAX_CONTENT_LENGTH ? styles.exceed : ""}`}>
              {content.length.toLocaleString()}/2,200
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFeedWrite;
