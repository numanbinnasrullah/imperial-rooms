import { BsArrowUpRight } from "react-icons/bs";

const Reviews = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center lg:relative mt-16 lg:mt-0  w-[70%] mx-auto">
        <div>
          {/* Large Gradient Text */}
          <h1 className="lg:text-[220px] md:text-[150px] text-[60px] font-black text-transparent bg-clip-text bg-gradient-to-b from-[#7b7b7d] via-[#eae9e9]  to-[#ffffff00] leading-tight ">
            10.357+
          </h1>
        </div>

        <div className=" text-center lg:mt-[-50px] md:mt-[-35px] lg:top-52 space-y-2">
          {/* 30px Bold Text */}
          <h2 className="md:text-[30px] text-[22px]  leading-tight tracking-wide ">
            Satisfied Customers from Imperial Rooms
          </h2>

          {/* 16px Paragraph Text */}
          <p className="sm:text-[17px] text-md leading-tight mb-7 font-medium  ">
            This is a paragraph with 16px font size. It’s placed below the 30px text.This is a paragraph with 16px font size. It’s placed below the 30px text.This is a paragraph with 16px font size. It’s placed below the 30px text.
            This is a paragraph with 16px font size. It’s placed below the 30px text.
          </p>

          {/* Button */}
          {/* <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded leading-tight mt-9">
            Click Me
          </button> */}
           <div className="">
                <button className="p-4"><span className="font-medium md:text-xl "> More About Imperial Rooms  <BsArrowUpRight className="inline-block text-xl text-black" /></span> </button>
            </div>
        </div>

      </div>
    </>
  )
}

export default Reviews