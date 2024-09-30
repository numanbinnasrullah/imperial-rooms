'use client'
import Link from "next/link";
import { useEffect, useState } from "react";


const CartSidebar = ({isOpen,  product, selectedImageId, selectedPrice, selectedSize }) => {
  const cartId = JSON.stringify(localStorage.getItem('cartId'))
  // console.log("Model wali id", cartId)
  const [selectImage, setSelectImage] = useState(null);
  useEffect(() => {
    const filteredImage = product?.images?.edges.find(item => item?.node?.id === selectedImageId);
    if (filteredImage) {
        setSelectImage(filteredImage?.node?.originalSrc);
        // Automatically scroll to the selected thumbnail image
    }
}, [selectedImageId]);

    if (!isOpen) {
        return null;
      }

      const createCheckout = () => [
        
      ]
  return (
    <>
         <div
        id="sidebar"
        className={`fixed top-0 right-0 h-screen w-96 bg-white shadow-lg transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out z-50`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sidebar content here */}
        <div className="p-4">
          <h2 className="text-xl font-bold">Added to your cart</h2>
          <div className="flex mt-5 justify-start space-x-8">
              <span>{selectImage &&  <img src={selectImage} width={100} /> }</span>
              <div className="flex flex-col space-y-1">
              <div>{product?.title}</div>
              <div>{selectedPrice}</div>
              <div>{selectedSize}</div>
              </div>
            </div>
        </div>
        <div class="btn-wrapper  w-full mt-5 flex space-x-8">
            <Link href="/cart"  className="flex justify-center items-center w-[46%] capitalize bg-[#161619] text-white text-sm text-center h-[40px]">View Cart</Link>

            <button onClick={createCheckout}  className="flex justify-center items-center w-[46%] capitalize bg-[#161619] text-white text-sm text-center h-[40px]">Checkout</button>
            </div>
      </div>
    </>
  )
}

export default CartSidebar