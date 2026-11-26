// ~/instagram-next/components/FollowModal.jsx
import { useEffect, useRef } from "react";
import { IoCloseOutline } from "react-icons/io5";
import styles from "./FollowModal.module.scss";
import status from "./StatusMessage.module.scss";
import FollowUser from "./FollowUser.jsx";
import { useFollowList } from "@/hooks/useFollowList.js";

// 팔로워·팔로잉 목록 모달 - list 가 "followers" 면 팔로워, "following" 이면 팔로잉이다.
// 바깥 어두운 곳이나 닫기 버튼을 누르면 onClose 를 부른다.
const FollowModal = ({ username, list, onClose }) => {
  const { data, isPending, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useFollowList(username, list);
  const loadMoreRef = useRef(null);

  // 목록 맨 아래 감지용 요소가 보이면 다음 20명을 받는다 - 프로필 그리드와 같은 방법이다.
  // 감지용 요소는 모달 안 스크롤 상자에 들어 있어서, 상자를 끝까지 내려야 화면에 들어온다.
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) {
      return;
    }

    const target = loadMoreRef.current;
    if (target === null) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    });

    observer.observe(target);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      {/* 안쪽을 누른 것이 바깥까지 올라가 모달이 닫히지 않게 막는다. */}
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>{list === "followers" ? "팔로워" : "팔로잉"}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <IoCloseOutline size={28} />
          </button>
        </div>
        <div className={styles.userList}>
          {data?.pages.flatMap((page) => page.items).map((user) => <FollowUser key={user.id} user={user} />)}
          {hasNextPage ? <div ref={loadMoreRef} className={status.sentinel} aria-hidden /> : null}
          {(isPending || isFetchingNextPage) && <div className={styles.loadingSpinner}>로딩중...</div>}
          {error && <p className={status.errorText}>목록을 불러오지 못했습니다.</p>}
        </div>
      </div>
    </div>
  );
};

export default FollowModal;
