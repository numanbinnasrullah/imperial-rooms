import SearchBar from "../../Header/searchbar/Searchbar"
import { FiSearch } from "react-icons/fi";


const UserSignup = () => {
  return (
    <>
        <div className="bg-[#F2F2F2] text-center space-y-8 h-[400px] w-full flex justify-center items-center flex-col">
            <div className="xl:text-[60px] md:text-[40px] text-[20px] ">Email Signup & Get 25% Off</div>
            <div className="flex items-center border border-gray-300 py-1 px-2 md:w-[40%] w-[60%] mx-auto">
                <input
                    type="text"
                    placeholder="Your Search"
                    className="flex-grow p-2 focus:outline-none text-black w-[30%]"
                />
                <div className="border-l border-gray-300 h-8 mx-2"></div>
                <FiSearch className="h-6 w-6 text-black" />

                </div>
        </div>
    </>
  )
}

export default UserSignup