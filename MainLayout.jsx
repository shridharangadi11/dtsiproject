import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import KsrtcHeader from '@/layouts/components/KsrtcHeader';
import Footer from '@/layouts/components/Footer'; // Generic Footer, can be customized for KSRTC if needed

const MainLayout = () => {
  const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode might not be KSRTC theme, but kept for now
  const location = useLocation();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  
  // Hide layout for login page
  if (location.pathname === '/login') {
    return <Outlet />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <KsrtcHeader
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />
      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <Footer navLinks={[]} />
    </div>
  );
};

export default MainLayout;