// ~/instagram-next/app/(auth)/login/page.js
import layoutStyles from '../_components/AuthLayout.module.scss';
import styles from '../_components/LoginPage.module.scss';
import AuthCard from '../_components/AuthCard.jsx';
import Image from 'next/image';

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
          loading="eager"
        />
      </div>

      <div className={layoutStyles.authFormContainer}>
        <AuthCard showLogo={true}>
          <form
            className={styles.authForm}
            noValidate>
            <div className={styles.formField}>
              <input
                type='text'
                name='username'
                placeholder='전화번호, 사용자 이름 또는 이메일'
                required
              />
            </div>
            <div className={styles.formField}>
              <input
                type='password'
                name='password'
                placeholder='비밀번호'
                required
              />
            </div>
            <button
              type='submit'
              className={styles.authButton}
              disabled>
              로그인
            </button>
          </form>
        </AuthCard>
      </div>
    </>
  );
}
