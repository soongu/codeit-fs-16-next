// ~/instagram-next/app/(auth)/signup/page.js
import Link from 'next/link';
import layoutStyles from '../_components/AuthLayout.module.scss';
import styles from '../_components/SignupPage.module.scss';
import AuthCard from '../_components/AuthCard.jsx';
import SignupForm from '../_components/SignupForm.jsx';

export const metadata = {
  title: '가입하기',
};

export default function SignupPage() {
  return (
    <div className={layoutStyles.authFormContainer}>
      <AuthCard showLogo={true}>
        <p className={styles.signupText}>
          친구들의 사진과 동영상을 보려면 가입하세요.
        </p>
        <SignupForm />
      </AuthCard>

      <AuthCard className={styles.loginCard}>
        <p>
          계정이 있으신가요? <Link href='/login'>로그인</Link>
        </p>
      </AuthCard>
    </div>
  );
}
