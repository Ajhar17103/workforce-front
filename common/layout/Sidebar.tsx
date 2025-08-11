'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { sidebarSchema } from './sidebarSchema';

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ sidebarOpen, toggleSidebar }: SidebarProps) {
  const pathname = usePathname();

  const mainMenus = sidebarSchema.filter(item => item.menuType === 'MAINMENU');
  const subMenus = sidebarSchema.filter(item => item.menuType === 'SUBMENU');

  const [openMenuId, setOpenMenuId] = useState<number | null>(() => {
    const activeMenu = mainMenus.find(menu =>
      subMenus.some(sub => sub.parentId === menu.id && sub.path === pathname)
    );
    return activeMenu ? activeMenu.id : null;
  });

  const toggleMenu = (id: number) => {
    setOpenMenuId(prev => (prev === id ? null : id));
  };

  return (
    <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header d-flex justify-content-between align-items-center px-3 py-2">
        <Link href="/">
        {sidebarOpen ? (
              <Image
                className="dark:hidden"
                src="/images/logo/logo.svg"
                alt="Logo"
                width={150}
                height={40}
              />
        ) : (
          <Image
                className="hidden dark:block"
                src="/images/logo/logo-dark.svg"
                alt="Logo"
                width={150}
                height={40}
              />
        )}
        </Link>
        <button
          className="btn btn-sm btn-light d-lg-none"
          onClick={toggleSidebar}
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>

      <nav className="sidebar-menu pt-2">
        <Link
          href="/"
          className={`sidebar-link ${pathname === '/' ? 'active' : ''}`}
        >
          <i className="bi bi-speedometer2 me-2" />
          {sidebarOpen && 'Dashboard'}
        </Link>

        {mainMenus.map(main => (
          <div className="sidebar-group" key={main.id}>
            <button
              className="sidebar-group-toggle"
              onClick={() => toggleMenu(main.id)}
            >
              <i className={main.icon} />
              {sidebarOpen && <span className="ms-2">{main.name}</span>}
              {sidebarOpen && (
                <span className="ms-auto">
                  {openMenuId === main.id ? (
                    <i className="bi bi-chevron-down" />
                  ) : (
                    <i className="bi bi-chevron-right" />
                  )}
                </span>
              )}
            </button>

            {sidebarOpen && openMenuId === main.id && (
              <ul className="sidebar-submenu">
                {subMenus
                  .filter(sub => sub.parentId === main.id)
                  .map(sub => (
                    <li key={sub.id}>
                      <Link
                        href={sub.path!}
                        className={`submenu-item ${
                          pathname === sub.path ? 'active' : ''
                        }`}
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
