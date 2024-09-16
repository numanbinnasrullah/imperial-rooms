'use client'

import NavbarSkeleton from "@/skeleton/NavbarSkeleton";
import { useGetMenuQuery } from "@/store/services/homePageService";
import Link from "next/link";
import { useEffect } from "react";
import Loading from "./Loading";
import MenuSkeleton from "../../Skeletons/navbarSkeleton/NavbarSkeleton";

const Navbar = ({hiddenOnMd, setSidebarOpen}) => {
  const {data, isLoading} =  useGetMenuQuery();
  console.log("Get Menu", data)

  const getLastUrlPart = (url) => {
    if (url.endsWith('#')) {
      e.preventDefault();
    }
    // console.log("Get Last URL", url)
    const urlParts = url?.split('/');
    return urlParts[urlParts.length - 1];
  };

  const handleLinkClick = () => {
    setSidebarOpen(false);
    console.log("navbar")
  };
  useEffect(() => {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
      link.addEventListener('click', handleLinkClick);
    });

    return () => {
      links.forEach(link => {
        link.removeEventListener('click', handleLinkClick);
      });
    };
  }, []);
  return (
    <>
      {/* Navbar */}
      
      { 
        
        <nav className={`w-full text-center min-h-9 py-0 border-b-[1px] ${hiddenOnMd ? 'hidden md:block' : 'md:block'}`}>
        <ul className={`flex justify-center flex-wrap items-center  space-x-4 min-h-9 text-black  ${hiddenOnMd ? 'items-center' : 'flex-col border-b-2'}`}>
       
       {
         data?.res?.data?.menu?.items?.length > 0 && (
           data?.res?.data?.menu?.items?.map(mainItem => (
             <li className={`group relative`} key={mainItem?.id}>
             <Link href={`/collections/${getLastUrlPart(mainItem?.url)}`}
               className={`hover:text-gray-600 hover:fill-gray-500  text-md flex items-center justify-between  `}>
                 <span>
                   {
                     hiddenOnMd ? "" : <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" class="mr-4 inline-block"
                     viewBox="0 0 64 64">
                     <path
                       d="M61.92 30.93a7.076 7.076 0 0 0-6.05-5.88 8.442 8.442 0 0 0-.87-.04V22A15.018 15.018 0 0 0 40 7H24A15.018 15.018 0 0 0 9 22v3.01a8.442 8.442 0 0 0-.87.04 7.076 7.076 0 0 0-6.05 5.88A6.95 6.95 0 0 0 7 38.7V52a3.009 3.009 0 0 0 3 3v6a1 1 0 0 0 1 1h3a1 1 0 0 0 .96-.73L16.75 55h30.5l1.79 6.27A1 1 0 0 0 50 62h3a1 1 0 0 0 1-1v-6a3.009 3.009 0 0 0 3-3V38.7a6.95 6.95 0 0 0 4.92-7.77ZM11 22A13.012 13.012 0 0 1 24 9h16a13.012 13.012 0 0 1 13 13v3.3a6.976 6.976 0 0 0-5 6.7v3.18a3 3 0 0 0-1-.18H17a3 3 0 0 0-1 .18V32a6.976 6.976 0 0 0-5-6.7Zm37 16v5H16v-5a1 1 0 0 1 1-1h30a1 1 0 0 1 1 1ZM13.25 60H12v-5h2.67ZM52 60h-1.25l-1.42-5H52Zm3.83-23.08a1.008 1.008 0 0 0-.83.99V52a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V37.91a1.008 1.008 0 0 0-.83-.99 4.994 4.994 0 0 1 .2-9.88A4.442 4.442 0 0 1 9 27h.01a4.928 4.928 0 0 1 3.3 1.26A5.007 5.007 0 0 1 14 32v12a1 1 0 0 0 1 1h34a1 1 0 0 0 1-1V32a5.007 5.007 0 0 1 1.69-3.74 4.932 4.932 0 0 1 3.94-1.22 5.018 5.018 0 0 1 4.31 4.18v.01a4.974 4.974 0 0 1-4.11 5.69Z"
                       data-original="#000000" />
                   </svg>
                   }
                 
                 {mainItem?.title}
                 </span>
                 {
                   mainItem?.items?.length > 0 &&  (
                     <svg
                     xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" class=" inline-block"
                     viewBox="0 0 24 24">
                     <path
                       d="M12 16a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1-.7.29z"
                       data-name="16" data-original="#000000" />
                   </svg>
                   )
                 }
             
             </Link>
            {
             mainItem?.items?.length > 0 && (
               <ul
             class='absolute top-15 max-lg:top-8 left-0 z-50 block space-y-1 shadow-lg bg-white max-h-0 overflow-hidden min-w-[250px] group-hover:opacity-100 group-hover:max-h-[700px] px-0 group-hover:pb-0 group-hover:pt-4 transition-all duration-500'>
               {
                 mainItem?.items?.map(subItem => (
                   <li class=' py-2' key={subItem?.id}>
               <Link href={`/collections/${getLastUrlPart(subItem?.url)}`}
                 class='hover:text-gray-600 hover:fill-gray-600 text-md block nav-link'>
                 {subItem?.title}
               </Link>
             </li>
                 ))
               }
             </ul>
             )
            }
           </li>
           ))
         )
       }  
       </ul>
       
       
     </nav>
      }
      
    </>
  )
}

export default Navbar