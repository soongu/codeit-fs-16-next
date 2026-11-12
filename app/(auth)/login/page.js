// ~/instagram-next/app/(auth)/login/page.js
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import layoutStyles from "../_components/AuthLayout.module.scss";
import styles from "../_components/LoginPage.module.scss";
import AuthCard from "../_components/AuthCard.jsx";
import LoginForm from "../_components/LoginForm.jsx";
import Separator from "../_components/Separator.jsx";
import SocialLogin from "../_components/SocialLogin.jsx";

export const metadata = {
  title: "로그인",
};

export default function LoginPage() {
  return (
    <>
      <div className={layoutStyles.authImage}>
        <Image
          src="/phones.png"
          alt="Instagram 앱 스크린샷"
          width={842}
          height={1234}
          sizes="24vw"
          style={{ height: "auto" }}
          loading="eager"
        />
      </div>

      <div className={layoutStyles.authFormContainer}>
        <AuthCard showLogo={true}>
          {/* 주소의 ?username= 은 요청이 와야 알 수 있다 — 폼만 Suspense 로 감싼다. */}
          <Suspense>
            <LoginForm />
          </Suspense>

          <Separator />

          {/* 소셜 로그인 링크도 주소의 ?next= 를 읽는다 — 폼처럼 Suspense 로 감싼다. */}
          <Suspense>
            <SocialLogin provider="google" />
            <SocialLogin provider="kakao" />
            <SocialLogin provider="naver" />
          </Suspense>
        </AuthCard>

        <AuthCard className={styles.signupCard}>
          <p>
            계정이 없으신가요? <Link href="/signup">가입하기</Link>
          </p>
        </AuthCard>
      </div>
    </>
  );
}
