// ~/instagram-next/app/(main)/page.js
import page from '@/components/FeedPage.module.scss';
import FeedList from '@/components/FeedList.jsx';

export default function Home() {
  return (
    <main className={page.mainContent}>
      <FeedList />
    </main>
  );
}
