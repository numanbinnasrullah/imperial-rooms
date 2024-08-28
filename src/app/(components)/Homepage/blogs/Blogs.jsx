'use client'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { BsArrowUpRight } from "react-icons/bs";
import { PiArrowUpRightThin } from "react-icons/pi";
import Link from 'next/link';
// import './styles.css'
const Blogs = ({ articles }) => {
    console.log("articles", articles)
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3, // Show 2.5 blogs at a time
        slidesToScroll: 1,

        centerPadding: '0px', // No padding around the centered slide
        draggable: true,
        responsive: [
            {
                breakpoint: 768, // For smaller screens
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 1300, // For medium screens
                settings: {
                    slidesToShow: 2, // Show 2 blogs at medium screen sizes
                }
            }
        ]
    };

    return (
        <section className="bg-white dark:bg-gray-900 overflow-x-hidden">
            <div className="w-[100%] lg:ml-72 mx-auto">
                <div className="flex items-center md:justify-start justify-center space-x-10 w-full md:w-[50%] lg:w-[35%] xl:w-[30%] ml-4">
                    <h2 className="md:text-[21px] text-[17px] font-medium">Our Stories</h2>
                    <button className="py-4">
                        <span className="md:text-lg text-md text-[#B6B5BC]">Browse <BsArrowUpRight className="inline-block text-lg text-[#B6B5BC]" /></span>
                    </button>
                </div>

                <div className="mt-2">
                    <div className="pb-14"> {/* Added padding on the left to reveal the first blog fully */}
                        <Slider {...settings}>
                            {articles?.edges?.map((item, index) => {
                                // Parse and format the publishedAt date
                                const dateStr = item?.node?.publishedAt;
                                const dateObj = new Date(dateStr);
                                const formattedDate = `${dateObj.getDate().toString().padStart(2, '0')}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj.getFullYear()}`;

                                return (
                                    <div key={index} className="px-4 outline-none focus:outline-none">
                                        <img
                                            className="relative z-10 object-cover w-full rounded-md h-96 outline-none focus:outline-none"
                                            src={item?.node?.image?.url}
                                            alt={item?.node?.title}
                                        />
                                        <div className="relative z-20 max-w-lg py-4 px-3 mx-auto -mt-20 bg-white rounded-sm shadow dark:bg-gray-900 outline-none focus:outline-none border-b-2">
                                            <Link href={`blogs/${item?.node?.handle}`} className="font-semibold text-lg text-gray-800 hover:underline dark:text-white md:text-md outline-none focus:outline-none">
                                                {item?.node?.title}
                                            </Link>
                                            <p className="mt-1 dark:text-gray-300 md:text-md outline-none focus:outline-none">
                                                {`${item?.node?.content.split(' ').slice(0, 22).join(' ')} . . .`}
                                            </p>
                                            <div className="flex w-full">
                                                <div className="w-[30%]">
                                                    <p className="mt-1 text-sm text-[#adacac] outline-none focus:outline-none border-r-2">{formattedDate}</p>
                                                </div>
                                                <div className="flex justify-between w-[70%] px-4">
                                                    <button className="mt-1 text-sm text-[#adacac] outline-none focus:outline-none">Read More</button>
                                                    <button className="mt-1 text-sm text-[#adacac]"><PiArrowUpRightThin className="text-2xl" /></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                        </Slider>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Blogs
