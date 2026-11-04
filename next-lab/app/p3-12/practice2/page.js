// ~/next-lab/app/p3-12/practice2/page.js
import TopKeyword from './TopKeyword.jsx';
import TrendingList from './TrendingList.jsx';

export default function TrendingPage() {
  return (
    <main className='p-6'>
      <header className='border-b pb-4'>
        <h2 className='text-xl font-semibold'>실시간 인기 검색어</h2>
        <TopKeyword />
      </header>
      <TrendingList />
    </main>
  );
}
