// ~/instagram-next/app/(auth)/_components/AuthCard.jsx
import InstagramLogo from '@/components/InstagramLogo.jsx';
import styles from './AuthCard.module.scss';

const AuthCard = ({ children, className = '', showLogo = false }) => (
  <div className={`${styles.authCard}${className}`}>
    {showLogo && (
      <h1 className={styles.logo}>
        <InstagramLogo />
      </h1>
    )}
    {children}
  </div>
);

export default AuthCard;
