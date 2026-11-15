// ~/instagram-next/components/CreateFeedModal.jsx
import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import styles from "./CreateFeedModal.module.scss";
import CreateFeedHeader from "./CreateFeedHeader.jsx";
import CreateFeedUpload from "./CreateFeedUpload.jsx";
import CreateFeedWrite from "./CreateFeedWrite.jsx";
import { uploadApi } from "@/services/api.js";

const CreateFeedModal = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [content, setContent] = useState("");

  // 사진을 고르면 파일마다 미리보기 주소를 만들고 단계 2 로 간다.
  const handleFilesSelected = (selected) => {
    setFiles(selected);
    setPreviewUrls(selected.map((file) => URL.createObjectURL(file)));
    setStep(2);
  };

  // 미리보기 주소 목록이 바뀌면(다시 고르면) 앞 목록을, 모달이 닫히면 마지막 목록을 해제한다.
  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  // 지금은 사진만 올리고, 서버가 돌려준 사진 주소를 Console 에 찍는다.
  const handleShare = async () => {
    const { imageUrls } = await uploadApi.images(files);
    console.log("올린 사진 주소:", imageUrls);
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
            <CreateFeedUpload onFilesSelected={handleFilesSelected} />
          </div>

          <div className={`${styles.step} ${step === 2 ? styles.active : ""}`}>
            {step === 2 && (
              <CreateFeedWrite
                previewUrls={previewUrls}
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
