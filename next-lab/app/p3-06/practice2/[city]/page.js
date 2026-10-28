export const instant = false;

export function generateStaticParams() {
  return [{ city: 'seoul' }, { city: 'busan' }, { city: 'gwangju' }];
}

export default async function CityPage({ params }) {
  const { city } = await params;

  return <h2 className='p-6 text-xl font-semibold'>{city} 날씨예요</h2>;
}
