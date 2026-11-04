// ~/next-lab/app/p3-13/practice1/GuestbookForm.jsx
'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

async function addEntry(text) {
  const response = await fetch('/p3-13/practice1/api', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error(`글을 남기지 못했어요 (${response.status})`);
  }

  return response.json();
}

export default function GuestbookForm() {
  const [text, setText] = useState('');
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: addEntry,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['guestbook'] });
      setText('');
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    mutate(text);
  };

  return (
    <form
      className='mt-4 flex gap-2'
      onSubmit={handleSubmit}>
      <input
        className='rounded border px-2'
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <button
        type='submit'
        className='rounded border px-2'
        disabled={isPending || text.trim() === ''}>
        {isPending ? '남기는 중…' : '남기기'}
      </button>
    </form>
  );
}
