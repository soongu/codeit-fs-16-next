// ~/instagram-next/app/(main)/[username]/saved/page.js
import { Suspense } from "react";
import styles from "@/components/ProfilePage.module.scss";
import SavedPosts from "@/components/SavedPosts.jsx";

export const instant = false;

async function SavedContent({ params }) {
  const { username } = await params;

  return <SavedPosts username={username} />;
}

export default function SavedPage({ params }) {
  return (
    <main className={styles.profileMain}>
      <Suspense fallback={null}>
        <SavedContent params={params} />
      </Suspense>
    </main>
  );
}
