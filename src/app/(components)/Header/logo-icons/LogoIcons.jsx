
'use client'
import { useEffect, useState } from 'react';
import {  FaStar } from 'react-icons/fa';
import { PiPhoneIncomingLight } from "react-icons/pi";
import { FiSearch, FiUser, FiHeart, FiShoppingCart } from "react-icons/fi";
import Sidebar from '../sidebar/Sidebar';
import SearchSidebar from '../searchbar/searchSidebar';
import Image from 'next/image';
import Link from 'next/link';
import Search1 from '../searchbar/Search1';
import LogoSkeleton from '../../Skeletons/logoSkeleton/LogoSkeleton';
const LogoIcons = ({sidebarOpen, toggleSidebar,searchsidebarOpen, toggleSearchbar}) => {
    // const [sidebarOpen, setSidebarOpen] = useState(false);

    // const toggleSidebar = () => {
    //     setSidebarOpen(!sidebarOpen);
    // };
    const [showBanner, setShowBanner] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
          setShowBanner(false);
        }, 1000); // 2 seconds delay
    
        return () => clearTimeout(timer); // Cleanup the timer on component unmount
      }, []);
    return (
        <>
            <header className="w-[100%] text-[#000] h-24 md:h-28 flex  max-sm:py-2 border-b-[1px]">
                <div className="w-full md:max-w-[90%] h-[100%]  xl:max-w-[75%] mx-auto max-md:py-0 flex md:flex-row justify-between items-center " >
                    {/* Phone Number */}
                    <div className="flex flex-col justify-center text-md  items-center md:mb-0 w-[30%] md:w-[30%] h-[100%] ">
                        <div className='hidden md:block'>
                            <div className='text-md ml-6'>Help Line</div>
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
                    {
                        (
                    <div className="w-2xl text-center md:mb-0 max-sm:ml-10 max-md:ml-16 flex justify-center w-[30%] md:w-[35%] h-[100%] items-center">
                        <Link href={"/"}>
                        <Image src="/logo_IR.svg" alt="Website Logo" className="mx-auto h-16 md:h-20 " width={150} height={100} />
                        
                        </Link>
                    </div>
                        )
                    }
                    

                    {/* Icons and Rating */}
                    <div className="relative flex items-center justify-around max-sm:space-x-3 w-[30%] md:w-[30%] lg:w-[35%] xl:w-[30%] h-[100%] ">
                    <div className="hidden lg:flex space-x-1 flex-col">
                       <div className='flex space-x-1.5'>
                        <FaStar className="text-yellow-500 text-sm" />
                        <FaStar className="text-yellow-500 text-sm" />
                        <FaStar className="text-yellow-500 text-sm" />
                        <FaStar className="text-yellow-500 text-sm" />
                        <FaStar className="text-yellow-500 text-sm" />
                       </div>
                       <div className='text-sm'>
                        4.5+ ratings on Fifo
                       </div>
                    </div>
                    <div className='flex w-[70%] lg:w-[40%] justify-between ' >
                        <Search1 />
                        <a href="#" className="text-2xl hover:text-gray-400"><FiUser /></a>
                        <a href="#" className="text-2xl hover:text-gray-400"><FiHeart /></a>
                        <a href="#" className="text-2xl hover:text-gray-400 relative"><FiShoppingCart />
                        <span className='absolute bottom-5 left-4 text-xs bg-green-600 px-1 py-.5 rounded-full text-white'>1</span>
                        </a>
                    </div>
                       
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