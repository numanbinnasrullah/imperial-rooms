
'use client'

import SocialIcons from "../../socialIcons/SocialIcons";
import Navbar from "../navbar/Navbar";
import SearchBar from "../searchbar/Searchbar";

const Sidebar = ({sidebarOpen, toggleSidebar}) => {
  return (
    <>
    {/* Overlay */}
    {sidebarOpen && (
        <div
          className="fixed inset-0 bg-white opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}

       {/* Sidebar */}
       <div className={`fixed left-0 w-80 h-full  text-white bg-[#fff] transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
                <div className="p-4">
                    {/* <button onClick={toggleSidebar} className="text-2xl">&times;</button> */}
                    {/* <SearchBar /> */}
                    {/* Navbar */}
                    <Navbar hiddenOnMd={false}/>
                    <SocialIcons />
                    
                </div>
            </div>

        

    </>
         
  )
}

export default Sidebar;