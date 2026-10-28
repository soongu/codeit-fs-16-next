// ~/next-lab/app/p3-07/practice1/[city]/page.js
import { notFound } from 'next/navigation';

export const instant = false;

const weather = {
  seoul: { temperature: 23, sky: '맑음' },
  busan: { temperature: 25, sky: '흐림' },
  gwangju: { temperature: 24, sky: '비' },
};

export default async function CityPage({ params }) {
  const { city } = await params;
  const today = weather[city];

  if (today === undefined) {
    notFound();
  }

  return (
    <h2 className='p-6 text-xl font-semibold'>
      {city} 날씨는 {today.sky}, {today.temperature}도예요
    </h2>
  );
}
