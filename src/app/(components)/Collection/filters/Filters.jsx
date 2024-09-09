'use client'
import { useGetFiltersMutation } from "@/store/services/collectionPageService";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

const Filters = ({ slug, GetFilteredProduct}) => {
  const router = useRouter();
  const [getFilters, response] = useGetFiltersMutation();
  const [openIndex, setOpenIndex] = useState(null);

  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  // console.log("selectedColors;" , selectedColors)

  const toggleFilter = (index) => {
    if (openIndex === index) {
      setOpenIndex(null); // Close the currently open filter
    } else {
      setOpenIndex(index); // Open the clicked filter and close others
    }
  };

  const handleColorChange = (color) => {
    setSelectedColors((prevSelectedColors) => {
      const newSelectedColors = prevSelectedColors.includes(color)
        ? prevSelectedColors.filter((selectedColor) => selectedColor !== color)
        : [...prevSelectedColors, color];
        updateUrl({ size: selectedSizes, color: newSelectedColors });
        window.location.reload(); 
      return newSelectedColors;
    });
  };

  const handleSizeChange = (size) => {
    setSelectedSizes((prevSelectedSizes) => {
      const newSelectedSizes = prevSelectedSizes.includes(size)
        ? prevSelectedSizes.filter((selectedSize) => selectedSize !== size)
        : [...prevSelectedSizes, size];
      updateUrl({ size: newSelectedSizes, color: selectedColors });
      
      // window.location.reload();
      return newSelectedSizes;
    });
  };


const updateUrl = ({ size, color }) => {
  // console.log("Selected Sizes : ", size)
  const params = new URLSearchParams(window.location.search);

  // Clear existing size and color parameters
  params.delete("filter.size");
  params.delete("filter.color");
  params.delete("nextPage");
  params.delete("previousPage");
  // Add new size parameters
  size.forEach((sizeItem) => {
    // console.log("Sizes select ", sizeItem);
    // Check if size contains "x" or is a single word
    if (sizeItem.includes(" X ") || sizeItem.includes(" x ") || sizeItem.includes(" - ") || !/\s/.test(sizeItem)) {
      // If size contains "x" or is a single word, add it directly to params
      params.append("filter.size", sizeItem);
    } else {
      // If size is in the format of "Super King" or similar, add it with space
      const encodedSize = encodeURIComponent(size);
      params.append("filter.size", encodedSize);
    }
  });
  

  // Add new color parameters
  color.forEach((colorItem) => {

    params.append("filter.color", colorItem);
  });

  try {
    if (params && params instanceof URLSearchParams) {
      const decodedParams = decodeURIComponent(params.toString());
      const newUrl = `?${decodedParams.replace(/\+/g, "")}`;
      router.push(newUrl); // Update URL using Next.js router
    }
    ()=>(GetFilteredProduct())
  } catch (error) {
    console.error("Error generating new URL:", error);
  }
  let newUrl;
  if(params){
     newUrl = `?${params.toString().replace(/\+/g, "")}`;

  }
  // console.log("new URL", newUrl)
  history.pushState(null, '', newUrl);
};

useEffect(() => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  // Get selected sizes and colors from URL parameters
  const sizesFromUrl = urlParams.getAll('filter.size').map(size => {
    // console.log("size get ker lea hy url sy", size)
    
    if ( size.includes('x')) {
      return  size.replace('x', ' x ')
    } else if(size.includes('X')){
        return size.replace('X', ' X ')
      } else if(size.includes('-') && size.includes('+')){
        return size.replace(/-/g, ' - ').replace(/\+/g, ' + '); 
      }else if(size.includes('-') ){
        return size.replace('-', ' - ').replace(/(\d)(cm|m|in|ft)?-([a-zA-Z]+)/g, '$1$2 - $3').replace(/([a-zA-Z])([A-Z])/g, '$1 $2');
      } else {
          return  decodeURIComponent(size.replace('%20', ' '))
        }
      });
      
  const colorsFromUrl = urlParams.getAll('filter.color').map(color=>{
      console.log("color select", color)
      return color.replace(/([a-z])([A-Z])/g, '$1 $2');
  });
  // Update selectedSizes and selectedColors states with values from URL
  setSelectedSizes(sizesFromUrl);
  setSelectedColors(colorsFromUrl);
}, []);

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
                        <label key={index} className="block mb-2 space-x-3">
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
                            checked={selectedColors.includes(value.label)}
                            onChange={() => handleColorChange(value.label)}
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
                        <label key={index} className="block mb-2 space-x-3">
                          <input
                            type="checkbox"
                            className="form-checkbox text-slate-700 cursor-pointer"
                            checked={selectedSizes.includes(value.label)}
                            onChange={() => handleSizeChange(value.label)}
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
                        <label key={index} className="block mb-2 space-x-3">
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
