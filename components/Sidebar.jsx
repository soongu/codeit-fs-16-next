// ~/instagram-next/components/Sidebar.jsx
import Link from "next/link";
import { FaHouse, FaRegPaperPlane } from "react-icons/fa6";
import InstagramLogo from "./InstagramLogo.jsx";
import NavLink from "./NavLink.jsx";
import CreateButton from "./CreateButton.jsx";
import SearchButton from "./SearchButton.jsx";
import SearchPanel from "./SearchPanel.jsx";
import SidebarNav from "./SidebarNav.jsx";
import ProfileLink from "./ProfileLink.jsx";
import MoreButton from "./MoreButton.jsx";
import MessagesBadge from "./MessagesBadge.jsx";
import styles from "./Sidebar.module.scss";

function Sidebar() {
  return (
    <>
      <SidebarNav>
        <div className={styles.logoContainer}>
          <Link href="/" className={styles.logo}>
            <InstagramLogo />
          </Link>
        </div>

        <div className={styles.menuContainer}>
          <NavLink href="/" className={styles.menuItem}>
            <FaHouse size={24} />
            <span className={styles.menuText}>홈</span>
          </NavLink>

          <SearchButton />

          <NavLink href="/direct/inbox" className={styles.menuItem}>
            <span className={styles.iconWrap}>
              <FaRegPaperPlane size={24} />
              <MessagesBadge />
            </span>
            <span className={styles.menuText}>메시지</span>
          </NavLink>

          <CreateButton />

          <ProfileLink />
        </div>

        <div className={styles.bottomMenu}>
          <MoreButton />
        </div>
      </SidebarNav>

      <SearchPanel />
    </>
  );
}

export default Sidebar;
