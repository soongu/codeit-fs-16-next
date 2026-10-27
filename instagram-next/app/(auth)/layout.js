// ~/instagram-next/app/(auth)/layout.js
import styles from './_components/AuthLayout.module.scss';

export default function AuthLayout({ children }) {
  return <main className={styles.authLayout}>{children}</main>;
}
