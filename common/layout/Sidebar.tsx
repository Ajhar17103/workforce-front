'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { sidebarSchema } from './sidebarSchema';

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ sidebarOpen, toggleSidebar }: SidebarProps) {
  const pathname = usePathname();

  const nestedMenus = useMemo(() => {
    return sidebarSchema
      .filter((menu) => menu.menuType === 'MAIN')
      .map((main) => ({
        ...main,
        SUBs: sidebarSchema.filter(
          (sub) => sub.menuType === 'SUB' && sub.parentId === main.id,
        ),
      }));
  }, [sidebarSchema]);

  const [openMenuId, setOpenMenuId] = useState<number | null>(() => {
    const activeMenu = nestedMenus.find((main) =>
      main.SUBs.some((sub) => sub.path === pathname),
    );
    return activeMenu ? activeMenu.id : null;
  });

  useEffect(() => {
    const activeMenu = nestedMenus.find((main) =>
      main.SUBs.some((sub) => sub.path === pathname),
    );

    if (activeMenu && activeMenu.id !== openMenuId) {
      setOpenMenuId(activeMenu.id);
    } else if (!activeMenu) {
      setOpenMenuId(null);
    }
  }, [pathname, nestedMenus]);

  const toggleMenu = (id: number) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
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
          aria-label="Close sidebar"
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>

      <nav
        className="sidebar-menu pt-2"
        role="navigation"
        aria-label="Sidebar menu"
      >
        {/* <Link
          href="/"
          className={`sidebar-link ${pathname === '/' ? 'active' : ''}`}
        >
          <i className="bi bi-speedometer2 me-2" />
          {sidebarOpen && 'Dashboard'}
        </Link> */}

        {nestedMenus.map((main) => {
          const hasSUBs = main.SUBs.length > 0;

          if (hasSUBs) {
            return (
              <div className="sidebar-group" key={main.id}>
                <button
                  className="sidebar-group-toggle"
                  onClick={() => toggleMenu(main.id)}
                  aria-expanded={openMenuId === main.id}
                  aria-controls={`SUB-${main.id}`}
                  type="button"
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
                  <ul id={`SUB-${main.id}`} className="sidebar-SUB">
                    {main.SUBs.map((sub) => (
                      <li key={sub.id}>
                        <Link
                          href={sub.path!}
                          className={`SUB-item ${
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
            );
          } else if (main.path) {
            return (
              <Link
                key={main.id}
                href={main.path}
                className={`sidebar-link ${
                  pathname === main.path ? 'active' : ''
                }`}
              >
                <i className={main.icon} />
                {sidebarOpen && <span className="ms-2">{main.name}</span>}
              </Link>
            );
          }
          return (
            <div key={main.id} className="sidebar-group">
              <span className="sidebar-link disabled">
                <i className={main.icon} />
                {sidebarOpen && <span className="ms-2">{main.name}</span>}
              </span>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
