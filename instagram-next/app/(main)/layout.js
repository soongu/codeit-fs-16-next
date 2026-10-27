// ~/instagram-next/app/(main)/layout.js
import Sidebar from '@/components/Sidebar.jsx';

export default function MainLayout({ children }) {
  return (
    <>
      <Sidebar />
      {children}
    </>
  );
}
