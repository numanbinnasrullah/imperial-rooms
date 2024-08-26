import { useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function Search1() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const toggleSearch = () => {
    setIsOpen(!isOpen);
    setQuery("");
    setSuggestions([]);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Sample static suggestions - you can replace this with actual data
    const allSuggestions = ["apple", "banana", "cherry", "date", "fig", "grape"];
    const filteredSuggestions = allSuggestions.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(filteredSuggestions);
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="relative">
      <div
      className={`flex items-center flex-row-reverse transition-all duration-300 ease-in-out ${
        isOpen ? "border-2 border-gray-300 p-2" : ""
      }`}
    >
      <FiSearch
        onClick={toggleSearch}
        className="cursor-pointer text-2xl hover:text-gray-400 hidden md:block"
      />
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? "w-96 opacity-100 ml-2" : "w-0 opacity-0 ml-0"
        } rounded-md focus:outline-none`}
      />
    </div>
        {query && suggestions.length > 0 && (
          <ul className="absolute w-full top-12 left-0 bg-white border border-gray-300  rounded-md shadow-lg mt-2 z-50">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setQuery(suggestion);
                  setSuggestions([]);
                }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
