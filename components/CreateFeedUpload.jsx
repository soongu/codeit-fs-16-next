// ~/instagram-next/components/CreateFeedUpload.jsx
import { useRef } from "react";
import { FaImages } from "react-icons/fa6";
import styles from "./CreateFeedModal.module.scss";

// 만들기 모달의 단계 1 — 사진을 고르면 고른 파일들을 배열로 모달에 넘긴다.
const CreateFeedUpload = ({ onFilesSelected }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    // event.target.files 는 배열이 아니라 FileList 다 — 배열로 바꿔서 넘긴다.
    const files = Array.from(event.target.files);

    if (files.length > 0) {
      onFilesSelected(files);
    }

    // 뒤로 와서 같은 사진을 다시 골라도 change 가 일어나게 비워 둔다.
    fileInputRef.current.value = "";
  };

  return (
    <div className={styles.uploadContainer}>
      <div className={styles.uploadArea}>
        <FaImages size={48} color="#262626" />
        <p>사진과 동영상을 여기에 끌어다 놓으세요</p>
        <input
          type="file"
          ref={fileInputRef}
          multiple
          accept="image/jpeg,image/png,image/gif,image/webp,image/avif"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <button
          className={styles.uploadButton}
          onClick={() => fileInputRef.current.click()}
          type="button"
        >
          컴퓨터에서 선택
        </button>
      </div>
    </div>
  );
};

export default CreateFeedUpload;
