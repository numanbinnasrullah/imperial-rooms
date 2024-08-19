import { ImArrowUpRight2 } from "react-icons/im";

const Reviews = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center lg:relative mt-16 lg:mt-0  w-[70%] mx-auto">
        <div>
          {/* Large Gradient Text */}
          <h1 className="lg:text-[200px] md:text-[150px] text-[60px] font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#7b7b7d] via-[#EDEDED] to-[#ffffff00] leading-tight">
            10.357+
          </h1>
        </div>

        <div className=" text-center lg:mt-[-50px] md:mt-[-35px] lg:top-52 space-y-2">
          {/* 30px Bold Text */}
          <p className="md:text-[30px] text-[20px] font-bold leading-tight tracking-wide ">
            Satisfied Customers from Imperial Rooms
          </p>

          {/* 16px Paragraph Text */}
          <p className="sm:text-[16px] text-sm leading-tight mb-7   ">
            This is a paragraph with 16px font size. It’s placed below the 30px text.This is a paragraph with 16px font size. It’s placed below the 30px text.This is a paragraph with 16px font size. It’s placed below the 30px text.
          </p>

          {/* Button */}
          {/* <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded leading-tight mt-9">
            Click Me
          </button> */}
           <div className="">
                <button className="p-4"><span className="font-medium md:text-lg "> More About Imperial Rooms <ImArrowUpRight2 className="inline-block font-semibold"/></span> </button>
            </div>
        </div>

      </div>
    </>
  )
}

export default Reviews