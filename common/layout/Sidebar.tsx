'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchMenus } from '@/redux/slices/menuSlice';
import { fetchRoleMenuPermissions } from '@/redux/slices/roleMenuPermissionSlice';
import { MenuPermissionDto } from '@/types/master-data/menu.type';
import { getSessionStorage } from '@/utils/storage';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

interface Menu {
  id: string;
  parentId: string | null;
  parentMenu: string;
  name: string;
  icon: string | null;
  path: string | null;
  view: boolean;
  add: boolean;
  update: boolean;
  delete: boolean;
}

interface NestedMenu extends Menu {
  sub: Menu[];
}

export default function Sidebar({ sidebarOpen, toggleSidebar }: SidebarProps) {
  const roleId = getSessionStorage('role_id');
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { menus, loading, error } = useAppSelector((state) => state.menu);
  const { roleMenuPermissions } = useAppSelector(
    (state) => state.roleMenuPermission,
  );
  const [menu, setMenu] = useState<Menu[]>([]);

  useEffect(() => {
    if (roleId) {
      dispatch(fetchMenus());
      dispatch(fetchRoleMenuPermissions(roleId));
    }
  }, [dispatch, roleId]);

  useEffect(() => {
    if (!menus) return;
    const transformedMenu: MenuPermissionDto[] = menus.map((m) => ({
      id: m.id,
      parentId: m.parentId,
      parentMenu: m.parentMenu,
      name: m.name,
      icon: m.icon,
      path: m.path,
      view: false,
      add: false,
      update: false,
      delete: false,
    }));

    const transformedPermission =
      roleMenuPermissions?.map((p) => ({
        id: p.id,
        roleId: p.roleId,
        menuId: p.menuId,
        view: p.view,
        add: p.add,
        update: p.update,
        delete: p.delete,
      })) ?? [];

    const mergedMenu = transformedMenu.map((menu) => {
      const perm = transformedPermission.find((p) => p.menuId === menu.id);
      if (perm) {
        return {
          ...menu,
          view: perm.view,
          add: perm.add,
          update: perm.update,
          delete: perm.delete,
        };
      }
      return menu;
    });

    setMenu(mergedMenu);
  }, [menus, roleMenuPermissions]);

  const nestedMenus: NestedMenu[] = useMemo(() => {
    return menu
      ?.filter((menu) => menu.parentId === null)
      ?.map((main) => ({
        ...main,
        sub: menu?.filter((sub) => sub.parentId === main.id),
      }));
  }, [menu]);

  const [openMenuId, setOpenMenuId] = useState<string | null>(() => {
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

  const toggleMenu = (id: string) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  return (
    <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header d-flex justify-content-between align-items-center px-3 py-2">
        <Link href="/">
          {sidebarOpen ? (
            <Image
              className="dark:hidden"
              src="/images/logo/logo.png"
              alt="Logo"
              width={150}
              height={40}
            />
          ) : (
            <Image
              className="hidden dark:block"
              src="/images/logo/logo.png"
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

          if (hasSUBs && main.view) {
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
                    {main.sub.map(
                      (sub) =>
                        sub.view && (
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
                        ),
                    )}
                  </ul>
                )}
              </div>
            );
          } else if (main.path && main.view) {
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
          } else if (main.view) {
            return (
              <div key={main.id} className="sidebar-group">
                <span className="sidebar-link disabled">
                  <i className={`${main.icon} me-2`} />
                  {sidebarOpen && <span className="ms-2">{main.name}</span>}
                </span>
              </div>
            );
          }
        })}
      </nav>
    </aside>
  );
}
