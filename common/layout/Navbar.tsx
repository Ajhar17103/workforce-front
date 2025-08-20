'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchMenus } from '@/redux/slices/menuSlice';
import { fetchRoleMenuPermissions } from '@/redux/slices/roleMenuPermissionSlice';
import { getSessionStorage, removeSessionStorage, setSessionStorage } from '@/utils/storage';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { menus } = useAppSelector((state) => state.menu);
  const { roleMenuPermissions } = useAppSelector(
    (state) => state.roleMenuPermission,
  );

  const currentItem = menus.find((item) => item.path === pathname);
  const parentItem = menus.find((item) => item.id === currentItem?.parentId);

  const parentName = parentItem?.name || '';
  const currentName = currentItem?.name || '';

  const roleId = getSessionStorage('role_Id');

  useEffect(() => {
    console.log(roleId);
    if (roleId) {
      dispatch(fetchMenus());
      dispatch(fetchRoleMenuPermissions(roleId));
    }
  }, [dispatch, roleId]);

  useEffect(() => {
    const stored = getSessionStorage('darkMode');
    if (stored !== null) {
      setDarkMode(stored === 'true');
      if (stored === 'true') document.body.classList.add('dark-mode');
    } else {
      if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        setDarkMode(true);
        document.body.classList.add('dark-mode');
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const nextMode = !darkMode;
    setDarkMode(nextMode);
    if (nextMode) {
      document.body.classList.add('dark-mode');
      setSessionStorage('darkMode', 'true');
    } else {
      document.body.classList.remove('dark-mode');
      setSessionStorage('darkMode', 'false');
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (!target.closest('.notification-dropdown')) setNotifOpen(false);
      if (!target.closest('.user-dropdown')) setUserDropdownOpen(false);
    }
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const signout = () => {
    removeSessionStorage('access_token');
    removeSessionStorage('refresh_token');
    removeSessionStorage('role_id');
    removeSessionStorage('isLogin');
    setSessionStorage('status', 'ISOUT');
    window.location.href = '/';
  };

  return (
    <header
      className={`custom-navbar d-flex align-items-center justify-content-between px-3 ${
        scrolled ? 'shadow-sm' : ''
      }`}
    >
      <div className="d-flex align-items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="btn btn-sm dark-btn-outline-light"
          aria-label="Toggle sidebar"
        >
          <i className="bi bi-list" />
        </button>

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

      <div className="d-flex align-items-center gap-3">
        <button
          onClick={toggleDarkMode}
          className="btn btn-sm"
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <i className="bi bi-sun-fill fs-5 text-warning" />
          ) : (
            <i className="bi bi-moon-fill fs-5 text-secondary" />
          )}
        </button>

        <div className="position-relative notification-dropdown">
          <button
            className="btn btn-sm position-relative"
            onClick={() => setNotifOpen(!notifOpen)}
            aria-expanded={notifOpen}
            aria-haspopup="true"
            aria-label="Notifications"
          >
            <i
              className={`bi bi-bell fs-5 ${
                darkMode ? 'text-light' : 'text-muted'
              }`}
            />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              3<span className="visually-hidden">unread notifications</span>
            </span>
          </button>
          {notifOpen && (
            <ul
              className={`dropdown-menu dropdown-menu-end show ${
                darkMode ? 'dropdown-menu-dark' : ''
              }`}
              style={{ minWidth: '250px' }}
            >
              <li>
                <h6 className="dropdown-header">Notifications</h6>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  No new notifications
                </a>
              </li>
            </ul>
          )}
        </div>

        <div className="dropdown user-dropdown">
          <button
            className="btn btn-sm d-flex align-items-center gap-2"
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            aria-expanded={userDropdownOpen}
            aria-haspopup="true"
          >
            <div
              className={`text-end d-none d-sm-block ${
                darkMode ? 'text-light' : ''
              }`}
            >
              <div className="user-role">Admin</div>
              <div className="user-name fw-semibold">Ali Hossain</div>
            </div>
            <i
              className={`bi bi-caret-down-fill ${
                darkMode ? 'text-light' : ''
              }`}
            />
          </button>
          {userDropdownOpen && (
            <ul
              className={`dropdown-menu dropdown-menu-end show ${
                darkMode ? 'dropdown-menu-dark' : ''
              }`}
            >
              <li>
                <a className="dropdown-item" href="/profile">
                  <i className="bi bi-person me-2"></i> Profile
                </a>
              </li>
              <li>
                <button className="dropdown-item" onClick={signout}>
                  <i className="bi bi-box-arrow-right me-2"></i> Sign Out
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}
