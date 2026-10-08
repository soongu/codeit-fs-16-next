// ~/instagram-next/app/(main)/layout.js
import Sidebar from "@/components/Sidebar.jsx";
import { CreateFeedModalProvider } from "@/components/CreateFeedModalContext.jsx";

export default function MainLayout({ children }) {
  return (
    <CreateFeedModalProvider>
      <Sidebar />
      {children}
    </CreateFeedModalProvider>
  );
}
