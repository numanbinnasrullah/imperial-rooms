'use client'
import { useState } from "react";
import Announcement from "./announcement-bar/Announcement";
import LogoIcons from "./logo-icons/LogoIcons";
import Navbar from "./navbar/Navbar";


const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchsidebarOpen, setSearchSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };
    const toggleSearchbar = () => {
      setSearchSidebarOpen(!searchsidebarOpen);
      console.log("toggleSearchbar")
    };
  return (
    <>
        <Announcement />
        <LogoIcons sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} toggleSearchbar={toggleSearchbar}  searchsidebarOpen={searchsidebarOpen} />
        {/* <Navbar hiddenOnMd={true} setSidebarOpen={setSidebarOpen} /> */}
    </>
  )
}

export default Header;