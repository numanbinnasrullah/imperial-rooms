'use client'
import { useEffect, useState, useRef } from "react";

const ProductGallery = ({ product, selectedImageId }) => {
    // console.log("product selectedImageId", selectedImageId)
    const [selectImage, setSelectImage] = useState(null);
    const sliderRef = useRef(null);

    const changeImage = (image) => {
        setSelectImage(image);
    };

    useEffect(() => {
        const filteredImage = product?.images?.edges.find(item => item.node.id === selectedImageId);
        console.log("filteredImage", filteredImage)
        if (filteredImage) {
            setSelectImage(filteredImage.node.originalSrc);
            // Automatically scroll to the selected thumbnail image
            const imageIndex = product.images.edges.findIndex(item => item.node.id === selectedImageId);
            console.log("imageIndex", imageIndex)
            if (sliderRef.current) {
                const thumbnailWidth = sliderRef.current.firstChild.firstChild.offsetWidth;
                sliderRef.current.scrollTo({
                    left: imageIndex * thumbnailWidth,
                    behavior: 'smooth'
                });
            }
        }
    }, [selectedImageId, product?.images?.edges]);

    const slideLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -100, behavior: 'smooth' }); // Adjust the scroll value as needed
        }
    };

    const slideRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: 100, behavior: 'smooth' }); // Adjust the scroll value as needed
        }
    };

    return (
        <>
            <div className="left block w-full md:max-w-[50%] md:px-2">
                <div className="image-slider block w-full max-w-3xl mx-auto">
                    <div className="main-slider block mb-3">
                        <div className="main-slider-content">
                            <div className="image-box block">
                                {selectImage && <img src={selectImage} alt="" className="block w-full object-contain" />}
                            </div>
                        </div>
                        <div className="thumb-slider">
                            <div className="slider-left lg:block w-full mt-5">
                                <div className="slider-left-content block w-full">
                                    <div className="flex items-center relative">
                                        <button onClick={slideLeft} className="p-2 bg-gray-300 rounded-l absolute">
                                            ◀
                                        </button>
                                        <div ref={sliderRef} className="slide block w-full max-h-[580px] overflow-x-scroll hide-scrollbar">
                                            <div className="imgbox flex gap-2">
                                                {product?.images?.edges.map((thumbUrl, index) => (
                                                    <img
                                                        key={index}
                                                        src={thumbUrl.node.originalSrc}
                                                        alt={`Thumbnail ${index}`}
                                                        className={`block h-28 object-contain mb-2 cursor-pointer ${thumbUrl.node.id === selectedImageId ? 'selected' : ''}`}
                                                        style={{ border: thumbUrl.node.id === selectedImageId ? '2px solid black' : 'none' }}
                                                        onClick={() => changeImage(thumbUrl.node.originalSrc)}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <button onClick={slideRight} className="p-2 bg-gray-300 rounded-r absolute right-0  ">
                                            ▶
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductGallery;
