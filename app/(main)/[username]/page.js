// ~/instagram-next/app/(main)/[username]/page.js
import { Suspense } from "react";
import styles from "@/components/ProfilePage.module.scss";
import ProfileHeader from "@/components/ProfileHeader.jsx";

export const instant = false;

// 탭 제목에는 주소의 사용자 이름만 싣는다 - 이름과 숫자는 화면이 서버에서 받는다.
export async function generateMetadata({ params }) {
  const { username } = await params;

  return { title: `@${username}` };
}

async function ProfileContent({ params }) {
  const { username } = await params;

  return <ProfileHeader username={username} />;
}

// 주소의 사용자 이름을 읽는 부분은 Suspense 안에 둔다 - 상세 페이지가 주소의 번호를 읽을 때와 같다.
export default function ProfilePage({ params }) {
  return (
    <main className={styles.profileMain}>
      <Suspense fallback={null}>
        <ProfileContent params={params} />
      </Suspense>
    </main>
  );
}
