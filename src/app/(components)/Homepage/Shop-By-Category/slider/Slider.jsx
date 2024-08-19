"use client"
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';

const testimonials = [
  {
    icon: '💳', // Replace with actual icons
    title: 'Payments',
    description: 'Secure and easy payments.',
  },
  {
    icon: '🚚',
    title: 'Shipping',
    description: 'Fast and reliable shipping.',
  },
  {
    icon: '📞',
    title: 'Online Support',
    description: '24/7 customer support.',
  },
  {
    icon: '🔄',
    title: 'Pay Back Guarantee',
    description: 'Money-back guarantee on all purchases.',
  },
];

const GridSlider = () => {
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
    <div ref={sliderRef} className="keen-slider mb-8 hidden ">
    {testimonials.map((testimonial, index) => (
      <div key={index} className="keen-slider__slide bg-white  text-center block lg:hidden">
        <div className=" mb-4">
          <img src="/one.jpg" />
          <div className="text-right w-full">
              <button className="bg-[#4A4759] text-white py-2 w-[80%] rounded-b">Click Me</button>
          </div>
          </div>
        {/* <h3 className="font-semibold text-lg mb-2">{testimonial.title}</h3>
        <p className="text-gray-600">{testimonial.description}</p> */}
      </div>
    ))}

  </div>

  )
}

export default GridSlider