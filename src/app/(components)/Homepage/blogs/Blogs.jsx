'use client'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ImArrowUpRight2 } from "react-icons/im";
import { PiArrowUpRightThin } from "react-icons/pi";

const Blogs = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        draggable: true,
        responsive: [
            {
              breakpoint: 768, // Adjust for smaller screens
              settings: {
                
                slidesToShow: 1,
              }
            },
            {
              breakpoint: 1300, // Adjust for smaller screens
              settings: {
                
                slidesToShow: 2,
              }
            }
          ]
      };
  return (
    <section className="bg-white dark:bg-gray-900">
    <div className="w-[95%] px-6 py-10 mx-auto ">
      <div className="flex items-center  md:justify-end justify-center space-x-10 w-full md:w-[50%] lg:w-[35%] xl:w-[30%]">
          <h2 className="md:text-[20px] text-[16px] font-semibold">Our Stories</h2>
          <button className="py-4"><span className=" md:text-lg text-md"> Browse <ImArrowUpRight2 className="inline-block " /></span> </button>
        </div>

      <div className="mt-8">
        <Slider {...settings}>
          <div className="px-4 outline-none focus:outline-none">
            <img 
              className="relative z-10 object-cover w-full rounded-md h-96 outline-none focus:outline-none" 
              src="https://images.unsplash.com/photo-1644018335954-ab54c83e007f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
              alt="" 
            />
            <div className="relative z-20 max-w-lg p-6 mx-auto -mt-20 bg-white rounded-md shadow dark:bg-gray-900 outline-none focus:outline-none">
              <a href="#" className="font-semibold text-gray-800 hover:underline dark:text-white md:text-md outline-none focus:outline-none">
                All the features you want to know
              </a>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-300 md:text-sm outline-none focus:outline-none">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure veritatis sint autem nesciunt,
                laudantium quia tempore delect
              </p>
              <div className='flex w-full'>
                <div className='w-[30%] '>
                  <p className="mt-1 text-sm text-[#BABABA] outline-none focus:outline-none border-r-2">21-10-2019</p>
                </div>
                <div className='flex justify-between w-[70%] px-4'>
                  <button className="mt-1 text-sm text-[#BABABA] outline-none focus:outline-none"> Read More</button>
                  <button className="mt-1 text-sm text-[#BABABA] "><PiArrowUpRightThin className='text-2xl'/></button>
                </div>
              </div>
              
            </div>
          </div>

          <div className="px-4 outline-none focus:outline-none">
            <img 
              className="relative z-10 object-cover w-full rounded-md h-96 outline-none focus:outline-none" 
              src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
              alt=" "
            />
            <div className="relative z-20 max-w-lg p-6 mx-auto -mt-20 bg-white rounded-md shadow dark:bg-gray-900 outline-none focus:outline-none">
              <a href="#" className="font-semibold text-gray-800 hover:underline dark:text-white md:text-md outline-none focus:outline-none">
                How to use sticky note for problem solving
              </a>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-300 md:text-sm outline-none focus:outline-none">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure veritatis sint autem nesciunt,
                laudantium quia tempore delect
              </p>
              <div className='flex w-full'>
                <div className='w-[30%] '>
                  <p className="mt-1 text-sm text-[#BABABA] outline-none focus:outline-none border-r-2">21-10-2019</p>
                </div>
                <div className='flex justify-between w-[70%] px-4'>
                  <button className="mt-1 text-sm text-[#BABABA] outline-none focus:outline-none"> Read More</button>
                  <button className="mt-1 text-sm text-[#BABABA] "><PiArrowUpRightThin className='text-2xl'/></button>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 outline-none focus:outline-none">
            <img 
              className="relative z-10 object-cover w-full rounded-md h-96 outline-none focus:outline-none" 
              src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
              alt=" "
            />
            <div className="relative z-20 max-w-lg p-6 mx-auto -mt-20 bg-white rounded-md shadow dark:bg-gray-900 outline-none focus:outline-none">
              <a href="#" className="font-semibold text-gray-800 hover:underline dark:text-white md:text-md outline-none focus:outline-none">
                How to use sticky note for problem solving
              </a>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-300 md:text-sm outline-none focus:outline-none">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure veritatis sint autem nesciunt,
                laudantium quia tempore delect
              </p>
              <div className='flex w-full'>
                <div className='w-[30%] '>
                  <p className="mt-1 text-sm text-[#BABABA] outline-none focus:outline-none border-r-2">21-10-2019</p>
                </div>
                <div className='flex justify-between w-[70%] px-4'>
                  <button className="mt-1 text-sm text-[#BABABA] outline-none focus:outline-none"> Read More</button>
                  <button className="mt-1 text-sm text-[#BABABA] "><PiArrowUpRightThin className='text-2xl'/></button>
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  </section>
  )
}

export default Blogs
