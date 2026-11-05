// ~/next-lab/app/p3-16/practice1/NoticeList.jsx
'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

async function getNoticePage({ pageParam }) {
  const address = pageParam
    ? `/p3-16/practice1/api?cursor=${pageParam}`
    : '/p3-16/practice1/api';
  const response = await fetch(address);

  if (!response.ok) {
    throw new Error(`공지를 불러오지 못했어요 (${response.status})`);
  }

  return response.json();
}

export default function NoticeList() {
  const {
    data,
    isPending,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['notices'],
    queryFn: getNoticePage,
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.items[lastPage.items.length - 1].id : null,

    
  });

  if (isPending) {
    return <p className='mt-4'>불러오는 중…</p>;
  }

  if (data === undefined) {
    return <p className='mt-4'>{error.message}</p>;
  }

  const notices = data.pages.flatMap((page) => page.items);

  return (
    <section className='mt-4'>
      <ul className='list-disc pl-6'>
        {notices.map((notice) => (
          <li key={notice.id}>{notice.title}</li>
        ))}
      </ul>
      {hasNextPage ? (
        <button
          type='button'
          className='mt-4 rounded border px-2'
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}>
          {isFetchingNextPage ? '불러오는 중…' : '더 보기'}
        </button>
      ) : (
        <p className='mt-4'>마지막 공지예요</p>
      )}
    </section>
  );
}
