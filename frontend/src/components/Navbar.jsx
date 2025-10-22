import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { LogOut, MessageSquare, User, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { authUser, logout } = useAuthStore();

  return (
    <header className="w-full shadow-sm px-4 py-3 bg-gray-400 flex items-center justify-between">
      
      {/* Logo - always in row */}
      <Link className="flex items-center gap-2 text-black" to={'/'}>
        <MessageSquare className="text-2xl cursor-pointer" />
        <h1 className="font-bold text-lg">Chatty</h1>
      </Link>

      {/* Right section - buttons */}
      {authUser && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-black">
          <Link to={'/profile'}>
            <span className="flex items-center gap-1 text-sm font-medium">
              <User className="w-4 h-4" /> Profile
            </span>
          </Link>
          <Link to={'/settings'}>
            <span className="flex items-center gap-1 text-sm font-medium">
              <Settings className="w-4 h-4" /> Settings
            </span>
          </Link>
          <button
            onClick={logout}
            className="flex items-center gap-1 text-red-500 text-sm cursor-pointer"
          >
            <LogOut className="w-4 h-4" /> LogOut
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
