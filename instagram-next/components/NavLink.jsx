// ~/instagram-next/components/NavLink.jsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLink({ href, className, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={isActive ? `${className} active` : className}
      aria-current={isActive ? 'page' : undefined}>
      {children}
    </Link>
  );
}
