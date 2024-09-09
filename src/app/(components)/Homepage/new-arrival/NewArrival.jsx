

import { BsArrowUpRight } from "react-icons/bs";

const NewArrival = () => {
  return (
    <>
        <div className="xl:w-[75%] lg:w-[90%] mx-auto lg:h-[800px]  flex flex-col lg:flex-row space-y-10" >
            <div className="lg:w-[50%] md:w-full flex lg:justify-end items-end justify-center ">
              <div className="lg:w-[80%] md:w-full flex lg:flex-col md:flex-row flex-col items-center justify-evenly gap-10 lg:mt-20">
                  <div className="lg:w-full md:w-[47%] w-[90%] h-[50%] flex items-end justify-center md:justify-end lg:justify-start lg:py-10"> 

                  <div className="w-[70%] ">
                    <div className="w-full ">
                        <h2 className="xl:text-6xl lg:text-5xl text-2xl text-center  md:text-4xl  lg:text-left md:text-center text-black" >New Arrival on Store</h2>
                        <p className="mt-2 text-md lg:leading-7 text-black">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry </p>
                        <div className="text-right">
                            <button className="p-4 ">
                              <span className="text-xl text-black mr-1"> Browse </span>
                              <BsArrowUpRight className="inline-block text-xl text-black" />
                            </button>
                        </div>
                    </div>
                </div>

                  </div>

                  <div className="flex lg:items-end  lg:justify-start justify-center lg:w-full md:w-[47%]  h-[50%]">
                    <div className="w-[310px]  bg-[#4A4759]">
                      <img src="/banners/newarrival3.jpg" />
                    </div>
                  </div>

              </div>
            </div>
            <div className="lg:w-[50%] md:w-full w-[80%] flex lg:justify-end md:justify-center justify-end mx-auto">
                <div className=" lg:w-[80%] md:w-[50%] w-[79%] h-[500px] sm:h-[550px]  md:h-[600px] relative  md:ml-[16%] lg:ml-0 ">
                    <div className="  absolute w-full "> 
                      <img src="/banners/newarrival.jpg" />
                    </div>
                    <div className="  absolute w-full xl:top-24 xl:right-28 lg:top-20 lg:right-24 md:top-28 md:right-28  top-20 right-20">
                      <img src="/banners/newarrival.jpg" />
                    </div>
                </div>
            </div>
            
        </div>
    </>
  )
}

export default NewArrival