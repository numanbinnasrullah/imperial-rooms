import Link from "next/link";

import { FaFacebookF } from "react-icons/fa";
import { SiInstagram } from "react-icons/si";
import { IoLogoYoutube } from "react-icons/io";
import { FaPinterestP } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import Image from "next/image";
import Footerbar from "./Footerbar";

const Footer = () => {
    return (
        <>
            <div className="bg-[#F2F2F2] w-full px-9 py-10  xl:px-44 xl:py-14 xl:space-x-4 lg:px-8 lg:py-10 flex flex-wrap justify-center"> 
                <div className="lg:w-[30%] md:w-[50%] leading-6 ">
                    <h2 className="text-lg font-semibold mb-6">GET IN TOUCH</h2>
                    <p>+44 20 850 77 44</p>
                    <p>info@imperialrooms.co.uk</p>
                    <p>Imperial Homeware London LTD. 269 Welington Road, Unit 1, Handsworth, Birmingham B20 2 QQ</p>
                </div>
                <div className="lg:w-[20%] md:w-[50%] w-full">
                    <h2 className="text-lg font-semibold mb-6">Usefull Information</h2>
                    <div className="flex flex-col text-sm leading-7">
                        <Link href='/about'>Blog</Link>
                        <Link href='/about'>About Us</Link>
                        <Link href='/about'>Privecy Policy</Link>
                        <Link href='/about'>Shipping Information</Link>
                        <Link href='/about'>Security Information</Link>
                        <Link href='/about'>Sitemap</Link>
                        <Link href='/about'>Offers</Link>
                    </div>
                   
                </div>
                <div className="lg:w-[20%] md:w-[50%] w-full">
                    <h2 className="text-lg font-semibold mb-6">Customer Service</h2>
                    <div className="flex flex-col text-sm leading-7">
                        <Link href='/about'>Terms And Conditions</Link>
                        <Link href='/about'>Track Your Order</Link>
                        <Link href='/about'>Return Policy</Link>
                        <Link href='/about'>Refund Policy</Link>
                        <Link href='/about'>Contact Us</Link>
                        <Link href='/about'>FAQ's</Link>
                        <Link href='/about'>Customer Reviews</Link>
                    </div>
                   
                </div>
             
               
            </div>
        <Footerbar />
        </>
    )
}

export default Footer