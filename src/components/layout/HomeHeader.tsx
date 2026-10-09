// Header that appears on Home page for logged out users  includeds 30Days logo and log in and start free buttons

import { Link } from "react-router-dom";

function HomeHeader() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to='/' className="text-brand text-2xl font-extrabold text-ink">30Days</Link>

        {/* Login and Start Free (links that look like buttons) */}
        <div className="flex items-center gap-2">
          <Link 
            to='/login' 
            className='inline-flex min-h-11 items-center rounded-full border-2 border-ink px-5 text-sm font-semibold hover:bg-gray-100'>
            Log In
          </Link>
          <Link 
            to='/register'
            className="inline-flex min-h-11 items-center rounded-full bg-brand px-5 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            Start Free
          </Link>
        </div>
      </div>
    </header>
  );
}

export default HomeHeader;