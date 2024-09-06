'use client'
import { useState } from "react";

const FilterBar = () => {
    const [showFilters, setShowFilters] = useState(false);
    
    const handleFilterToggle = () => {
        setShowFilters(!showFilters);
      };
  return (
    <>
        <div className="hidden md:flex w-[90%] sm:w-[93%] md:w-[90%] lg:w-[85%] xl:w-[77%] mx-auto justify-between h-10 mb-4 text-gray-400 " 
        >
            <div className="w-[80%] sm:w-[40%] md:w-[31%] lg:w-[65%] xl:w-[35%] flex justify-between items-center">
                <div className="md:w-[59%] lg:w-[66%] xl:w-[70%] flex justify-between items-center cursor-pointer " onClick={handleFilterToggle}>
                    <span>Show Filters</span>
                    <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400 "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                </div>
                <div>139 Products</div>
            </div>

                {/* {showFilters && (
                <div className="mt-4 bg-gray-100 p-4 h-[700px]">
                
                <p>Filter content will be displayed here...</p>
                </div>
                )} */}

            <div className="w-[72%] flex justify-end items-center">
                <div className="md:w-[24%] lg:w-[30%] xl:w-[18%] flex justify-between items-center cursor-pointer">
                    <span>Most Popular</span>
                    <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400 "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                </div>
            </div>


            {/* Filter Box */}
            <div className="absolute left-0 top-full w-full h-[700px] bg-gray-100 shadow-lg transition-all duration-300 ease-in-out hidden" id="filter-box">
                {/* Filter content goes here */}
                <p className="text-center mt-4">Filters will be displayed here.</p>
            </div>

        </div>
        {/* <CollectionGrid showFilter={showFilters} /> */}
    </>
  )
}

export default FilterBar;
