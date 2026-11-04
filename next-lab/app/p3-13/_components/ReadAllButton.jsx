// ~/next-lab/app/p3-13/_components/ReadAllButton.jsx
'use client';

export default function ReadAllButton() {
  const handleClick = async () => {
    await fetch('/p3-13/api/notifications/read', { method: 'PATCH' });
  };

  return (
    <button
      type='button'
      className='mr-2 rounded border px-2'
      onClick={handleClick}>
      모두 읽음
    </button>
  );
}
