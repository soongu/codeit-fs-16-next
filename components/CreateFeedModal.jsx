// ~/instagram-next/components/CreateFeedModal.jsx
import { useState } from "react";
import Image from "next/image";
import { FaXmark } from "react-icons/fa6";
import styles from "./CreateFeedModal.module.scss";
import carousel from "./Carousel.module.scss";
import CreateFeedHeader from "./CreateFeedHeader.jsx";
import CreateFeedUpload from "./CreateFeedUpload.jsx";

const CreateFeedModal = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // 사진을 고르면 미리보기 주소를 만들고 단계 2 로 간다.
  const handleFileSelected = (selected) => {
    setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));
    setStep(2);
  };

  // 지금은 고른 파일을 Console 에 찍기만 한다.
  const handleShare = () => {
    console.log("올릴 파일:", file);
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
              <div className={styles.previewContainer}>
                <div className={styles.previewArea}>
                  <div className={carousel.carouselSlide}>
                    <Image
                      src={previewUrl}
                      alt="고른 사진 미리보기"
                      width={600}
                      height={600}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFeedModal;
