'use client'
import { useEffect, useState } from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { BsArrowUpRight } from "react-icons/bs";
import "./styles.css"

import { FaStar } from 'react-icons/fa';
import Link from "next/link";
import Image from "next/image";
import Skeleton from "./Skeleton";

export const TopSellingProducts1 = ({ collection }) => {
  {
    collection?.products?.edges.map((item, index)=>{
        console.log("Producsts", item)
    })
  }
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [loading, setLoading] = useState(true);
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      initial: 0,
      loop: true,
      mode: 'free-snap',
      slides: { perView: 2, spacing: 15, origin: "center" },
      breakpoints: {
        '(max-width: 480px)': {
          slides: { perView: 1, spacing: 15 },
        },
        '(min-width: 640px)': {
          slides: { perView: 2, spacing: 15 },
        },
        '(min-width: 840px)': {
          slides: { perView: 3, spacing: 15 },
        },
        '(min-width: 1200px)': {
          slides: { perView: 4, spacing: 15 },
        },
        '(min-width: 1450px)': {
          slides: { perView: 5, spacing: 15 },
        },
        '(min-width: 1600px)': {
          slides: { perView: 6, spacing: 15 },
        },
      },
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
    },
    
  );



  const colorHexMap = {
    "red": "#FF0000",
    "blue": "#0000FF",
    "green": "#008000",
    "yellow": "#FFFF00",
    "pink": "#FFC0CB",
    "black": "#000000",
    "grey": "#808080",
    "gray": "#aab7b8",
    "navy blue": "#000080",
    "light blue": "#ADD8E6",
    "teal": "#008080",
    "silver": "#c0c0c0",
    "camel": "#C19A6B",
    "purple": "#800080",
    "ochre": "#CC7722",
    "coffee": "#6F4E37",
    "rust": "#B7410E",
    "burgundy": "#800020",
    "emerald green": "#046307",
    // Add more colors as needed
  };

  return (
    <>
      <div className="flex items-center  md:justify-end justify-center space-x-10 w-full md:w-[50%] lg:w-[35%] xl:w-[33%]">
        <h2 className="md:text-[21px] text-[16px] font-medium">Top Selling Products</h2>
        <button className="py-4"><span className=" md:text-lg text-md text-[#a5a4aa]"> Browse  <BsArrowUpRight className="inline-block text-lg text-[#a5a4aa]" /></span> </button>
      </div>
      <div className="px-10 py-3">
        <div className="navigation-wrapper">
          <div ref={sliderRef} className="keen-slider">

          {
            collection?.products?.edges.map((item, index) => {

                // Collecting all unique colors and sizes from the variants
                const colors = new Set();
                const sizes = new Set();
            
                item?.node?.variants?.edges.forEach(variant => {
                  variant?.node?.selectedOptions?.forEach(option => {
                    if (option.name === "Color") {
                      colors.add(option.value);
                    }
                    if (option.name === "Size") {
                      sizes.add(option.value);
                    }
                  });
                });
            
                const uniqueColors = Array.from(colors);
                const uniqueSizes = Array.from(sizes);

              const prices = item?.node?.variants?.edges.map((item, index) => item?.node?.price?.amount);
              const compareAtPrices = item?.node?.variants?.edges.map((item, index) => item?.node?.compareAtPrice?.amount);
              const selectedOptions  = item?.node?.variants?.edges.map((item, index) => item?.node?.selectedOptions);
              const uniquePrices = [...new Set(prices)].sort((a, b) => a - b);
              const uniqueComparePrices = [...new Set(compareAtPrices)].sort((a, b) => a - b);
              const lowestPrice = uniquePrices[0];
              const lowestComparePrice = uniqueComparePrices[0];
              console.log("Selected Options", selectedOptions)
              
              return ( 
                
  <div key={index} className="keen-slider__slide number-slide1 flex flex-col group relative">
                  
                  {/* Discount Label */}
                  <div className="absolute top-[5%] mt-2 left-1/2 z-10 transform -translate-x-1/2 -translate-y-full bg-[#4A4759] text-white text-[16px] font-bold py-1 px-3 rounded hidden group-hover:block">
                    Discount 25% off
                  </div>

                  {/* Product Image and Link */}
                  <Link href={`/products/${item?.node?.handle}`}>
                    <div className="product_img relative  w-full overflow-hidden">
                      {
                        item?.node?.media?.edges.length > 0 ? (
                          <img
                            src={item?.node?.media?.edges[0]?.node?.previewImage?.url}
                            alt={item?.node?.title}
                            className="object-cover  transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex items-center justify-center bg-gray-200 h-full">
                            <p className="text-sm text-gray-500">Image Not Available</p>
                          </div>
                        )
                      }
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="product_info transition-shadow duration-300 group-hover:shadow-md group-hover:shadow-gray-200">
                    <div className="flex flex-col justify-center items-center py-3">
                      
                      {/* Star Ratings */}
                      <div className="flex justify-center py-1">
                        <FaStar className="text-yellow-500 text-sm" />
                        <FaStar className="text-yellow-500 text-sm" />
                        <FaStar className="text-yellow-500 text-sm" />
                        <FaStar className="text-yellow-500 text-sm" />
                        <FaStar className="text-yellow-500 text-sm" />
                      </div>

                      {/* Product Title */}
                      <p className="text-[#000] text-lg font-semibold">{item?.node?.title}</p>

                      {/* Price and Details */}
                      <p className="text-[#000] text-sm">From $<span className="line-through text-gray-500">{lowestPrice || "N/A"}</span>  <span className="text-red-600 text-md">{lowestComparePrice}</span></p>
                      <p className="text-[#000] text-sm">4 colors, 4 sizes</p>
                    </div>

                    {/* Additional Options (Colors & Sizes) */}
                    <div className="additional-options hidden group-hover:flex flex-col items-center">
                    <div className="color-swatches flex space-x-2 gap-1">
                    {uniqueColors.map((color, colorIndex) => {
                      const cleanColor = color.trim().toLowerCase(); // Remove spaces and make lowercase
                      const hexColor = colorHexMap[cleanColor] || "#D3D3D3"; // Default to light gray if color not found
                      console.log(`Color: ${cleanColor}, Hex: ${hexColor}`);
                      return (
                        <div key={colorIndex} className="w-6 h-6 rounded-md border-2 border-transparent hover:border-2 hover:border-[#000] " style={{ backgroundColor: hexColor }}></div>
                      );
                    })}
                    </div>

                      <div className="size-swatches flex space-x-2 py-4 gap-1">
            {uniqueSizes.map((size, sizeIndex) => {
              let displaySize;
              
              switch (size) {
                case 'Single':
                  displaySize = 'S';
                  break;
                case 'Double':
                  displaySize = 'D';
                  break;
                case 'King':
                  displaySize = 'K';
                  break;
                case 'Super King':
                  displaySize = 'S K';
                  break;
                default:
                  displaySize = size; // Default to the original size if no match
              }
              
              return (
                <div key={sizeIndex} className="w-6 h-6 text-black text-[12px] font-normal rounded-md text-center border flex items-center justify-center hover:border-2 hover:border-[#000] ">
                  {displaySize}
                </div>
              );
            })}
          </div>

                    </div>
                  </div>
                </div>
              );
            })
          }


            {/* <div className="keen-slider__slide number-slide1 flex flex-col group relative">
             
              <div className="absolute top-[5%] mt-2 left-1/2 transform -translate-x-1/2 -translate-y-full bg-[#4A4759] text-white text-[16px] font-bold py-1 px-3 rounded hidden group-hover:block">
                Discount 25% off
              </div>

              <div className="product_img">
                
              </div>

              <div className="product_info transition-shadow duration-300 group-hover:shadow-md group-hover:shadow-gray-200">
                <div className="flex flex-col justify-center items-center py-3">
                  <div className="flex justify-center py-1">
                    <FaStar className="text-yellow-500 text-sm" />
                    <FaStar className="text-yellow-500 text-sm" />
                    <FaStar className="text-yellow-500 text-sm" />
                    <FaStar className="text-yellow-500 text-sm" />
                    <FaStar className="text-yellow-500 text-sm" />
                  </div>
                  <p className="text-[#000] text-lg font-semibold">Mattress Protector Sofa Cover</p>
                  <p className="text-[#000] text-sm">From $108</p>
                  <p className="text-[#000] text-sm">4 colors, 4 sizes</p>
                </div>

               
                <div className="additional-options hidden group-hover:flex flex-col items-center">
                  
                  <div className="color-swatches flex space-x-2 gap-1">
                    <div className="w-6 h-6 bg-red-500 rounded-md"></div>
                    <div className="w-6 h-6 bg-blue-500 rounded-md"></div>
                    <div className="w-6 h-6 bg-green-500 rounded-md"></div>
                    <div className="w-6 h-6 bg-yellow-500 rounded-md"></div>
                  </div>

                
                  <div className="color-swatches flex space-x-2 py-4 gap-1">
                    <div className="w-6 h-6 text-black text-[12px] font-normal rounded-md text-center border flex items-center justify-center">S</div>
                    <div className="w-6 h-6 text-black text-[12px] font-normal rounded-md text-center border flex items-center justify-center">D</div>
                    <div className="w-6 h-6 text-black text-[12px] font-normal rounded-md text-center border flex items-center justify-center">K</div>
                    <div className="w-6 h-6 text-black text-[12px] font-normal rounded-md text-center border flex items-center justify-center">SK</div>
                  </div>
                </div>
              </div>
            </div> */}



          </div>
          {loaded && instanceRef.current && (
            <>
              <Arrow
                left
                onClick={(e) =>
                  e.stopPropagation() || instanceRef.current?.prev()
                }
                disabled={currentSlide === 0}
              />

              <Arrow
                onClick={(e) =>
                  e.stopPropagation() || instanceRef.current?.next()
                }
                disabled={
                  currentSlide ===
                  instanceRef.current.track.details.slides.length - 1
                }
              />
            </>
          )}
        </div>
      </div>
      {loaded && instanceRef.current?.track?.details?.slides && (
  <div className="dots">
    {[
      ...Array(instanceRef.current.track.details.slides.length).keys(),
    ].map((idx) => {
      return (
        <button
          key={idx}
          onClick={() => {
            instanceRef.current?.moveToIdx(idx)
          }}
          className={"" + (currentSlide === idx ? " active" : "")}
        ></button>
      )
    })}
  </div>
)}

    </>
  )

  function Arrow(props) {
    const disabled = props.disabled ? " arrow--disabled" : ""
    return (
      <svg
        onClick={props.onClick}
        className={`arrow ${props.left ? "arrow--left" : "arrow--right"
          } ${disabled}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        {props.left && (
          <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" fill="black" />
        )}
        {!props.left && (
          <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" fill="black" />
        )}
      </svg>
    )
  }

}