'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchMenus } from '@/redux/slices/menuSlice';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

interface Menu {
  id: number;
  name: string;
  parentId: number | null;
  icon?: string;
  path?: string | null;
}

interface NestedMenu extends Menu {
  sub: Menu[];
}

export default function Sidebar({ sidebarOpen, toggleSidebar }: SidebarProps) {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { menus, loading, error } = useAppSelector((state) => state.menu);

  useEffect(() => {
    dispatch(fetchMenus());
  }, [dispatch]);

  const nestedMenus: NestedMenu[] = useMemo(() => {
    return menus
      ?.filter((menu) => menu.parentId === null)
      ?.map((main) => ({
        ...main,
        sub: menus?.filter((sub) => sub.parentId === main.id),
      }));
  }, [menus]);

  const [openMenuId, setOpenMenuId] = useState<number | null>(() => {
    const activeMenu = nestedMenus.find((main) =>
      main.sub.some((sub) => sub.path === pathname),
    );
    return activeMenu ? activeMenu.id : null;
  });

  useEffect(() => {
    const activeMenu = nestedMenus.find((main) =>
      main.sub.some((sub) => sub.path === pathname),
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
        {nestedMenus.map((main) => {
          const hasSUBs = main.sub.length > 0;

          if (hasSUBs) {
            return (
              <div className="sidebar-group" key={main.id}>
                <button
                  className="sidebar-group-toggle"
                  onClick={() => toggleMenu(main.id)}
                  aria-expanded={openMenuId === main.id}
                  aria-controls={`sub-${main.id}`}
                  type="button"
                >
                  <i className={`${main.icon} me-2`} />
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
                  <ul id={`sub-${main.id}`} className="sidebar-sub">
                    {main.sub.map((sub) => (
                      <li key={sub.id}>
                        <Link
                          href={sub?.path!}
                          className={`sub-item ${
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
                href={main?.path}
                className={`sidebar-link ${
                  pathname === main.path ? 'active' : ''
                }`}
              >
                <i className={`${main.icon} me-2`} />
                {sidebarOpen && <span className="ms-2">{main.name}</span>}
              </Link>
            );
          }
          return (
            <div key={main.id} className="sidebar-group">
              <span className="sidebar-link disabled">
                <i className={`${main.icon} me-2`} />
                {sidebarOpen && <span className="ms-2">{main.name}</span>}
              </span>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
