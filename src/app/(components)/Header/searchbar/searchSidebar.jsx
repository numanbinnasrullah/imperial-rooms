
'use client'

import SearchBar from "../searchbar/Searchbar";

const SearchSidebar = ({searchsidebarOpen, toggleSearchbar}) => {

  return (
    <>
     {/* Overlay */}
     {searchsidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleSearchbar}
        ></div>
      )}
       {/* Sidebar */}
       <div className={`fixed left-0 w-full h-full  text-white bg-[#fff] transform ${searchsidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
        <div className="text-center mt-2 ">
         <button onClick={toggleSearchbar} className="text-2xl text-black border px-2 rounded-full">&times;</button> 
        </div>
                <div className="p-4">                   
                    <SearchBar /> 
                </div>
            </div>
    </>      
  )
}

export default SearchSidebar;