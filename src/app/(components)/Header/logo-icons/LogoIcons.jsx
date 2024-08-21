
'use client'
import {  FaStar } from 'react-icons/fa';
import { PiPhoneIncomingLight } from "react-icons/pi";
import { FiSearch, FiUser, FiHeart, FiShoppingCart } from "react-icons/fi";
import { useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import SearchSidebar from '../searchbar/searchSidebar';
import Image from 'next/image';
import Link from 'next/link';
const LogoIcons = ({sidebarOpen, toggleSidebar,searchsidebarOpen, toggleSearchbar}) => {
    // const [sidebarOpen, setSidebarOpen] = useState(false);

    // const toggleSidebar = () => {
    //     setSidebarOpen(!sidebarOpen);
    // };

    return (
        <>
            <header className="w-full text-[#000] py-2 max-sm:py-2 border-b-[1px]">
                <div className="w-full md:max-w-[81%] mx-auto max-md:py-0 flex md:flex-row justify-between items-center px-4" >
                    {/* Phone Number */}
                    <div className="flex flex-col text-md  md:mb-0 ">
                        <div className='hidden md:block'>
                        <div className='text-xs ml-6'>Help Line</div>
                        <div>
                        <span> <PiPhoneIncomingLight className="inline-block h-5 w-5  "  /> </span> <span className='underline text-md'> +123 456 7890</span>
                        </div>
                        </div>
                      
                        <div>
                        <div id="toggleOpen" className='flex items-center ml-auto  md:hidden gap-1.5'>
                            <button onClick={toggleSidebar}>
                            <svg className="w-7 h-7" fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clip-rule="evenodd"></path>
                            </svg>
                            </button>
                            <a href="#" className="text-xl hover:text-gray-400 "><FiSearch onClick={toggleSearchbar} /></a>
                        </div>
                        </div>
                    </div>

                    {/* Logo */}
                    <div className="w-2xl text-center md:mb-0 ml-12 max-sm:ml-10 max-md:ml-16 md:ml-10 lg:ml-36">
                        <Link href={"/"}>
                        <Image src="/logo_IR.svg" alt="Website Logo" className="mx-auto h-20 max-sm:h-14 max-md:h-16" width={150} height={100} />
                        
                        </Link>
                    </div>

                    {/* Icons and Rating */}
                    <div className="flex items-center space-x-4 max-sm:space-x-3">
                    <div className="hidden lg:flex space-x-1 lg:mr-4">
                        <FaStar className="text-yellow-500" />
                        <FaStar className="text-yellow-500" />
                        <FaStar className="text-yellow-500" />
                        <FaStar className="text-yellow-500" />
                        <FaStar className="text-yellow-500" />
                    </div>
                        <a href="#" className="text-2xl hover:text-gray-400 hidden md:block"><FiSearch /></a>
                        <a href="#" className="text-2xl hover:text-gray-400"><FiUser /></a>
                        <a href="#" className="text-xl hover:text-gray-400"><FiHeart /></a>
                        <a href="#" className="text-xl hover:text-gray-400"><FiShoppingCart /></a>
                    </div>
                </div>
            </header>
            


            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <SearchSidebar searchsidebarOpen={searchsidebarOpen} toggleSearchbar={toggleSearchbar} />
        </>
    )
}

export default LogoIcons;