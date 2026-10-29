// ~/instagram-next/components/CreateFeedModalContext.jsx
'use client';

import { createContext, useContext, useState } from 'react';
import CreateFeedModal from './CreateFeedModal.jsx';

const CreateFeedModalContext = createContext(null);

export function CreateFeedModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);

  return (
    <CreateFeedModalContext value={open}>
      {children}
      {isOpen && <CreateFeedModal onClose={() => setIsOpen(false)} />}
    </CreateFeedModalContext>
  );
}

export function useOpenCreateFeedModal() {
  const open = useContext(CreateFeedModalContext);

  if (open === null) {
    throw new Error(
      'useOpenCreateFeedModal은 CreateFeedModalProvider 안에서만 쓸 수 있어요.',
    );
  }

  return open;
}
