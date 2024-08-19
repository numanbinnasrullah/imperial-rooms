'use client'
import { useState } from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { ImArrowUpRight2 } from "react-icons/im";
import "./styles.css"

import {  FaStar } from 'react-icons/fa';

export const TopSellingProducts = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [sliderRef, instanceRef] = useKeenSlider({
      initial: 0,
      loop: true,
      mode: 'free-snap',
      slides: { perView: 2, spacing: 15,  origin: "center", },
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
        setCurrentSlide(slider.track.details.rel)
      },
      created() {
        setLoaded(true)
      }
    })
  
    return (
      <>
      <div className="flex items-center  md:justify-end justify-center space-x-10 w-full md:w-[50%] lg:w-[35%] xl:w-[30%]">
        <h2 className="md:text-[20px] text-[16px] font-semibold">Top Selling Products</h2>
        <button className="py-4"><span className=" md:text-lg text-md"> Browse <ImArrowUpRight2 className="inline-block " /></span> </button>
      </div>
      <div className="px-10 py-3">
        <div className="navigation-wrapper">
          <div ref={sliderRef} className="keen-slider">
          <div className="keen-slider__slide number-slide1 flex flex-col group relative">
  {/* Tooltip for Discount */}
  <div className="absolute top-[4%] left-1/2 transform -translate-x-1/2 -translate-y-full bg-[#4A4759] text-white text-xs font-bold py-1 px-2 rounded hidden group-hover:block">
    Discount 25% off
  </div>
  
  <div className="product_img">
    {/* Your image content goes here */}
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
      <p className="text-[#000] text-sm">Mattress Protector Sofa Cover</p>
      <p className="text-[#000] text-xs">From $108</p>
      <p className="text-[#000] text-xs">4 colors, 4 sizes</p>
    </div>
    
    {/* Additional Options: Hidden by default, shown on hover */}
    <div className="additional-options hidden group-hover:flex flex-col items-center">
      {/* Product Color Swatches */}
      <div className="color-swatches flex space-x-2 gap-1">
        <div className="w-6 h-6 bg-red-500 rounded-md"></div>
        <div className="w-6 h-6 bg-blue-500 rounded-md"></div>
        <div className="w-6 h-6 bg-green-500 rounded-md"></div>
        <div className="w-6 h-6 bg-yellow-500 rounded-md"></div>
      </div>

      {/* Product Colors Text */}
      <div className="color-swatches flex space-x-2 py-4 gap-1">
        <div className="w-6 h-6 text-black text-[12px] font-normal rounded-md text-center border flex items-center justify-center">S</div>
        <div className="w-6 h-6 text-black text-[12px] font-normal rounded-md text-center border flex items-center justify-center">D</div>
        <div className="w-6 h-6 text-black text-[12px] font-normal rounded-md text-center border flex items-center justify-center">K</div>
        <div className="w-6 h-6 text-black text-[12px] font-normal rounded-md text-center border flex items-center justify-center">SK</div>
      </div>
    </div>
  </div>
</div>


            <div className="keen-slider__slide number-slide1 flex flex-col">
                <div className="product_img">

                </div>
                <div className="product_info">
                    <div className="flex flex-col justify-center items-center py-3">
                        <div className="flex justify-center py-1">
                            <FaStar className="text-yellow-500 text-sm" />
                            <FaStar className="text-yellow-500 text-sm" />
                            <FaStar className="text-yellow-500 text-sm" />
                            <FaStar className="text-yellow-500 text-sm" />
                            <FaStar className="text-yellow-500 text-sm" />
                        </div>
                        <p className="text-[#000] text-sm">Mattress Protector Sofa Cover</p>
                        <p className="text-[#000] text-xs">From $108</p>
                        <p className="text-[#000] text-xs">4 colors, 4 sizes</p>
                    </div>
                    
                </div>
            </div>
            <div className="keen-slider__slide number-slide1 flex flex-col">
                <div className="product_img">

                </div>
                <div className="product_info">
                    <div className="flex flex-col justify-center items-center py-3">
                        <div className="flex justify-center py-1">
                            <FaStar className="text-yellow-500 text-sm" />
                            <FaStar className="text-yellow-500 text-sm" />
                            <FaStar className="text-yellow-500 text-sm" />
                            <FaStar className="text-yellow-500 text-sm" />
                            <FaStar className="text-yellow-500 text-sm" />
                        </div>
                        <p className="text-[#000] text-sm">Mattress Protector Sofa Cover</p>
                        <p className="text-[#000] text-xs">From $108</p>
                        <p className="text-[#000] text-xs">4 colors, 4 sizes</p>
                    </div>
                    
                </div>
            </div>
            <div className="keen-slider__slide number-slide1 flex flex-col">
                <div className="product_img">

                </div>
                <div className="product_info">
                    <div className="flex flex-col justify-center items-center py-3">
                        <div className="flex justify-center py-1">
                            <FaStar className="text-yellow-500 text-sm" />
                            <FaStar className="text-yellow-500 text-sm" />
                            <FaStar className="text-yellow-500 text-sm" />
                            <FaStar className="text-yellow-500 text-sm" />
                            <FaStar className="text-yellow-500 text-sm" />
                        </div>
                        <p className="text-[#000] text-sm">Mattress Protector Sofa Cover</p>
                        <p className="text-[#000] text-xs">From $108</p>
                        <p className="text-[#000] text-xs">4 colors, 4 sizes</p>
                    </div>
                    
                </div>
            </div>
            <div className="keen-slider__slide number-slide1 flex flex-col">
                <div className="product_img">

                </div>
                <div className="product_info">
                    <div className="flex flex-col justify-center items-center py-3">
                        <div className="flex justify-center py-1">
                            <FaStar className="text-yellow-500 text-sm" />
                            <FaStar className="text-yellow-500 text-sm" />
                            <FaStar className="text-yellow-500 text-sm" />
                            <FaStar className="text-yellow-500 text-sm" />
                            <FaStar className="text-yellow-500 text-sm" />
                        </div>
                        <p className="text-[#000] text-sm">Mattress Protector Sofa Cover</p>
                        <p className="text-[#000] text-xs">From $108</p>
                        <p className="text-[#000] text-xs">4 colors, 4 sizes</p>
                    </div>
                    
                </div>
            </div>
            <div className="keen-slider__slide number-slide1 flex flex-col">
                <div className="product_img">

                </div>
                <div className="product_info">
                    <div className="flex flex-col justify-center items-center py-3">
                        <div className="flex justify-center py-1">
                            <FaStar className="text-yellow-500 text-sm" />
                            <FaStar className="text-yellow-500 text-sm" />
                            <FaStar className="text-yellow-500 text-sm" />
                            <FaStar className="text-yellow-500 text-sm" />
                            <FaStar className="text-yellow-500 text-sm" />
                        </div>
                        <p className="text-[#000] text-sm">Mattress Protector Sofa Cover</p>
                        <p className="text-[#000] text-xs">From $108</p>
                        <p className="text-[#000] text-xs">4 colors, 4 sizes</p>
                    </div>
                    
                </div>
            </div>
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
        {loaded && instanceRef.current && (
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
            className={`arrow ${
              props.left ? "arrow--left" : "arrow--right"
            } ${disabled}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            {props.left && (
              <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" fill="black" />
            )}
            {!props.left && (
              <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" fill="black"  />
            )}
          </svg>
        )
      }
      
    }