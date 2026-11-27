// ~/instagram-next/components/CreateFeedUpload.jsx
import { useRef, useState } from "react";
import { FaImages } from "react-icons/fa6";
import styles from "./CreateFeedModal.module.scss";
import { useUiStore } from "@/stores/useUiStore.js";

// 서버와 같은 규칙 — 한 번에 10장까지 · 한 장에 5MB까지 · 사진은 네 종류만 받는다.
const MAX_FILES = 10;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

// 만들기 모달의 단계 1 — 사진을 고르거나 끌어다 놓으면 그 파일들을 배열로 모달에 넘긴다.
const CreateFeedUpload = ({ onFilesSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const showToast = useUiStore((state) => state.showToast);

  // 고른 파일과 끌어다 놓은 파일은 둘 다 FileList 다 — 배열로 바꾼 뒤, 보내기 전에 서버와 같은 규칙으로 살핀다.
  const selectFiles = (fileList) => {
    const files = Array.from(fileList);

    // 10장을 넘으면 하나도 넘기지 않는다 — 어느 사진을 뺄지는 고른 사람이 정한다.
    if (files.length > MAX_FILES) {
      showToast(`사진은 ${MAX_FILES}장까지 올릴 수 있어요`, "error");
      return;
    }

    // 규칙에 맞는 파일만 넘긴다. 뺀 파일이 있으면 알림 하나로 알린다 — 알림은 한 번에 하나만 보인다.
    const allowed = files.filter((file) => IMAGE_TYPES.includes(file.type) && file.size <= MAX_FILE_SIZE);

    if (allowed.length < files.length) {
      showToast(`${files.length - allowed.length}개는 올릴 수 없어서 뺐어요. 사진 파일만, 한 장에 5MB까지 올릴 수 있어요`, "error");
    }

    // 남은 파일이 없으면 단계 1 에 그대로 있는다.
    if (allowed.length > 0) {
      onFilesSelected(allowed);
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
