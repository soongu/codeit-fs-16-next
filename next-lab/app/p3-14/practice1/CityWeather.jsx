// ~/next-lab/app/p3-14/practice1/CityWeather.jsx
'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

const cities = [
  { id: 'seoul', name: '서울' },
  { id: 'busan', name: '부산' },
  { id: 'daegu', name: '대구' },
];

async function getWeather(city) {
  const response = await fetch(`/p3-14/practice1/api?city=${city}`);

  if (!response.ok) {
    const error = new Error(`날씨를 불러오지 못했어요 (${response.status})`);
    error.status = response.status;
    throw error;
  }

  return response.json();
}

function retryWeather(failureCount, error) {
  if (error.status === 404) {
    return false;
  }

  return failureCount < 2;
}

export default function CityWeather() {
  const [city, setCity] = useState('seoul');
  const { data, isPending, error } = useQuery({
    queryKey: ['weather', city],
    queryFn: () => getWeather(city),
    // (x, y) => func(x, y)   ->   func
    retry: retryWeather,
  });

  let result;

  if (isPending) {
    result = <p className='mt-4'>불러오는 중…</p>;
  } else if (error) {
    result = <p className='mt-4 text-red-500'>{error.message}</p>;
  } else {
    result = <p className='mt-4'>{data.temperature}도</p>;
  }

  return (
    <section>
      <div className='flex gap-2'>
        {cities.map((item) => (
          <button
            key={item.id}
            type='button'
            className={
              item.id === city
                ? 'rounded border px-2 font-semibold'
                : 'rounded border px-2'
            }
            onClick={() => setCity(item.id)}>
            {item.name}
          </button>
        ))}
      </div>
      {result}
    </section>
  );
}
