// not logged in user 

import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from 'react-router-dom';

function PublicRoute() {
  const { isLoggedIn, authLoading } = useAuth();

  if (authLoading) {
    return <p className="p-8 text-center text-gray-500">Loading...</p>
  }

  // already logged in takes to dashboard
  if (isLoggedIn) {
    return <Navigate to ='/dashboard' replace />
  }

  // not ligged in shwo then Login or Register
  return <Outlet />;

}

export default PublicRoute;