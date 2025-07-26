import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";
import { useMediaQuery } from 'react-responsive';

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen && isMobile) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen, isMobile]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex h-[95vh] w-[90vw] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 relative">
        
        {/* Backdrop for mobile */}
        {isMobile && isSidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setIsSidebarOpen(false)}></div>
        )}

        {/* Sidebar */}
        <div 
          ref={sidebarRef}
          className={`${
            isMobile 
              ? `fixed top-0 left-0 h-full z-40 bg-gray-900 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-80 transform transition-transform ease-in-out duration-300 ${isSidebarOpen ? "translate-x-0 w-2/3 max-w-sm" : "-translate-x-full"}` 
              : "border-r border-slate-500 p-4 flex flex-col w-1/3"
          }`}
        >
          {(!isMobile || isSidebarOpen) && <Sidebar />}
        </div>
        
        <div className={`flex-1 overflow-y-auto ${isMobile && isSidebarOpen ? 'pointer-events-none' : ''}`}>
          <MessageContainer toggleSidebar={toggleSidebar} isMobile={isMobile} />
        </div>
      </div>
    </div>
  );
}

export default Home;
