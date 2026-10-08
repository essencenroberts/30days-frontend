// this is the styling for the frame around every logged in page

import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader";

function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
        <main className="max-auto max-w-6xl px-4 py-8 sm:px-6">
          <Outlet />
        </main>
    </div>
  );
}

export default AppLayout;