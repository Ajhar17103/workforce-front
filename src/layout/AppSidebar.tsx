"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import {
  BoxCubeIcon,
  CalenderIcon,
  ChevronDownIcon,
  GridIcon,
  GroupIcon,
  HorizontaLDots,
  ListIcon,
  LockIcon,
  TableIcon,
  TaskIcon,
} from "../icons/index";

type NavItem = {
  id: number;
  parentId?: number;
  name: string;
  icon?: React.ReactNode;
  path?: string;
};

const navItems: NavItem[] = [
  { id: 1, name: "Dashboard", icon: <GridIcon />, path: "/" },

  { id: 4, name: "Master Data", icon: <ListIcon /> },
  { id: 5, parentId: 4, name: "Menus", path: "/master-data/menus" },
  { id: 30, parentId: 4, name: "Role & Permissons", path: "/master-data/rolepermission" },
  { id: 31, parentId: 4, name: "Assets", path: "/master-data/assets" },
  { id: 32, parentId: 4, name: "Calendar", icon: <CalenderIcon />, path: "/calendar" },
  
  { id: 25, name: "Users", icon: <GroupIcon/>, path: "/users" },

  { id: 26, name: "Projects", icon: <LockIcon />, path: "/projects" },

  { id: 27, name: "Tasks", icon: <TaskIcon />, path: "/tasks" },

  { id: 28, name: "Leaves", icon: <BoxCubeIcon />, path: "/leaves" },

  { id: 29, name: "Attendances", icon: <TableIcon />, path: "/attendences" },






 
  // { id: 3, name: "User Profile", icon: <UserCircleIcon />, path: "/profile" },

  // { id: 4, name: "Forms", icon: <ListIcon /> },
  // { id: 5, parentId: 4, name: "Form Elements", path: "/form-elements" },

  // { id: 6, name: "Tables", icon: <TableIcon /> },
  // { id: 7, parentId: 6, name: "Basic Tables", path: "/basic-tables" },

  // { id: 9, name: "Pages", icon: <PageIcon /> },
  // { id: 10, parentId: 9, name: "Blank Page", path: "/blank" },
  // { id: 11, parentId: 9, name: "404 Error", path: "/error-404" },

  // { id: 12, name: "Charts", icon: <PieChartIcon /> },
  // { id: 13, parentId: 12, name: "Line Chart", path: "/line-chart" },
  // { id: 14, parentId: 12, name: "Bar Chart", path: "/bar-chart" },

  // { id: 15, name: "UI Elements", icon: <BoxCubeIcon /> },
  // { id: 16, parentId: 15, name: "Alerts", path: "/alerts" },
  // { id: 17, parentId: 15, name: "Avatar", path: "/avatars" },
  // { id: 18, parentId: 15, name: "Badge", path: "/badge" },
  // { id: 19, parentId: 15, name: "Buttons", path: "/buttons" },
  // { id: 20, parentId: 15, name: "Images", path: "/images" },
  // { id: 21, parentId: 15, name: "Videos", path: "/videos" },

  // { id: 22, name: "Authentication", icon: <PlugInIcon /> },
  // { id: 23, parentId: 22, name: "Sign In", path: "/signin" },
  // { id: 24, parentId: 22, name: "Sign Up", path: "/signup" },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const [openSubmenuIndex, setOpenSubmenuIndex] = useState<number | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<number, number>>({});
  const subMenuRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const isActive = useCallback((path: string) => pathname === path, [pathname]);

  const getSubItems = (parentId: number) =>
    navItems.filter((item) => item.parentId === parentId);

  const handleSubmenuToggle = (index: number) => {
    setOpenSubmenuIndex((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    const activeItem = navItems.find((item) => item.path === pathname);
    if (activeItem?.parentId) {
      const parentIndex = navItems.findIndex(
        (item) => item.id === activeItem.parentId
      );
      setOpenSubmenuIndex(parentIndex);
    } else {
      setOpenSubmenuIndex(null);
    }
  }, [pathname]);

  useEffect(() => {
    if (openSubmenuIndex !== null) {
      const ref = subMenuRefs.current[openSubmenuIndex];
      if (ref) {
        setSubMenuHeight((prev) => ({
          ...prev,
          [openSubmenuIndex]: ref.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenuIndex]);

  const renderMenuItems = () => {
    return (
      <ul className="flex flex-col gap-4">
        {navItems
          .filter((item) => !item.parentId)
          .map((nav, index) => {
            const subItems = getSubItems(nav.id);
            const hasSubMenu = subItems.length > 0;
            const isOpen = openSubmenuIndex === index;

            return (
              <li key={nav.id}>
                {hasSubMenu ? (
                  <button
                    onClick={() => handleSubmenuToggle(index)}
                    className={`menu-item group ${
                      isOpen ? "menu-item-active" : "menu-item-inactive"
                    } cursor-pointer ${
                      !isExpanded && !isHovered
                        ? "lg:justify-center"
                        : "lg:justify-start"
                    }`}
                  >
                    <span
                      className={`${
                        isOpen
                          ? "menu-item-icon-active"
                          : "menu-item-icon-inactive"
                      }`}
                    >
                      {nav.icon}
                    </span>
                    {(isExpanded || isHovered || isMobileOpen) && (
                      <span className="menu-item-text">{nav.name}</span>
                    )}
                    {(isExpanded || isHovered || isMobileOpen) && isOpen? 
                      <ChevronDownIcon className="ml-auto w-5 h-5 transition-transform duration-200 rotate-180 text-brand-500"/>
                      :
                      <ChevronDownIcon className="ml-auto w-5 h-5 transition-transform duration-200"/>
                  }
                  </button>
                ) : (
                  nav.path && (
                    <Link
                      href={nav.path}
                      className={`menu-item group ${
                        isActive(nav.path)
                          ? "menu-item-active"
                          : "menu-item-inactive"
                      }`}
                    >
                      <span
                        className={`${
                          isActive(nav.path)
                            ? "menu-item-icon-active"
                            : "menu-item-icon-inactive"
                        }`}
                      >
                        {nav.icon}
                      </span>
                      {(isExpanded || isHovered || isMobileOpen) && (
                        <span className="menu-item-text">{nav.name}</span>
                      )}
                    </Link>
                  )
                )}
                {hasSubMenu && (isExpanded || isHovered || isMobileOpen) && (
                  <div
                    ref={(el) => {
                      subMenuRefs.current[index] = el;
                    }}
                    className="overflow-hidden transition-all duration-300"
                    style={{
                      height: isOpen ? `${subMenuHeight[index] || 0}px` : "0px",
                    }}
                  >
                    <ul className="mt-2 space-y-1 ml-9">
                      {subItems.map((sub) => (
                        <li key={sub.id}>
                          <Link
                            href={sub.path || "#"}
                            className={`menu-dropdown-item ${
                              isActive(sub.path || "")
                                ? "menu-dropdown-item-active"
                                : "menu-dropdown-item-inactive"
                            }`}
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
      </ul>
    );
  };

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <Image
                className="dark:hidden"
                src="/images/logo/logo.svg"
                alt="Logo"
                width={150}
                height={40}
              />
              <Image
                className="hidden dark:block"
                src="/images/logo/logo-dark.svg"
                alt="Logo"
                width={150}
                height={40}
              />
            </>
          ) : (
            <Image
              src="/images/logo/logo-icon.svg"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>

      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems()}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
