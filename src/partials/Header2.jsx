import React, { useState } from 'react';

import SearchModal from '../components/ModalSearch';
import Notifications from '../components/DropdownNotifications';
import Help from '../components/DropdownHelp';
import UserMenu from '../components/DropdownProfile';
import ThemeToggle from '../components/ThemeToggle';
import '../css/HeaderMain.css'

function Header2({ sidebarOpen, setSidebarOpen }) {
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  return (
    <header className="sticky top-0 bg-white dark:bg-[#182235] border-b border-slate-200 dark:border-slate-700 z-30">
      <a href='#' className='logo'>LOGO</a>
      <nav className='navbar'>
        <ul>
          <li><a href='#'>Home</a></li>
          <li><a href='#'>Home</a></li>
          <li><a href='#'>Home</a></li>
          <li><a href='#'>Home</a></li>
          <li><a href='#'>Home</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header2;
