import useAuth from '../../hooks/useAuth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function ProtectedRoute() {
  // get login info from cusotm hook
  const { isLoggedIn, authLoading } = useAuth();
  
  // remember page then send user back to page after login
  const location = useLocation();

  // wait while AuthProvider checks
  if (authLoading) {
    return <p className='p-8 text-center text-gray-500'>Loading...</p>
  }

  // not logged in redirect to Login
  if (!isLoggedIn) {
    return <Navigate to='/login' replace state={{ from: location }} />
  }

  return <Outlet />;

}

export default ProtectedRoute;