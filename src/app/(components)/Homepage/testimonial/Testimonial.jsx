import testimonialData from './testimonialContent';
import Slider from "./slider/slider";

const Testimonial = () => {
  return (
    <>
      <div className="bg-[#F2F2F2] w-full px-4 sm:px-6 lg:px-8 py-10 my-8 hidden sm:block">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
            {testimonialData.map((item, index) => (
              <div key={index} className="p-6 text-center">
                {/* <item.icon className="text-5xl mx-auto mb-2" /> */}
                {item.icon}
                <h3 className="text-md font-bold text-gray-900">{item.title}</h3>
                <p className="mt-1 text-md">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Slider content={testimonialData} />
    </>
  );
};

export default Testimonial;
