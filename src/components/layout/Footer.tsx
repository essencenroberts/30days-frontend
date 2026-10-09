// footer for logged out pages
import { Link } from 'react-router-dom';

function Footer() {
  // get current year for copyright section
  const year = new Date().getFullYear();

  return (
    <footer className='border-t border-gray-200 bg-linear-to-r from-brand to-accent '>
      <div className='mx-auto flex max-w-6xl flex-wrap  flex-col items-center justify-center items-center gap-4 px-4 py-6 text-sm font-medium text-ink sm:px-6'>
        <p className='text-center'>© {year} 30Days Built by Essence</p>
        <nav aria-label='footer' className='flex gap-5 align-center'>
          <Link to='/login' className='bg-white rounded-full px-6 hover:text-ink'>Log in</Link>
          <Link to='/register' className=' rounded-full inline-flex px-6 bg-white hover:text-ink'>Sign Up</Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;