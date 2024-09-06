'use client'
import { useGetFiltersMutation } from "@/store/services/collectionPageService";
import { useEffect, useState } from "react";

const Filters = ({ slug }) => {
  const [getFilters, response] = useGetFiltersMutation();
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const toggleFilter = (index) => {
    if (openIndex === index) {
      setOpenIndex(null); // Close the currently open filter
    } else {
      setOpenIndex(index); // Open the clicked filter and close others
    }
  };

//   const handleSizeChange = (size) => {
//     setSelectedSizes((prevSelectedSizes) => {
//       const newSelectedSizes = prevSelectedSizes.includes(size)
//         ? prevSelectedSizes.filter((selectedSize) => selectedSize !== size)
//         : [...prevSelectedSizes, size];
//       updateUrl({ size: newSelectedSizes, color: selectedColors });
//       window.location.reload();
//       return newSelectedSizes;
//     });
//   };

  useEffect(() => {
    getFilters({ slug });
  }, [slug, getFilters]);

  return (
    <div className='lg:w-[40%] xl:w-[23%] h-full border hidden lg:block'>
      <div className="max-w-3xl mx-auto p-4">
        {response?.data?.res?.data?.collection?.products?.filters && (
          <>
            {/* Availability Filter */}
            {response.data.res.data.collection.products.filters.filter(filter => filter.label.includes('Availability')).map((filter, index) => (
              <div key={filter.id} className="">
                <div
                  className="flex justify-between items-center border-b p-2 cursor-pointer"
                  onClick={() => toggleFilter(index)}
                >
                  <span>{filter.label}</span>
                  <span>
                    {openIndex === index ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </span>
                </div>
                {openIndex === index && (
                  <div className="bg-white px-4 pt-2">
                    {filter.values.map((value) => (
                      <div key={value.id} className="flex justify-between items-center px-2">
                        <label key={index} className="block mb-2">
                          <input
                            type="checkbox"
                            className="form-checkbox text-slate-700 cursor-pointer"
                            // onChange={() => handleSizeChange(value.label)}
                          />
                          <span>{value.label}</span>
                        </label>
                        <span>{value.count}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Colors Filter */}
            {response.data.res.data.collection.products.filters.filter(filter => filter.label.includes('Color')).map((filter, index) => (
              <div key={filter.id} className="">
                <div
                  className="flex justify-between items-center border-b p-2 cursor-pointer"
                  onClick={() => toggleFilter(index + 1000)} // +1000 to ensure unique index
                >
                  <span>{filter.label}</span>
                  <span>
                    {openIndex === (index + 1000) ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </span>
                </div>
                {openIndex === (index + 1000) && (
                  <div className="bg-white px-4 pt-2">
                    {filter.values.map((value) => (
                      <div key={value.id} className="flex justify-between items-center  px-2">
                        <label key={index} className=" mb-2 flex space-x-3">
                          <input
                            type="checkbox"
                            className="form-checkbox text-slate-700 bg-slate-700 cursor-pointer"
                            // onChange={() => handleSizeChange(value.label)}
                          />
                          <span>{value.label}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Sizes Filter */}
            {response.data.res.data.collection.products.filters.filter(filter => filter.label.includes('Size')).map((filter, index) => (
              <div key={filter.id} className="">
                <div
                  className="flex justify-between items-center border-b p-2 cursor-pointer"
                  onClick={() => toggleFilter(index + 2000)} // +2000 to ensure unique index
                >
                  <span>{filter.label}</span>
                  <span>
                    {openIndex === (index + 2000) ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </span>
                </div>
                {openIndex === (index + 2000) && (
                  <div className="bg-white px-4 pt-2">
                    {filter.values.map((value) => (
                      <div key={value.id} className="flex justify-between items-center px-2">
                        <label key={index} className="block mb-2">
                          <input
                            type="checkbox"
                            className="form-checkbox text-slate-700 cursor-pointer"
                            // onChange={() => handleSizeChange(value.label)}
                          />
                          <span>{value.label}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Price Filter */}
            {response.data.res.data.collection.products.filters.filter(filter => filter.label.includes('Price')).map((filter, index) => (
              <div key={filter.id} className="">
                <div
                  className="flex justify-between items-center border-b p-2 cursor-pointer"
                  onClick={() => toggleFilter(index + 3000)} // +3000 to ensure unique index
                >
                  <span>{filter.label}</span>
                  <span>
                    {openIndex === (index + 3000) ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </span>
                </div>
                {openIndex === (index + 3000) && (
                  <div className="bg-white px-4 pt-2">
                    {filter.values.map((value) => (
                      <div key={value.id} className="flex justify-between items-center px-2">
                        <label key={index} className="block mb-2">
                          <input
                            type="checkbox"
                            className="form-checkbox text-slate-700 cursor-pointer"
                            // onChange={() => handleSizeChange(value.label)}
                          />
                          <span>{value.label}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Filters;
