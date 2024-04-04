import React from 'react'
import SearchInput from './SearchInput.jsx'
import Conversations from './Conversations.jsx'
import LogoutButton from './LogoutButton.jsx';

const Sidebar = () => {
  return (
    <div className="border-r border-slate-500 overflow-auto">
        <SearchInput />
        <Conversations />
        <LogoutButton />
    </div>
  )
}

export default Sidebar;