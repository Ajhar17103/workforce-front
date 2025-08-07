"use client";

import SignIn from "@/components/auth/SignIn";
import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import React, { useEffect, useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const [isLogin, setIsLogin] = useState<boolean | null>(null);

  // Read login status from localStorage on client
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLogin");
    setIsLogin(loggedIn === "true");
  }, []);

  if (isLogin === null) return null; // Optional: Show loading spinner

  if (!isLogin) {
    return (
      <div className="">
        <SignIn />
      </div>
    );
  }

  // Sidebar margin logic
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  return (
    <div className="min-h-screen xl:flex">
      <AppSidebar />
      <Backdrop />

      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
