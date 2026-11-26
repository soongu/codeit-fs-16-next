// ~/instagram-next/app/(main)/direct/layout.js
import styles from "@/components/DirectPage.module.scss";
import DirectContainer from "@/components/DirectContainer.jsx";
import ConversationList from "@/components/ConversationList.jsx";

// DM 화면의 틀 - 왼쪽은 대화방 목록, 오른쪽은 주소에 따라 바뀌는 페이지다.
// 방을 바꿔도 이 레이아웃은 그대로라 목록을 다시 그리지 않는다.
export default function DirectLayout({ children }) {
  return (
    <DirectContainer>
      <div className={styles.list}>
        <ConversationList />
      </div>
      {children}
    </DirectContainer>
  );
}
