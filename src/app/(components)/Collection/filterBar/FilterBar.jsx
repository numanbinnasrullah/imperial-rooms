'use client'
import { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import CollectionGrid from "../collectionGrid/CollectionGrid";

const FilterBar = ({collection}) => {
    const [showFilters, setShowFilters] = useState(false);
    
    const handleFilterToggle = () => {
        setShowFilters(!showFilters);
      };
  return (
    <>
        <div className="hidden lg:flex w-[90%] sm:w-[93%] md:w-[90%] lg:w-[85%] xl:w-[77%] mx-auto justify-between h-10 mb-4 text-gray-400 " 
        >
            <div className="w-[80%] sm:w-[40%] md:w-[31%] lg:w-[30%] xl:w-[30%] flex justify-between items-center">
                <div className="md:w-[59%] lg:w-[66%] xl:w-[70%] flex justify-between items-center cursor-pointer " onClick={handleFilterToggle}>
                    <span>Show Filters</span>
                    <span><MdOutlineKeyboardArrowDown /></span>
                </div>
                <div>139 Products</div>
            </div>

                {/* {showFilters && (
                <div className="mt-4 bg-gray-100 p-4 h-[700px]">
                
                <p>Filter content will be displayed here...</p>
                </div>
                )} */}

            <div className="w-[72%] flex justify-end items-center">
                <div className="md:w-[24%] lg:w-[20%] flex justify-between items-center cursor-pointer">
                    <span>Most Popular</span>
                    <span><MdOutlineKeyboardArrowDown /></span>
                </div>
            </div>


            {/* Filter Box */}
            <div className="absolute left-0 top-full w-full h-[700px] bg-gray-100 shadow-lg transition-all duration-300 ease-in-out hidden" id="filter-box">
                {/* Filter content goes here */}
                <p className="text-center mt-4">Filters will be displayed here.</p>
            </div>

        </div>
        <CollectionGrid showFilter={showFilters} collection={collection} />
    </>
  )
}

export default FilterBar;
