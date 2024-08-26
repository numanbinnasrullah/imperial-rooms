import { BsArrowUpRight } from "react-icons/bs";


const ShopByCategoryComtent = () => {
  return (
    <div className="w-full md:w-2/5 xl:pt-16 xl:pr-16   mt-4 md:mt-0 lg:pt-14  xl:mr-20 lg:mb-14 mb-7 mx-auto">
      <div className="w-[60%] lg:w-[75%] md:w-[100%] xl:w-[48%] mx-auto ">
        <h2 className="xl:text-6xl lg:text-5xl text-2xl text-center  md:text-4xl  lg:text-left md:text-center text-black" >Shop By Category</h2>
        <p className="mt-2 text-md lg:leading-7">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry </p>
        <div className="text-right">
        <button className="p-4 ">
                              <span className="text-lg text-black mr-1"> Browse </span>
                              <BsArrowUpRight className="inline-block text-lg text-black" />
                            </button>
        </div>
      </div>
    </div>
  )
}

export default ShopByCategoryComtent