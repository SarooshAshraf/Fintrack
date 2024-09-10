import React, { useState, useEffect } from 'react';
import PromoCodesPage from './promocode';
import Dashboard from './DashBoard';
import SideBar from './SideBar';

function Main() {
  const [activeItem, setActiveItem] = useState(() => {
    return localStorage.getItem('activeItem') || 'Dashboard';
  });


  useEffect(() => {
    localStorage.setItem('activeItem', activeItem);
  }, [activeItem]);

  return (
    <div className='flex flex-col min-h-screen bg-white text-black'>
      {/* TopBar component at the top */}
      <SideBar activeItem={activeItem} setActiveItem={setActiveItem} />

      {/* Main content container */}
      <div
        className='flex-grow p-6 overflow-y-auto'
        style={{
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
        }}
      >
        {/* Conditionally render the active page */}
        {activeItem === 'Dashboard' && <Dashboard />}
        {activeItem === 'Promo Codes' && <PromoCodesPage />}
      </div>
    </div>
  );
}

export default Main;
