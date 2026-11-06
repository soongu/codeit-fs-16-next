// ~/instagram-next/components/CreateFeedModalRoot.jsx
'use client';

import { useUiStore } from '@/stores/useUiStore.js';
import CreateFeedModal from './CreateFeedModal.jsx';

export default function CreateFeedModalRoot() {
  console.log('[render] CreateFeedModalRoot');
  const isOpen = useUiStore((state) => state.isCreateFeedOpen);
  const close = useUiStore((state) => state.closeCreateFeed);

  if (!isOpen) {
    return null;
  }

  return <CreateFeedModal onClose={close} />;
}
