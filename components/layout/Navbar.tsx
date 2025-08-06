'use client';

import { usePathname } from 'next/navigation';
import { sidebarSchema } from './sidebarSchema';
import { useEffect, useState } from 'react';

export default function Navbar({ toggleSidebar }: { toggleSidebar: () => void }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  const currentItem = sidebarSchema.find(item => item.path === pathname);
  const parentItem = sidebarSchema.find(item => item.id === currentItem?.ParentId);

  const parentName = parentItem?.name || '';
  const currentName = currentItem?.name || '';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`custom-navbar d-flex align-items-center justify-content-between px-4 border-bottom ${
        scrolled ? 'shadow-sm' : ''
      }`}
    >
      <div className="d-flex align-items-center gap-3">
        {/* Sidebar Toggle */}
        <button onClick={toggleSidebar} className="btn btn-sm btn-outline-secondary d-lg-none">
          <i className="bi bi-list" />
        </button>

        {/* Breadcrumbs */}
        <div className="navbar-breadcrumb">
          {parentName && (
            <>
              <span className="breadcrumb-parent">{parentName}</span>
              <span className="breadcrumb-separator mx-2">›</span>
            </>
          )}
          <span className="breadcrumb-child">{currentName || 'Dashboard'}</span>
        </div>
      </div>

      {/* Notifications & User Info */}
      <div className="d-flex align-items-center gap-3">
        <i className="bi bi-bell fs-5 text-muted notification-icon" role="button" />
        <div className="d-flex align-items-center gap-2">
          <div className="text-end">
            <div className="user-role">Admin</div>
            <div className="user-name">Ali Hossain</div>
          </div>
        </div>
      </div>
    </header>
  );
}
