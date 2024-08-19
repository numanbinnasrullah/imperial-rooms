import { ImArrowUpRight2 } from "react-icons/im";
import GridSlider from "../../grid-slider/GridSlider";
import ShopByCategoryContent from "../text/ShopByCategoryContent";

const Grid = () => {
    return (
        <>
 <div className="flex flex-col md:flex-row w-full mt-8 lg:mt-20 ">
                {/* Left Side: Product Grid */}
                <div className="flex  flex-wrap md:w-3/5 lg:w-4/5 xl:w-[55%] xl:ml-20  pl-8 hidden lg:block ">
                    
                    <div className="w-full flex flex-wrap justify-end gap-10 mb-12">
                        <div className="w-[60%]  md:w-[100%]  lg:w-[90%] xl:w-[100%] 2xl:w-[90%] justify-center flex space-x-6 ">
                                <div className="flex flex-col items-center ">
                                    {/* Box */}
                                    <div className="bg-[#D9D9D9] w-full flex flex-col justify-between">
                                       
                                            <img src="/one.jpg" />
                                      
                                        {/* Button at the bottom */}
                                    </div>
                                    <div className="text-right w-full">
                                        <button className="bg-[#4A4759] text-white py-3 w-[80%]">Click Me</button>
                                    </div>
                                </div>
                      
                                <div className="flex flex-col items-center ">
                                    {/* Box */}
                                    <div className="bg-[#D9D9D9] w-full flex flex-col justify-between">
                                    <img src="/one.jpg" />
                                        {/* Button at the bottom */}
                                    </div>
                                    <div className="text-right w-full ">
                                        <button className="bg-[#4A4759] text-white py-3 w-[80%]">Click Me</button>
                                    </div>
                                </div>
                           
                        </div>
                    </div>

                    <div className="w-full flex flex-wrap justify-end gap-8 mb-12">
                    <div className="w-[60%]  md:w-[100%]  lg:w-[90%] xl:w-[100%] 2xl:w-[90%]   flex justify-end space-x-6 ">
                                <div className="flex flex-col items-center ">
                                    {/* Box */}
                                    <div className="bg-[#D9D9D9] w-full flex flex-col justify-between">
                                    <img src="/one.jpg" />
                                        {/* Button at the bottom */}
                                    </div>
                                    <div className="text-right w-full">
                                        <button className="bg-[#4A4759] text-white py-3 w-[80%]">Click Me</button>
                                    </div>
                                </div>
                      
                                <div className="flex flex-col items-center ">
                                    {/* Box */}
                                    <div className="bg-[#D9D9D9] w-full  flex flex-col justify-between">
                                    <img src="/one.jpg" />
                                        {/* Button at the bottom */}
                                    </div>
                                    <div className="text-right w-full ">
                                        <button className="bg-[#4A4759] text-white py-3 w-[80%]">Click Me</button>
                                    </div>
                                </div>
                           
                        </div>
                    </div>
                </div>

                
                {/* Right Side: Text Section */} 
                <ShopByCategoryContent />
            </div>
            
                <GridSlider />
        </>
    )
}

export default Grid