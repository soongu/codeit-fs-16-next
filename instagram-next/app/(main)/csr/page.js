// ~/instagram-next/app/(main)/csr/page.js
import page from '@/components/FeedPage.module.scss';
import FeedListClient from '@/components/FeedListClient.jsx';

export default function CsrFeedPage() {
  return (
    <main className={page.mainContent}>
      <FeedListClient />
    </main>
  );
}
