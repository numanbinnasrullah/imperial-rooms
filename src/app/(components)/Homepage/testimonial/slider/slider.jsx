"use client"
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';


const Slider = ({ content }) => {
  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: 'free-snap',
    slides: { perView: 2, spacing: 15 },
    breakpoints: {
      '(min-width: 640px)': {
        slides: { perView: 3, spacing: 15 },
      },
      '(min-width: 1024px)': {
        slides: { perView: 3, spacing: 15 },
      },
    },
  });
  return (
    <div ref={sliderRef} className="bg-[#F2F2F2] keen-slider mb-8  ">
    {content.map((item, index) => (
      <div key={index} className="keen-slider__slide text-center sm:hidden py-6">
         <div key={index} className="sm:p-6 text-center">
          {item.icon}
          <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
          <p className="mt-1 text-sm">{item.description}</p>
        </div>
      </div>
    ))}
  </div>

  )
}

export default Slider