'use client'
import { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';

const FilterBar = () => {
    const router = useRouter();
    const [showFilters, setShowFilters] = useState(false);
    const [showSortOptions, setShowSortOptions] = useState(false);
    const sortOptionsRef = useRef(null);

    const handleFilterToggle = () => {
        setShowFilters(!showFilters);
    };

    const handleSortOptionsToggle = () => {
        setShowSortOptions(!showSortOptions);
    };

    const handleClickOutside = (event) => {
        if (sortOptionsRef.current && !sortOptionsRef.current.contains(event.target)) {
            setShowSortOptions(false);
        }
    };

    const heandleSort = (sortValue) => {
      console.log(`Sorthing`, sortValue)
      const params = new URLSearchParams(window.location.search);
      params.set("sort_by", sortValue);
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      router.push(newUrl);
      
    //   setTimeout(() => {
    //     window.location.reload();
    //   }, 1000);
      console.log("params", params)
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className="hidden md:flex w-[90%] sm:w-[93%] md:w-[90%] lg:w-[85%] xl:w-[77%] mx-auto justify-between h-10 mb-4 text-gray-400">
                <div className="w-[80%] sm:w-[40%] md:w-[31%] lg:w-[65%] xl:w-[35%] flex justify-between items-center">
                    <div
                        className="md:w-[59%] lg:w-[66%] xl:w-[70%] flex justify-between items-center cursor-pointer"
                        onClick={handleFilterToggle}
                    >
                        <span>Show Filters</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gray-400"
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

                <div className="relative w-[72%] flex justify-end items-center">
                    <div
                        className="md:w-[24%] lg:w-[30%] xl:w-[18%] flex justify-between items-center cursor-pointer"
                        onClick={handleSortOptionsToggle}
                    >
                        <span>Most Popular</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gray-400"
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
                    {showSortOptions && (
                        <div ref={sortOptionsRef} className="absolute right-0 top-full mt-2 w-[200px] bg-white shadow-lg rounded-lg z-10">
                            <ul className="text-gray-700">
                                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={()=>heandleSort("best-selling")}>Best Selling</li>
                                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={()=>heandleSort("alphabetically-A-Z")}>Alphabetically, A-Z</li>
                                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={()=>heandleSort("alphabetically-Z-A")}>Alphabetically, Z-A</li>
                                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={()=>heandleSort("price-heigh-low")}>Price, Heigh to Low</li>
                                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={()=>heandleSort("price-low-heigh")}>Price, Low to Heigh</li>
                                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={()=>heandleSort("created-assending")}>Date, Old to New</li>
                                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={()=>heandleSort("created-descending")}>Price, New to Old</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {showFilters && (
                <div className="mt-4 bg-gray-100 p-4 h-[700px]">
                    <p>Filter content will be displayed here...</p>
                </div>
            )}
        </>
    );
};

export default FilterBar;
