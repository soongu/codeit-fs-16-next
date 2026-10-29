'use client'

import { useTransition } from 'react';
import { wish, unwish } from '../actions.js';

const WishButton = ({ id, wished }) => {
  const [isPending, startTransition] = useTransition();

  const handleWishClick = () => {
    startTransition(async () => {
      if (wished) {
        await unwish(id);
      } else {
        await wish(id);
      }
    });
  };
  return (
    <button
      type='button'
      className='rounded border px-2'
      onClick={handleWishClick}
      disabled={isPending}
      aria-busy={isPending}
    >
      { wished ? "찜 취소" : "찜하기" }
    </button>
  );
};

export default WishButton;
