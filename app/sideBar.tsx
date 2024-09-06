import React from 'react'

interface SideBarProps {
    type: 'social' | 'other';
}

const SideBar = ({ type }: SideBarProps) => {
    return (
      <div className="text-justify min-h-screen bg-black text-3xl text-gray-500 flex">
        {type === 'social' ? (
          <div>
            {/* Render the social sidebar content */}
            <h2>Social Sidebar</h2>
            <div >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
          </div>
        ) : type === 'other' ? (
          <div>
            {/* Render the other sidebar content */}
            <h2>Other Sidebar</h2>
            <div >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
          </div>
        ) : null}
      </div>
    );
  };

export default SideBar