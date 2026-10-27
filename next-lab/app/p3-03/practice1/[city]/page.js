// ~/next-lab/app/p3-03/practice1/[city]/page.js
export const instant = false;

export default async function CityPage({ params }) {
  const { city } = await params;

  return <h2 className='p-6 text-xl font-semibold'>{city} 날씨예요</h2>;
}
