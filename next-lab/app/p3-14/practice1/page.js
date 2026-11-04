// ~/next-lab/app/p3-14/practice1/page.js
import CityWeather from './CityWeather.jsx';

export default function WeatherPage() {
  return (
    <main className='p-6'>
      <h2 className='mb-4 text-xl font-semibold'>도시별 날씨</h2>
      <CityWeather />
    </main>
  );
}
