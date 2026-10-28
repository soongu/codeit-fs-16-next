// ~/instagram-next/app/layout.js
import '@/styles/global.scss';

export const metadata = {
  title: {
    default: 'Instagram',
    template: '%s • Instagram',
  },
  description: '친구들이 올린 사진을 보고, 내 사진도 올려보세요.',
  openGraph: {
    siteName: 'Instagram',
    images: '/phones.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='ko'>
      <body>
        {children}
      </body>
    </html>
  );
}
