// header for logged in pages include 30Day logo + navlinkks + user name and Log out button

import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Button from "../ui/Buttons";

// Navlink styling
function navLinkClasses({ isActive }: { isActive: boolean }) {
  return [
    'border-b-2 py-2 text-sm font-semibold transition', 
    isActive ? 'border-brand text-ink' : 'border-transparent text-gray-600 hover:text-ink',
  ].join('');
}

// AppHeader
function AppHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // log out - clear token & user then go back to login page
  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <header className="border-b border-gray-200 bg0white">
      <div className="mx-auto flex mac-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
          {/* logo */}
        <Link to='/dashboard' className="text-brand text-2xl font-extrabold text-ink">
          30Days
        </Link>

         {/* nav links */}
        <nav>
          <NavLink to='/dashboard' className={navLinkClasses}>Dashboard</NavLink>
          <NavLink to='/challenges/new' className={navLinkClasses}>New Challenge</NavLink>
        </nav> 

        {/* user name  + logout button */}
        <div className="flex items-center gap-3">
          <span
            aria-hidden='true'
            className='flex h-10 w-10 items-center justify-center rounded-full bg-brand-light font-bold text-brand-dark'
          >
            {user?.username[0]?.toUpperCase()}
          </span>

          <span className="hidden text-sm font-semibold sm:inline">{user?.username}</span>
          <Button
            variant="secondary" onClick={handleLogout}
          >Log out</Button>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;