// ~/instagram-next/app/(main)/layout.js
import AuthGuard from '@/components/AuthGuard.jsx';
import Sidebar from '@/components/Sidebar.jsx';

export default function MainLayout({ children }) {
  // throw new Error('사이드바를 그리지 못했어요');

  return (
    <>
      <AuthGuard />
      <Sidebar />
      {children}
    </>
  );
}
