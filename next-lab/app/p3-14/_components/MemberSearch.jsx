// ~/next-lab/app/p3-14/_components/MemberSearch.jsx
'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

async function searchMembers(keyword) {
  const response = await fetch(`/p3-14/api/members?keyword=${keyword}`);

  if (!response.ok) {
    throw new Error(`사람을 찾지 못했어요 (${response.status})`);
  }

  return response.json();
}

export default function MemberSearch() {
  const [keyword, setKeyword] = useState('');

  const { data, isPending, error } = useQuery({
    queryKey: ['members', keyword],
    queryFn: () => searchMembers(keyword),
    enabled: keyword !== '',
    staleTime: 60 * 1000,
  });

  let result;

  if (keyword === '') {
    result = <p className='mt-4'>찾을 사람의 이름을 입력해 보세요</p>;
  } else if (isPending) {
    result = <p className='mt-4'>찾는 중…</p>;
  } else if (error) {
    result = <p className='mt-4'>{error.message}</p>;
  } else if (data.length === 0) {
    result = <p className='mt-4'>검색 결과가 없어요</p>;
  } else {
    result = (
      <ul className='mt-4 list-disc pl-6'>
        {data.map((member) => (
          <li key={member.username}>
            {member.username} ({member.name})
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className='mt-4'>
      <input
        className='rounded border px-2'
        placeholder='사용자 이름'
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
      />
      {result}
    </section>
  );
}
