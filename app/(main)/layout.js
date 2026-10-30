// ~/instagram-next/app/(main)/layout.js
import Sidebar from "@/components/Sidebar.jsx";
import AuthGuard from "@/components/AuthGuard.jsx";

export default function MainLayout({ children }) {
  return (
    <>
      <AuthGuard />
      <Sidebar />
      {children}
    </>
  );
}
