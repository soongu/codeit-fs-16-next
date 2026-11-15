// ~/instagram-next/components/CreateFeedUpload.jsx
import { useRef, useState } from "react";
import { FaImages } from "react-icons/fa6";
import styles from "./CreateFeedModal.module.scss";

// 만들기 모달의 단계 1 — 사진을 고르거나 끌어다 놓으면 그 파일들을 배열로 모달에 넘긴다.
const CreateFeedUpload = ({ onFilesSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // 고른 파일과 끌어다 놓은 파일은 둘 다 FileList 다 — 배열로 바꿔서 넘긴다.
  const selectFiles = (fileList) => {
    const files = Array.from(fileList);

    if (files.length > 0) {
      onFilesSelected(files);
    }
  };

  // 끄는 동안 기본 동작을 막아야 이 상자에 놓을 수 있다.
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  // 놓은 파일은 브라우저가 열지 않게 막고, 고른 파일과 같은 함수로 넘긴다.
  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    selectFiles(event.dataTransfer.files);
  };

  const handleFileChange = (event) => {
    selectFiles(event.target.files);

    // 뒤로 와서 같은 사진을 다시 골라도 change 가 일어나게 비워 둔다.
    fileInputRef.current.value = "";
  };

  return (
    <div className={styles.uploadContainer}>
      <div
        className={`${styles.uploadArea} ${isDragging ? styles.dragover : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
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
