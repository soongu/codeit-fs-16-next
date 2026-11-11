// ~/instagram-next/components/Sidebar.jsx
import Link from 'next/link';
import { FaHouse } from 'react-icons/fa6';
import InstagramLogo from './InstagramLogo.jsx';
import NavLink from './NavLink.jsx';
import CreateButton from './CreateButton.jsx';
import SearchButton from './SearchButton.jsx';
import SearchPanel from './SearchPanel.jsx';
import styles from './Sidebar.module.scss';
import SidebarNav from './SidebarNav.jsx';
import ProfileLink from './ProfileLink.jsx';

function Sidebar() {

  console.log('[render] Sidebar');

  return (
    <>
      <SidebarNav>
        <div className={styles.logoContainer}>
          <Link
            href='/'
            className={styles.logo}>
            <InstagramLogo />
          </Link>
        </div>

        <div className={styles.menuContainer}>
          <NavLink
            href='/'
            className={styles.menuItem}>
            <FaHouse size={24} />
            <span className={styles.menuText}>홈</span>
          </NavLink>

          <SearchButton />

          <CreateButton />

          <ProfileLink />
        </div>
      </SidebarNav>

      <SearchPanel />
    </>
  );
}

export default Sidebar;
