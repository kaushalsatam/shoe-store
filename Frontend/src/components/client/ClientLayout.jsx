import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

function ClientLayout({ isAuthenticated }) {
  return (
    <>
      {isAuthenticated ? (
        <Outlet />
      ) : (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
}

export default ClientLayout;
