// this will go around all logged out pages The Homeheader will be on top

import { Outlet } from "react-router-dom";
import HomeHeader from "./HomeHeader";
import Footer from "./Footer";

function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <HomeHeader />
      <main className="flex flex-grow items-center justify-center px-4 py-12"> 
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default PublicLayout;