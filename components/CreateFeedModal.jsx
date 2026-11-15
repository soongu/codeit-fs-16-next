// ~/instagram-next/components/CreateFeedModal.jsx
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaXmark } from "react-icons/fa6";
import styles from "./CreateFeedModal.module.scss";
import CreateFeedHeader from "./CreateFeedHeader.jsx";
import CreateFeedUpload from "./CreateFeedUpload.jsx";
import CreateFeedWrite from "./CreateFeedWrite.jsx";
import { postApi, uploadApi } from "@/services/api.js";

const CreateFeedModal = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();

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

  const { mutate, isPending } = useMutation({
    // 사진을 먼저 올려 주소를 받고, 그 주소와 글로 게시물을 만든다.
    mutationFn: async () => {
      const { imageUrls } = await uploadApi.images(files);
      // 사진의 대체 텍스트(alt)를 받는 입력칸이 따로 없어서 글을 그대로 보낸다.
      await postApi.create({ content, postAlt: content, imageUrls });
    },
    // 피드를 다시 받은 뒤에 모달을 닫는다 — 모달이 닫히면 새 게시물이 피드 맨 위에 있다.
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
      onClose();
    },
    // 실패를 알리는 문장은 아직 없다 — Console 에만 남긴다.
    onError: (error) => {
      console.error(error);
    },
  });

  const handleShare = () => {
    mutate();
  };

  // 올리는 동안에는 ✕ 나 바깥을 눌러도 닫지 않는다.
  const handleClose = () => {
    if (isPending) return;
    onClose();
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalBackdrop} onClick={handleClose} />

      <button className={styles.modalCloseButton} onClick={handleClose} type="button">
        <FaXmark />
      </button>

      <div className={styles.modalContent}>
        <CreateFeedHeader
          step={step}
          isSharing={isPending}
          onBack={() => setStep(1)}
          onShare={handleShare}
        />

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
