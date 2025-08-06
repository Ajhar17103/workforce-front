'use client';

import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { store } from '@/redux/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
          <div className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
            <Navbar toggleSidebar={toggleSidebar} />
            <main className="content-area">
              {children}

              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </main>
          </div>
        </Provider>
      </body>
    </html>
  );
}
