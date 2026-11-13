// ~/instagram-next/app/layout.js
import "@/styles/global.scss";
import QueryProvider from "@/components/QueryProvider.jsx";
import CreateFeedModalRoot from "@/components/CreateFeedModalRoot.jsx";
import GlobalToast from "@/components/GlobalToast.jsx";

export const metadata = {
  metadataBase: new URL(process.env.SITE_URL),
  title: {
    default: "Instagram",
    template: "%s • Instagram",
  },
  description: "친구들이 올린 사진을 보고, 내 사진도 올려보세요.",
  openGraph: {
    siteName: "Instagram",
    images: "/phones.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>
          {children}
          <CreateFeedModalRoot />
          <GlobalToast />
        </QueryProvider>
      </body>
    </html>
  );
}
