// ~/next-lab/app/p3-05/font/page.js
import { Noto_Sans_KR } from 'next/font/google';

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
});

export default function FontPage() {
  return (
    <main className='p-6'>
      <h2 className='text-xl font-semibold'>글꼴을 바꿔봐요</h2>
      <p className='mt-4'>퇴근길에 한강이 너무 예뻤어요</p>
      <p
        className={`mt-4 ${notoSansKr.className}`}>
        퇴근길에 한강이 너무 예뻤어요
      </p>
    </main>
  );
}
