'use client';

import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

import Navbar from '@/common/layout/Navbar';
import Sidebar from '@/common/layout/Sidebar';
import Loading from '@/common/Loader/Loading';
import { store } from '@/redux/store';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import SignIn from './(auth)/sign-in/page';

function DashboardContent({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const [isLogin, setIsLogin] = useState<boolean | null>(null);

  useEffect(() => {
    const storedLogin = localStorage.getItem('isLogin') === 'true';
    setIsLogin(storedLogin);
  }, []);

  if (isLogin === null) {
    return (
      <Loading fullScreen message="Please wait, loading your content..." />
    );
  }

  if (!isLogin) {
    return (
      <div className="">
        <SignIn />
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="d-flex">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`main-content ${
          sidebarOpen ? 'sidebar-open' : 'sidebar-closed'
        }`}
      >
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="content-area">{children}</div>
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <DashboardContent>
            {children}
            <ToastContainer />
          </DashboardContent>
        </Provider>
      </body>
    </html>
  );
}
