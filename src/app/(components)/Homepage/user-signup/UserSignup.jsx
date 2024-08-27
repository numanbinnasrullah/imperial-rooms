import SearchBar from "../../Header/searchbar/Searchbar"
import { FiSearch } from "react-icons/fi";


const UserSignup = () => {
  return (
    <>
        <div className="bg-[#F2F2F2] text-center space-y-8 h-[500px] w-full flex justify-center items-center flex-col mb-10">
            <h2 className="xl:text-[60px] md:text-[40px] text-[20px] ">Email Signup & Get 25% Off</h2>
            <div className="bg-[#fff] flex items-center border border-gray-300 py-1 px-2 md:w-[40%] w-[60%] mx-auto">
                <input
                    type="text"
                    placeholder="Email Address"
                    className="flex-grow p-2 px-7 focus:outline-none text-black w-[30%]"
                />
                <div className="border-l border-gray-300 h-8 mx-3"></div>
                <FiSearch className="h-6 w-6 mr-2 text-black" />

                </div>
        </div>
    </>
  )
}

export default UserSignup