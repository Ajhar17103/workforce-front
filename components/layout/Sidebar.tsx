'use client';

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

  const mainMenus = sidebarSchema.filter(item => item.mainMenu);
  const subMenus = sidebarSchema.filter(item => item.subMenu);

  const [openMenus, setOpenMenus] = useState<{ [key: number]: boolean }>(() => {
    const initial: { [key: number]: boolean } = {};
    mainMenus.forEach(menu => (initial[menu.id] = true));
    return initial;
  });

  const toggleMenu = (id: number) => {
    setOpenMenus(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="d-flex justify-content-between align-items-center px-3 py-2 border-bottom">
          {sidebarOpen ? (
            <h6 className="mt-2 mb-0 text-primary text-wrap small fw-bold px-2">BNPPAMS</h6>
          ) : (
            <i className="bi bi-box-fill fs-4 text-primary" />
          )}
          <button className="btn btn-sm ms-auto" onClick={toggleSidebar}>
          <i className={`bi ${sidebarOpen ? 'bi-chevron-left' : 'bi-chevron-right'}`} />
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
                    {openMenus[main.id] ? (
                      <i className="bi bi-chevron-down" />
                    ) : (
                      <i className="bi bi-chevron-right" />
                    )}
                  </span>
                )}
              </button>

              {sidebarOpen && openMenus[main.id] && (
                <ul className="sidebar-submenu">
                  {subMenus
                    .filter(sub => sub.ParentId === main.id)
                    .map(sub => (
                      <li key={sub.id}>
                        <Link
                          href={sub.path}
                          className={`submenu-item ${pathname === sub.path ? 'active' : ''}`}
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
    </>
  );
}
