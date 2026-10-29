// ~/instagram-next/app/(main)/layout.js
import Sidebar from '@/components/Sidebar.jsx';

export default function MainLayout({ children }) {
  // throw new Error('사이드바를 그리지 못했어요');

  return (
    <>
      <Sidebar />
      {children}
    </>
  );
}
