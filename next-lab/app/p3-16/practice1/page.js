// ~/next-lab/app/p3-16/practice1/page.js
import NoticeList from './NoticeList.jsx';

export default function NoticePage() {
  return (
    <main className='p-6'>
      <h2 className='text-xl font-semibold'>공지사항</h2>
      <NoticeList />
    </main>
  );
}
