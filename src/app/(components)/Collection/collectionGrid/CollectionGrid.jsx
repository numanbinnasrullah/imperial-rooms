'use client'
import { FaStar } from 'react-icons/fa';
import React, { useState } from 'react';
const products = [
  // Add your product data here
  {
    id: 1,
    title: "Mattress Protector Sofa Cover",
    price: "From $108",
    colors: ["red", "blue", "green", "yellow"],
    sizes: ["S", "D", "K", "SK"],
    discount: "25%",
    imgSrc: "/collection_grid.jpg",
  },
  {
    id: 1,
    title: "Mattress Protector Sofa Cover",
    price: "From $108",
    colors: ["red", "blue", "green", "yellow"],
    sizes: ["S", "D", "K", "SK"],
    discount: "25%",
    imgSrc: "/collection_grid.jpg",
  },
  {
    id: 1,
    title: "Mattress Protector Sofa Cover",
    price: "From $108",
    colors: ["red", "blue", "green", "yellow"],
    sizes: ["S", "D", "K", "SK"],
    discount: "25%",
    imgSrc: "/collection_grid.jpg",
  },
  {
    id: 1,
    title: "Mattress Protector Sofa Cover",
    price: "From $108",
    colors: ["red", "blue", "green", "yellow"],
    sizes: ["S", "D", "K", "SK"],
    discount: "25%",
    imgSrc: "/collection_grid.jpg",
  },
  {
    id: 1,
    title: "Mattress Protector Sofa Cover",
    price: "From $108",
    colors: ["red", "blue", "green", "yellow"],
    sizes: ["S", "D", "K", "SK"],
    discount: "25%",
    imgSrc: "/collection_grid.jpg",
  },
  {
    id: 1,
    title: "Mattress Protector Sofa Cover",
    price: "From $108",
    colors: ["red", "blue", "green", "yellow"],
    sizes: ["S", "D", "K", "SK"],
    discount: "25%",
    imgSrc: "/collection_grid.jpg",
  },
  {
    id: 1,
    title: "Mattress Protector Sofa Cover",
    price: "From $108",
    colors: ["red", "blue", "green", "yellow"],
    sizes: ["S", "D", "K", "SK"],
    discount: "25%",
    imgSrc: "/collection_grid.jpg",
  },
  // (Add the rest of the product data here)
];

const CollectionGrid = ({showFilter}) => {

  return (
    <>
     

    

  <div className="w-[90%] sm:w-[93%] md:w-[90%] lg:w-[85%] xl:w-[77%] mx-auto flex lg:justify-between flex-wrap gap-[4%] md:gap-[6%] lg:gap-[3%]">

      {products.map((product, index) => (
        <React.Fragment key={product.id}>
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
            <div className="absolute top-0 left-28 right-0 bg-[#4A4759] text-white text-[20px] font-bold py-1.5 px-3 rounded-b-lg hidden group-hover:block z-30 w-[50%] text-center">
              Discount {product.discount}
            </div>

            <div className="product_img">
              <img
                src={product.imgSrc}
                alt={product.title}
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
                <p className="text-[#000] text-[17px] md:text-xl font-semibold text-center">{product.title}</p>
                <p className="text-[#000] text-md md:text-lg">{product.price}</p>
                <p className="text-[#000] text-md md:text-lg">{product.colors.length} colors, {product.sizes.length} sizes</p>
              </div>

              {/* Additional Options: Hidden by default, shown on hover */}
              <div className="additional-options hidden group-hover:flex flex-col items-center">
                {/* Product Color Swatches */}
                <div className="color-swatches flex space-x-2 gap-1">
                  {product.colors.map((color, i) => (
                    <div key={i} className={`w-8 h-8 bg-${color}-500 rounded-md`}></div>
                  ))}
                </div>

                {/* Product Sizes */}
                <div className="color-swatches flex space-x-2 py-4 gap-1">
                  {product.sizes.map((size, i) => (
                    <div key={i} className="w-8 h-8 text-black text-[12px] font-normal rounded-md text-center border flex items-center justify-center">
                      {size}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>


    </>
   
  );
};

export default CollectionGrid;
