// ~/next-lab/app/page.js
import ProfileRow from '@/components/ProfileRow.jsx';

export default function Home() {
  return (
    <main>
      <ProfileRow
        username='seungwoo'
        profileImage='https://picsum.photos/seed/seungwoo/40/40'
        minutes={180}
      />
    </main>
  );
}
