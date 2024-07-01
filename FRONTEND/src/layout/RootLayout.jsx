import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Background from "../assets/bottom-image.png";

export default function RootLayout() {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/userURL" ||
    location.pathname === "/about"; 

  return (
    <div
      style={{
        backgroundImage: isAuthPage ? "none" : `url(${Background})`,
        backgroundSize: isAuthPage ? "none" : "100% 100% ",
        backgroundAttachment: isAuthPage ? "none" : "fixed",
        backgroundRepeat: isAuthPage ? "none" : "no-repeat",
        height: "100vh",
      }}
    >
      <div className="navbar">
        <div>
          <NavLink to="/" className="navbar-link">
            Home
          </NavLink>
          <NavLink to="/about" className="navbar-link">
            About
          </NavLink>
        </div>
      </div>
      <div className="content">
        <Outlet />
      </div>

      {/* Media Query */}
      <style>{`
        @media (max-width: 200px) {
          .navbar-link {
            margin-left: 20px;
            margin-right: 20px;
            color: #334155;
            text-decoration: none;
            font-weight: bold;
            font-size: 2em;
          }

          body{
             background-size : 100% 100%;
          }
        }
      `}</style>
    </div>
  );
}
