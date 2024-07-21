import React from 'react'
import SearchInput from './SearchInput.jsx';
import Conversations from './Conversations.jsx';
import LogoutButton from './LogoutButton.jsx';

const Sidebar = () => {
  return (
    <div className=''>
        <SearchInput/>
        <div className='divider px-3'></div>
        <Conversations/>
        <div className='divider px-3'></div>
        <LogoutButton/>
    </div>
  )
}

export default Sidebar;