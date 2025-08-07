'use client';

import { useEffect, useState } from 'react';
import { Outfit } from 'next/font/google';
import './globals.css';

import SignIn from '@/components/auth/SignIn';
import AppSidebar from '@/layout/AppSidebar';
import AppHeader from '@/layout/AppHeader';
import Backdrop from '@/layout/Backdrop';

import { SidebarProvider, useSidebar } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';

const outfit = Outfit({
  subsets: ['latin'],
});

function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const [isLogin, setIsLogin] = useState<boolean | null>(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLogin');
    setIsLogin(loggedIn === 'true');
  }, []);

  if (isLogin === null) return null; // or <LoadingSpinner />
  if (!isLogin) return <SignIn />;

  const mainContentMargin = isMobileOpen
    ? 'ml-0'
    : isExpanded || isHovered
    ? 'lg:ml-[290px]'
    : 'lg:ml-[90px]';

  return (
    <div className="min-h-screen xl:flex">
      <AppSidebar />
      <Backdrop />
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
      >
        <AppHeader />
        <main className="p-4 mx-auto max-w-[1640px] md:p-6">{children}</main>
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <ThemeProvider>
          <SidebarProvider>
            <RootLayoutContent>{children}</RootLayoutContent>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
