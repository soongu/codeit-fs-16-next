// ~/instagram-next/components/CreateFeedModal.jsx
import { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import styles from "./CreateFeedModal.module.scss";
import CreateFeedHeader from "./CreateFeedHeader.jsx";
import CreateFeedUpload from "./CreateFeedUpload.jsx";
import CreateFeedWrite from "./CreateFeedWrite.jsx";

const CreateFeedModal = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [content, setContent] = useState("");

  // 사진을 고르면 미리보기 주소를 만들고 단계 2 로 간다.
  const handleFileSelected = (selected) => {
    setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));
    setStep(2);
  };

  // 지금은 고른 파일과 쓴 글을 Console 에 찍기만 한다.
  const handleShare = () => {
    console.log("올릴 파일:", file);
    console.log("쓴 글:", content);
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalBackdrop} onClick={onClose} />

      <button className={styles.modalCloseButton} onClick={onClose} type="button">
        <FaXmark />
      </button>

      <div className={styles.modalContent}>
        <CreateFeedHeader step={step} onBack={() => setStep(1)} onShare={handleShare} />

        <div className={styles.modalBody}>
          <div className={`${styles.step} ${step === 1 ? styles.active : ""}`}>
            <CreateFeedUpload onFileSelected={handleFileSelected} />
          </div>

          <div className={`${styles.step} ${step === 2 ? styles.active : ""}`}>
            {step === 2 && (
              <CreateFeedWrite
                previewUrl={previewUrl}
                content={content}
                onContentChange={setContent}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFeedModal;
