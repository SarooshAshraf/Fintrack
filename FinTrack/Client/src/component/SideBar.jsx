import React, { useContext, createContext, useState, useEffect } from "react";
import { Home, Tags, LogOut, Menu } from "lucide-react"; // Import Menu (hamburger) icon
import logo from "../assets/FinTarck__1_-removebg-preview.png";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import axios from "axios";

const SidebarContext = createContext();

export default function TopBar({ activeItem, setActiveItem }) {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // State to hold user info from decoded token
  const [userInfo, setUserInfo] = useState(null);

  // State to control dropdown visibility on small screens
  const [menuOpen, setMenuOpen] = useState(false);

  // Logout function
  const handleLogout = async () => {
    try {
      // Call the logout API (adjust the URL to your actual API endpoint)
      await axios.post("http://localhost:3000/api/users/logout");

      // Clear localStorage
      localStorage.clear();

      // Redirect to login page
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Function to manually decode JWT token
  const decodeToken = () => {
    const token = localStorage.getItem("token"); // Get the token from localStorage

    if (token) {
      try {
        // JWT has three parts separated by dots: header, payload, and signature
        const payload = token.split(".")[1]; // Get the payload (second part of the token)

        // Decode the base64 payload
        const decodedPayload = JSON.parse(atob(payload));

        // Set user info from the decoded payload
        setUserInfo(decodedPayload);
      } catch (error) {
        console.error("Error decoding token:", error);
        // Handle invalid token
      }
    }
  };

  // Decode token on component mount
  useEffect(() => {
    decodeToken(); // Decode token and set user info
  }, []);

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth <= 850; // Change breakpoint to 850px
      setIsSmallScreen(isSmall);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle menu for small screens
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="h-16 w-full flex items-center border border-b-indigo-400 border-b-2 justify-between bg-white shadow-sm px-4">
      {/* Left side with navigation links */}
      <div className="flex items-center space-x-4">
        <SidebarContext.Provider value={{}}>
          {/* Show hamburger menu icon on small screens */}
          {isSmallScreen ? (
            <button
              onClick={toggleMenu}
              className="bg-slate-200 p-2 rounded" // Added slate-200 background color
            >
              <Menu
                className="text-gray-600 h-6 w-6"
                style={{ color: "#4A5568" }}
              />{" "}
              {/* Fix hamburger icon color */}
            </button>
          ) : (
            <ul className="flex space-x-6">
              <TopBarItem
                icon={<Home />}
                text="Dashboard"
                active={activeItem === "Dashboard"}
                onClick={() => setActiveItem("Dashboard")}
              />
              <TopBarItem
                icon={<Tags />}
                text="Promo Codes"
                active={activeItem === "Promo Codes"}
                onClick={() => setActiveItem("Promo Codes")}
              />
            </ul>
          )}
        </SidebarContext.Provider>
      </div>

      {/* Centered logo */}
      <div className="flex justify-center flex-1">
        <img
          src={logo}
          className="h-12 max-w-xs sm:max-w-xs md:max-w-[200px]" // Limit logo size to prevent stretching
          alt="Logo"
        />
      </div>

      {/* Right side with logout (only on larger screens) */}
      <div className="flex items-center space-x-4">
        {!isSmallScreen && (
          <>
            {userInfo ? (
              <div className="flex items-center">
                {/* Display decoded user info */}
                <div className="ml-3 leading-4">
                  <h4 className="font-semibold">
                    {userInfo.username || "Unknown User"}
                  </h4>
                  <span className="text-xs text-gray-600">
                    {userInfo.email || "No Email"}
                  </span>
                </div>
              </div>
            ) : (
              <div>Loading user info...</div>
            )}

            <SidebarContext.Provider value={{}}>
              <ul className="flex">
                <TopBarItem
                  icon={<LogOut />}
                  text="Logout"
                  active={activeItem === "LogOut"}
                  onClick={handleLogout}
                />
              </ul>
            </SidebarContext.Provider>
          </>
        )}
      </div>

      {/* Dropdown menu for small screens (with user info and menu items) */}
      {isSmallScreen && menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg z-10">
          <ul className="flex flex-col space-y-4 p-4">
            {userInfo && (
              <li className="flex flex-col space-y-1 text-gray-800">
                <h4 className="font-semibold">
                  {userInfo.username || "Unknown User"}
                </h4>
                <span className="text-xs text-gray-600">
                  {userInfo.email || "No Email"}
                </span>
              </li>
            )}
            <TopBarItem
              icon={<Home />}
              text="Dashboard"
              active={activeItem === "Dashboard"}
              onClick={() => {
                setActiveItem("Dashboard");
                setMenuOpen(false);
              }}
            />
            <TopBarItem
              icon={<Tags />}
              text="Promo Codes"
              active={activeItem === "Promo Codes"}
              onClick={() => {
                setActiveItem("Promo Codes");
                setMenuOpen(false);
              }}
            />
            <TopBarItem
              icon={<LogOut />}
              text="Logout"
              active={activeItem === "LogOut"}
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
            />
          </ul>
        </div>
      )}
    </header>
  );
}

function TopBarItem({ icon, text, active, onClick }) {
  return (
    <li
      onClick={onClick}
      className={`
        relative flex items-center py-2 px-3
        font-medium cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }
    `}
    >
      {icon}
      <span className={`ml-2`}>{text}</span>
    </li>
  );
}
