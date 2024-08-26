import { FiSearch } from "react-icons/fi";
import Navbar from "../navbar/Navbar";

const SearchBar = () => {
  return (
    <div className="flex items-center border border-gray-300 py-1 px-2 max-w-md mx-auto">
      <input
        type="text"
        placeholder="Your Search"
        className="flex-grow p-2 focus:outline-none text-black"
      />
      <div className="border-l border-gray-300 h-8 mx-2"></div>
      <FiSearch className="h-6 w-6 text-black" />

    </div>
  );
};

export default SearchBar;
