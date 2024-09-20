'use client'
import { FaStar } from 'react-icons/fa';
import React, { useState } from 'react';
import colornames from 'colornames';
import Color from 'color'; 


const CollectionGrid = ({collection}) => {
  const colorFiltersLength = collection?.products?.filters?.filter(filter => filter.label.includes('Color')).map((filter)=> filter?.values?.length)
  const colorFiltersSwatches = collection?.products?.filters?.filter(filter => filter.label.includes('Color'))
  const sizeFiltersLength = collection?.products?.filters?.filter(filter => filter.label.includes('Size')).map((filter)=> filter?.values?.length)
  const sizePattern = /^\d+" x \d+"$/i;
  const sizeFilters = collection?.products?.filters?.filter(filter => filter.label.includes('Size')).map(filter => ({
    ...filter,
    values: filter.values.filter(value => {
      if (value.label.includes('x') || value.label.includes('X')) {
        // Apply the size pattern if "x" or "X" exists
        return sizePattern.test(value.label);
      } else {
        // Return true to include the value as is
        return true;
      }
      
    })
  }));
  console.log("sizeFilters", colorFiltersLength)

  const NextPage = () => {
    const params = new URLSearchParams(window.location.search);
    if(collection?.products?.pageInfo?.hasNextPage){
        
        params.delete("nextPage");
        params.delete("previousPage");
        params.append("nextPage", `nextPage+${collection?.products?.pageInfo?.endCursor}` );
        const newUrl = `?${params.toString().replace(/\+/g, "")}`;
        history.pushState(null, '', newUrl);
        window.location.reload(); 
    }
    
}
  
const PreviousPage = () => {
  const params = new URLSearchParams(window.location.search);
  if(collection?.products?.pageInfo?.hasPreviousPage){
      
      params.delete("nextPage");
      params.delete("previousPage");
     
      params.append("previousPage", `previousPage+${collection?.products?.pageInfo?.startCursor}` );
      const newUrl = `?${params.toString().replace(/\+/g, "")}`;
      history.pushState(null, '', newUrl);
      
      window.location.reload();

  }
  
}

// Function to remove previousPage parameter if on the first page
const removePreviousPageIfFirstPage = () => {
  const params = new URLSearchParams(window.location.search);
  const isOnFirstPage = !collection?.products?.pageInfo?.hasPreviousPage;

  if (isOnFirstPage) {
    // Remove the previousPage parameter
    params.delete('previousPage');

    // Update the URL without reloading the page
    const newUrl = `?${params.toString().replace(/\+/g, "")}`;
    history.replaceState(null, '', newUrl);
  }
};

// Call the function on page load
window.addEventListener('load', () => {
  removePreviousPageIfFirstPage();
});


  const customColorMapping = {
    beige: '#fff0db',
    cream: '#FFFDD0',
    grey: '#808080',
    burgundy: '#800020',
    charcoal: '#36454F',
    navy: '#000068',
    ochre: '#ecce00',
    peach: '	#f6c492',
    pink: '	#FF8096',
    purple: '	#800080',
    rust: '	#b7410e',
    red: '	#FF0000',
    silver: '	#C0C0C0',
    white: '	#ffffff',
    'light-grey': '#D3D3D3',
    'emerald-green': '#046307',
    'light-blue': '#90D6FF',
    
  };

  return (
    <>
    <div className='w-[90%] md:w-[90%] lg:w-[75%]   mx-auto'>
  <div className="w-[100%] sm:w-[100%] md:w-[100%] lg:w-[100%] xl:w-[100%] flex lg:justify-start flex-wrap gap-[4%] md:gap-[6%] lg:gap-[3%]">

      {collection?.products?.edges?.map((item, index) => {
        const prices = item?.node?.variants?.edges.map((item, index) => item?.node?.price?.amount);
        const compareAtPrices = item?.node?.variants?.edges.map((item, index) => item?.node?.compareAtPrice?.amount);
        const uniquePrices = [...new Set(prices)].sort((a, b) => a - b);
        const uniqueComparePrices = [...new Set(compareAtPrices)].sort((a, b) => a - b);
        const lowestPrice = uniquePrices[0];
        const lowestComparePrice = uniqueComparePrices[0];
        return  <React.Fragment key={index}>
          {index === 6 && (
            <div className="w-full sm:w-[100%] md:w-[100%] lg:w-[65%] mb-7 flex flex-col font-bold text-4xl text-center">
              <img
                 src={"/custom-div.jpg"}
                alt="custom div"
                className="object-cover"
              />
            </div>
          )}

          

          <div
            className="w-[48%] sm:w-[48%] md:w-[47%] lg:w-[48%] xl:w-[31%] mb-7 flex flex-col group relative"
          >
            {/* Tooltip for Discount */}
            <div className="absolute top-0 left-[20%] right-0 bg-[#4A4759] text-white text-[20px] pb-1 px-3 rounded-b-lg hidden group-hover:block z-30 w-[60%] text-center">
              Discount 
            </div>

            <div className="product_img">
              <img src={item?.node?.featuredImage?.url}
                // alt={product.title}
                className="object-cover"
              />
            </div>

            <div className="product_info transition-shadow duration-300 group-hover:shadow-md group-hover:shadow-gray-200">
              <div className="flex flex-col justify-center items-center py-3 px-2">
                <div className="flex justify-center py-1 gap-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500 text-sm md:text-lg" />
                  ))}
                </div>
                <p className="text-[#000] text-[17px] md:text-xl font-semibold text-center">{item?.node?.title}</p>
                <p className="text-[#000] text-md md:text-lg">From <span className='line-through text-gray-400'>{lowestComparePrice}</span> - <span className='text-red-500'>{lowestPrice}</span></p>
                <p className="text-[#000] text-md md:text-lg">{colorFiltersLength} colors, {sizeFiltersLength} sizes</p>
              </div>

              {/* Additional Options: Hidden by default, shown on hover */}
              <div className="additional-options hidden group-hover:flex flex-col items-center">
                {/* Product Color Swatches */}
                <div className="color-swatches flex space-x-2 gap-1">
                  {colorFiltersSwatches?.map((filter) => 
                  filter?.values?.slice(0, 5).map((value, index) => {
                    const colorName = value.label.toLowerCase().replace(/\s+/g, '-');
                    const colorHex = customColorMapping[colorName] || colornames(colorName) || 'transparent';
                    
                    let borderColor = 'transparent'; // Default to transparent if color parsing fails

                    try {
                      // Calculate a darker shade for the border
                      borderColor = Color(colorHex).darken(0.3).hex(); // Adjust the darken value as needed
                    } catch (error) {
                      console.error(`Error parsing color ${colorHex}:`, error);
                    }

                   return <div key={index} className={`w-8 h-8 rounded-md  boxShadow: 0 0 0 4px ${borderColor} hover:scale-105 transition-transform duration-300 ease-in-out transform`} style={{ backgroundColor: colorHex,  borderColor: borderColor, borderWidth: '1px' }}> </div>
                  })
                  )}
                
                </div>

                {/* Product Sizes */}
                <div className="color-swatches flex space-x-2 py-4 gap-1">
                  {sizeFilters.map((filter) => 
                  filter?.values?.slice(0, 4).map((value, index) => {
                   return <div key={index} className="px-1 py-1 text-black text-[12px] font-normal rounded-md text-center border flex items-center justify-center">
                      {value?.label}
                    </div>
                    })
                  )}
                </div>
                
              </div>
              
            </div>
          </div>
        </React.Fragment>
      })}
      


      
    </div>

    <div className='w-[90%] sm:w-[93%] md:w-[90%] lg:w-[85%] xl:w-[77%] mx-auto justify-center m-10'>
      <nav aria-label="Page navigation example text-center">
  <ul class="flex items-center justify-center space-x-px h-10 text-base">
    {
      collection?.products?.pageInfo?.hasPreviousPage ? <li>
      <button href="#" class={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white mr-2
         ${!collection?.products?.pageInfo?.hasPreviousPage ? 'disabled' : ''} `} 
         style={{ cursor: !collection?.products?.pageInfo?.hasPreviousPage ? 'not-allowed' : 'pointer' }} 
          onClick={ collection?.products?.pageInfo?.hasPreviousPage  ? PreviousPage : ''}
        >
          <span class="sr-only">Previous</span>
          <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
          </svg>
        </button>
      </li> : ""
    }
    
    
    {
      collection?.products?.pageInfo?.hasNextPage ?  <li>
      <button href="#" class={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ml-2
       ${!collection?.products?.pageInfo?.hasNextPage ? 'disabled' : ''} `} 
       style={{ cursor: !collection?.products?.pageInfo?.hasNextPage ? 'not-allowed' : 'pointer' }} 
        onClick={ collection?.products?.pageInfo?.hasNextPage  ? NextPage : ''}
      >
        <span class="sr-only">Next</span>
        <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10" >
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
        </svg>
      </button>
    </li> : " "
    }
    
  </ul>
</nav>
      </div>

      </div>

    </>
   
  );
};

export default CollectionGrid;
