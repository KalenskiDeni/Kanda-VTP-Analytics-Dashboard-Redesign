import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import homeOutlined from "../assets/icons/analytics.svg";
import homeFilled from "../assets/icons/search-filled.svg";
import matchOutlined from "../assets/icons/host-outlined.svg";
import matchFilled from "../assets/icons/host-filled.svg";
import chatOutlined from "../assets/icons/chat-outlined.svg";
import chatFilled from "../assets/icons/chat-filled.svg";
import profileFilled from "../assets/icons/profilefilled.svg";
import menuIcon from "../assets/icons/menu.svg";
import closeIcon from "../assets/icons/cross.svg";
import files from "../assets/icons/files.svg";
import profileOutlined from "../assets/icons/profile.svg";
import downloadApp from "../assets/icons/download.svg";
import support from "../assets/icons/support.svg";
import settings from "../assets/icons/settings.svg";
import logout from "../assets/icons/logout.svg";

export default function Nav() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // List of the pages where the sidebar is going to be removed
  const noSidebarPages = [
    "/home",
    "/profile",
    "/analytics",
    "/posts",
    "/leaderboard",
    "/mainissues",
    "/users",
    "/all-sessions",
    "/devices",
    "/posts/1",
    "/posts/2",
    "/posts/3",
    "/posts/4",
    "/posts/5",
    "/posts/6",
  ]; 

 
  const shouldHideSidebar = noSidebarPages.includes(location.pathname);

  return (
    <>
      {/* show the burger button if the page is not in the list*/}
      {!shouldHideSidebar && !isOpen && (
        <button className="burger-btn" onClick={() => setIsOpen(true)}>
          <img src={menuIcon} alt="Open Menu" />
        </button>
      )}

      {/* Only show the sidebar if the page is not in the `noSidebarPages` list */}
      {!shouldHideSidebar && (
        <nav className={`sidebar ${isOpen ? "open" : ""}`}>
  
          <div className="sidebar-header">
            <span className="app-name">Kanda Aps</span>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              <img src={closeIcon} alt="Close Menu" />
            </button>
          </div>

        
          <div className="nav-section top">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
              onClick={() => setIsOpen(false)}
            >
              <img
                src={location.pathname === "/home" ? homeFilled : homeOutlined}
                alt="Analytics"
              />
              <span>Analytics</span>
            </NavLink>

            <NavLink
              to="/files"
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
              onClick={() => setIsOpen(false)}
            >
              <img src={files} alt="Files" />
              <span>Files</span>
            </NavLink>

            <NavLink
              to="/create"
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
              onClick={() => setIsOpen(false)}
            >
              <img
                src={
                  location.pathname === "/create" ? matchFilled : matchOutlined
                }
                alt="Create Session"
              />
              <span>Create Session</span>
            </NavLink>
          </div>

        
          <div className="nav-section bottom">
            
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
              onClick={() => setIsOpen(false)}
            >
              <img
                src={
                  location.pathname === "/profile"
                    ? profileFilled
                    : profileOutlined
                }
                alt="Profile"
              />
              <span>Profile</span>
            </NavLink>

            <NavLink
              to="/downloadApp"
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
              onClick={() => setIsOpen(false)}
            >
              <img src={downloadApp} alt="Download App" />
              <span>Download the App</span>
            </NavLink>

            <NavLink
              to="/support"
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
              onClick={() => setIsOpen(false)}
            >
              <img src={support} alt="Support" />
              <span>Get Support</span>
            </NavLink>

           
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
              onClick={() => setIsOpen(false)}
            >
              <img src={settings} alt="Settings" />
              <span>Settings</span>
            </NavLink>

            <NavLink
              to="/logout"
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
              onClick={() => setIsOpen(false)}
            >
              <img src={logout} alt="Log Out" />
              <span>Log Out</span>
            </NavLink>
          </div>
        </nav>
      )}
    </>
  );
}
