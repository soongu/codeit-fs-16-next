// ~/instagram-next/app/(auth)/login/page.js
import layoutStyles from '../_components/AuthLayout.module.scss';
import styles from '../_components/LoginPage.module.scss';
import AuthCard from '../_components/AuthCard.jsx';
import Image from 'next/image';
import Link from 'next/link';
import LoginForm from '../_components/LoginForm.jsx';

export const metadata = {
  title: '로그인',
};

export default function LoginPage() {
  return (
    <>
      <div className={layoutStyles.authImage}>
        <Image
          src='/phones.png'
          alt='Instagram 앱 스크린샷'
          width={842}
          height={1234}
          // style={{ height: 'auto' }}
          sizes='24vw'
          loading='eager'
        />
      </div>

      <div className={layoutStyles.authFormContainer}>
        <AuthCard showLogo={true}>
          <LoginForm />
        </AuthCard>

        <AuthCard className={styles.signupCard}>
          <p>
            계정이 없으신가요? <Link href='/signup'>가입하기</Link>
          </p>
        </AuthCard>
      </div>
    </>
  );
}
