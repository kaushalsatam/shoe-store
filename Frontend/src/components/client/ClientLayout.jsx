import { Outlet } from "react-router-dom";
import Header from "./Header/Header";

function ClientLayout({ isAuthenticated }) {
  return (
    <>
      {isAuthenticated ? (
        <Outlet />
      ) : (
        <>
          <Header isAuthenticated={isAuthenticated} />
          <Outlet />
        </>
      )}
    </>
  );
}

export default ClientLayout;
