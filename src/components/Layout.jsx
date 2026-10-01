import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Breadcrumbs from './Breadcrumbs';
import { Outlet } from "react-router-dom";
 
function Layout() {
  return (
    <>
      <Header />

      <div className="container mx-auto px-4 py-6">
        <main>
          <Breadcrumbs />
          <Outlet />
        </main>
      </div>

      <Footer />
    </>
  );
}
 
export default Layout;