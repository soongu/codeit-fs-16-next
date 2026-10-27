// ~/next-lab/app/p3-03/practice1/page.js
import Link from 'next/link';

const cities = ['seoul', 'busan', 'gwangju'];

export default function CityListPage() {
  return (
    <main className='p-6'>
      <h2 className='text-xl font-semibold'>도시를 골라보세요</h2>
      <nav className='mt-4 flex gap-4'>
        {cities.map((city) => (
          <Link
            key={city}
            href={`/p3-03/practice1/${city}`}
            className='underline'>
            {city}
          </Link>
        ))}
        <Link
          href='/p3-03/practice1/all'
          className='underline'>
          전체
        </Link>
      </nav>
    </main>
  );
}
