import { ImArrowUpRight2 } from "react-icons/im";

const ShopByCategoryComtent = () => {
  return (
    <div className="w-full md:w-2/5 xl:pt-16   mt-4 md:mt-0 lg:pt-14  xl:mr-20 lg:mb-14 mb-7 mx-auto">
      <div className="w-[60%] lg:w-[75%] md:w-[100%] xl:w-[48%] mx-auto">
        <h1 className="xl:text-6xl lg:text-5xl text-2xl text-center font-bold md:text-4xl  lg:text-left md:text-center" >Shop By Category</h1>
        <p className="mt-2 text-sm lg:leading-7">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry </p>
        <div className="text-right">
          <button className="py-4"><span className="font-semibold text-lg "> Browse <ImArrowUpRight2 className="inline-block font-semibold" /></span> </button>
        </div>
      </div>
    </div>
  )
}

export default ShopByCategoryComtent