import React, { useState, useEffect } from 'react';
import TopNavigation from './TopNavigation';
import Sidebar from './Sidebar';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    // Initialize from localStorage to persist state across navigation
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebar-collapsed');
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  // Save sidebar collapsed state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', JSON.stringify(sidebarCollapsed));
  }, [sidebarCollapsed]);

  const handleMenuClick = () => {
    // On mobile, toggle sidebar open/close
    // On desktop, toggle sidebar collapsed/expanded
    if (window.innerWidth < 1024) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="h-screen bg-background overflow-hidden">
      {/* Fixed top navigation */}
      <div className="fixed top-0 left-0 right-0 z-40 h-16">
        <TopNavigation onMenuClick={handleMenuClick} />
      </div>
      
      <div className="flex h-full pt-16">
        {/* Fixed sidebar */}
        <div className={`fixed top-16 left-0 bottom-0 z-30 transition-all duration-300 lg:block ${
          sidebarCollapsed ? 'lg:w-16' : 'lg:w-64'
        } w-64`}>
          <Sidebar 
            isOpen={sidebarOpen} 
            onClose={handleSidebarClose}
            isCollapsed={sidebarCollapsed}
          />
        </div>
        
        {/* Main content with proper margins and scroll */}
        <main className={`flex-1 h-full overflow-y-auto transition-all duration-300 ${
          sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
        }`}>
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;