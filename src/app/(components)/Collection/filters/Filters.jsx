'use client'
import { useGetFiltersMutation } from "@/store/services/collectionPageService";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const Filters = ({  collection, slug, GetFilteredProduct, initialcheck}) => {
  const router = useRouter();
  const [getFilters, response] = useGetFiltersMutation();
  const [openIndex, setOpenIndex] = useState(null);

  let priceFilter = collection?.products?.filters?.find((filter) =>
    filter.label.includes("Price")
    );

  let priceData;
  if(priceFilter?.values[0]?.input){
    priceData = JSON.parse(priceFilter?.values[0]?.input);
  }
  const maxiumun_Value = priceData?.price?.max
  const minimum_value = priceData?.price?.min
  if(initialcheck){
    if (typeof window !== 'undefined') {
      localStorage.setItem('maximumValue', JSON.stringify(maxiumun_Value));
      localStorage.setItem('minimumValue', JSON.stringify(minimum_value));
    }
  }
  let storedMaximumValue;
  let storedMinimumValue;
  if (typeof window !== 'undefined') {
    storedMaximumValue = JSON.parse(localStorage.getItem('maximumValue'));
    storedMinimumValue = JSON.parse(localStorage.getItem('minimumValue'));
  }

  const [selectedSizes, setSelectedSizes] = useState([]);
  console.log("Selected Sizews",selectedSizes)
  const [selectedColors, setSelectedColors] = useState([]);
  const [minPrice, setMinPrice] = useState(storedMinimumValue);
  const [maxPrice, setMaxPrice] = useState(storedMaximumValue);
  const [afterminPrice, setafterminPrice] = useState(storedMinimumValue);
  const [aftermaxPrice, setaftermaxPrice] = useState(storedMaximumValue);
  // console.log("max Priceeeeeeeee", maxPrice)
  const [selectedRange, setSelectedRange] = useState([minPrice, maxPrice]);
  const [checkrange , setCheckRange] = useState(false) // Initialize with 0 to 100 range
  const [timer, setTimer] = useState(null);
 
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
      
      window.location.reload();
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
    if (sizeItem.includes(" X ") || sizeItem.includes(" x ") || sizeItem.includes(" - ") ) {
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

const updateURL = (range) => {
  if (typeof window !== 'undefined') {
    try {
      const params = new URLSearchParams(window.location.search);
      // console.log("updateURL", params.get("lt-price"));

      params.delete("filter.gt-price");
      params.delete("filter.lt-price");
      params.append("filter.gt-price", range[0]);
      params.append("filter.lt-price", range[1]);
      let newUrl;
      if(params){

        newUrl = `?${params.toString()}`;
      }
      // console.log("newUrl", newUrl);

      window.history.pushState(null, '', newUrl);
    } catch (error) {
      console.error("Error in updateURL function:", error);
    }
  } else {
    console.error("updateURL function is running in a non-browser environment");
  }
};

const handleRangeChange = (range) => {
  // console.log("handleRangeChange", range)
  setSelectedRange(range); 

  // Clear previous timer
  clearTimeout(timer);

  // Set a new timer to update URL after 500ms
  const newTimer = setTimeout(() => {
    updateURL(range);
    window.location.reload(); 
  }, 1500);

  // Save the timer for cleanup
  setTimer(newTimer);
  setCheckRange(true)
  
};

const RemoveFilter = (receiveFilter, filterType) => {
  if (receiveFilter.includes('x') || receiveFilter.includes('X')) {
  receiveFilter = receiveFilter.replace(/\s/g, '');
  // console.log("removeFilter", receiveFilter)
}

const params = new URLSearchParams(window.location.search);
// console.log("filterType", params.get("nextPage"))

// Determine the key to delete based on the filter type (size or color)
const filterKey = 'filter.' + filterType; // Use the filterType parameter

// Get the current selected filter values from the URL parameters
const currentFilters = params.getAll(filterKey);
// console.log("currentFilters", filterKey )
// Remove the clicked filter value from the list of current filters
const updatedFilters = currentFilters.filter(filter => filter !== receiveFilter);

  params.delete("nextPage");
  params.delete("previousPage");

// Construct the new URL parameters without the clicked filter value
let newParams = '';
if (updatedFilters.length > 0) {
  newParams = '?' + filterKey + '=' + updatedFilters.join('&' + filterKey + '=');
}

// Construct the final URL parameters by including all other filters
const otherFilterKeys = Array.from(params.keys()).filter(key => key !== filterKey);
const otherFilters = otherFilterKeys.map(key => key + '=' + params.getAll(key).join('&' + key + '=')).join('&');

// Combine the new and other URL parameters
if (newParams !== '') {
  newParams += '&' + otherFilters;
} else {
  newParams = '?' + otherFilters;
}

// Optionally, you can update the browser's history to reflect the new URL
window.history.pushState({}, '', window.location.pathname + newParams);
window.location.reload(); // Reload the page

// params.delete("nextPage");
// params.delete("previousPage");
};



const RemovePriceFilter = (gtPrice, ltPrice) => {
const params = new URLSearchParams(window.location.search);
// console.log("filterType", ltPrice)

// Remove the parameter from the URL parameters
params.delete(gtPrice);
params.delete(ltPrice);

// Construct the new URL parameters
let newParams
if(params){
   newParams = params.toString();

}

// Optionally, you can update the browser's history to reflect the new URL
window.history.pushState({}, '', window.location.pathname + '?' + newParams);
window.location.reload();
}

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
   
  const params = new URLSearchParams(window.location.search);
  // console.log("params",params);
    if(params.size > 0){
      const minPriceParam = Number(params.get("filter.gt-price"))
      const maxPriceParam = Number(params.get("filter.lt-price"))
      // console.log("Use Effect chla 1", Number(minPriceParam))
      // console.log("Use Effect chlaa", maxPriceParam)
      if(minPriceParam || maxPriceParam){
        setafterminPrice(Number(minPriceParam))
        setaftermaxPrice(Number(maxPriceParam))
  
        // console.log("asdasdasdasd", typeof(aftermaxPrice))
  
        // console.log("asdasdasdasdasdasd", afterminPrice)
        // console.log("asdas", aftermaxPrice)
        // setMinPrice(minPriceParam);
        // setMaxPrice(maxPriceParam);
        setSelectedRange([minPriceParam, maxPriceParam]);
      }
    }

    if(params.has("filter.gt-price") || params.has("filter.lt-price")) {
      setCheckRange(true);
    }
  }, [afterminPrice, aftermaxPrice]);

  useEffect(() => {
    getFilters({ slug });
  }, [slug, getFilters]);

  return (
    <>
    {
      response.isLoading ? "Loading...!" : 
      <div className='lg:w-[40%] xl:w-[23%] h-full border hidden lg:block'>
     
      {selectedColors && selectedColors.map((item, index)=>{
              return <> 
              <div class="flex gap-2 ml-5 mt-2" key={index}>
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24" className="cursor-pointer"  onClick={()=>RemoveFilter(item , 'color')}>
                  <path d="M12 3A9 9 0 1 0 12 21A9 9 0 1 0 12 3Z" opacity=".3"></path><path d="M12,22C6.5,22,2,17.5,2,12C2,6.5,6.5,2,12,2c5.5,0,10,4.5,10,10C22,17.5,17.5,22,12,22z M12,4c-4.4,0-8,3.6-8,8s3.6,8,8,8 s8-3.6,8-8S16.4,4,12,4z"></path><path d="M11 6.3H13V17.6H11z" transform="rotate(-45.001 12 12)"></path><path d="M6.3 11H17.6V13H6.3z" transform="rotate(-45.001 12 12)"></path>
                  </svg> <span > {item} </span>
            </div>
              </> 
            })}
      

      {selectedSizes && selectedSizes.map((item, index)=>{
              return <> 
              <div class="flex gap-2 ml-5 mt-2" key={index}>
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24" className="cursor-pointer"  onClick={()=>RemoveFilter(item , 'size')}>
                  <path d="M12 3A9 9 0 1 0 12 21A9 9 0 1 0 12 3Z" opacity=".3"></path><path d="M12,22C6.5,22,2,17.5,2,12C2,6.5,6.5,2,12,2c5.5,0,10,4.5,10,10C22,17.5,17.5,22,12,22z M12,4c-4.4,0-8,3.6-8,8s3.6,8,8,8 s8-3.6,8-8S16.4,4,12,4z"></path><path d="M11 6.3H13V17.6H11z" transform="rotate(-45.001 12 12)"></path><path d="M6.3 11H17.6V13H6.3z" transform="rotate(-45.001 12 12)"></path>
                  </svg> <span > {item} </span>
            </div>
              </> 
            })}
          
          
           { checkrange && <>
            <div class="flex gap-2 ml-5 mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24" className="cursor-pointer"  onClick={()=>RemovePriceFilter('filter.gt-price', 'filter.lt-price')}>
                <path d="M12 3A9 9 0 1 0 12 21A9 9 0 1 0 12 3Z" opacity=".3"></path><path d="M12,22C6.5,22,2,17.5,2,12C2,6.5,6.5,2,12,2c5.5,0,10,4.5,10,10C22,17.5,17.5,22,12,22z M12,4c-4.4,0-8,3.6-8,8s3.6,8,8,8 s8-3.6,8-8S16.4,4,12,4z"></path><path d="M11 6.3H13V17.6H11z" transform="rotate(-45.001 12 12)"></path><path d="M6.3 11H17.6V13H6.3z" transform="rotate(-45.001 12 12)"></path>
                </svg>
                  <span>Price: £{selectedRange[0]}</span>
                  <span>-</span>
                  <span>£{selectedRange[1]}</span>
              </div>
              </> 
            }
          
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
                    {/* {filter.values.map((value) => (
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
                    ))} */}
                    
                    <div className="price-slider ">
                      <Slider 
                        min={storedMinimumValue}
                        max={storedMaximumValue}
                        value={selectedRange}
                        onChange={handleRangeChange}
                        range
                        
                      />
                      <div className="price-values ">
                        <span>Price: £{selectedRange[0]}</span>
                        <span>-</span>
                        <span>£{selectedRange[1]}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
    }
   
    </>
  );
};

export default Filters;
