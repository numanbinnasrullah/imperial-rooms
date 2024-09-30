'use client'

import { setBaskitCounterValue } from "@/store/reducers/cartReducer";
import { useRetrieveCartMutation, useRomoveItemfromCartMutation,  useUpdateExistingItemInCartMutation } from "@/store/services/cartService";
import { useCartCheckoutMutation } from "@/store/services/checkoutService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// var localStorage = require('localStorage')

const CartPage =  () => {
  const dispatch = useDispatch()
  const router = useRouter();

  
  const cartId = JSON.stringify(localStorage.getItem('cartId'))
  
  // console.log("Localstorage",cartId )
  const [sendVariantId, retrieveResponse] =  useRetrieveCartMutation();
  const [RemoveItem, removeItemresponse] =  useRomoveItemfromCartMutation();
  const [updateItemInCart, existingItemUpdateResponse] = useUpdateExistingItemInCartMutation();
  const [createCheckOut, CheckoutResponse] = useCartCheckoutMutation();
  const [itemQuantities, setItemQuantities] = useState({});
  const [loadingItemId, setLoadingItemId] = useState(null); 
  // console.log("Checkout Response At Cart page", CheckoutResponse);
  // console.log("Update Existing Item in cart Page******", existingItemUpdateResponse);
  let counterSum = 0;
    // const { menu } = cartPageData?.data
    // console.log("CartPage", cartPageData?.data)
    useEffect(() => {
      sendVariantId(cartId)
      // console.log("7uj7uj7uj7")
      // dispatch(setBaskitCounterValue(0))
      if (removeItemresponse.isSuccess) {
                counterSum = removeItemresponse?.data?.res?.data?.cartLinesRemove?.cart?.lines?.edges?.reduce((sum, item) => sum + item.node.quantity, 0);
                // console.log("counterSum12121", counterSum);
                dispatch(setBaskitCounterValue(counterSum))
                setLoadingItemId(null); 
                // console.log(" useEffect counterSum", counterSum)
                // console.log(" store value ", baskitCounter)
            }
    }, [removeItemresponse.isSuccess]);


    useEffect(() => {
      sendVariantId(cartId)
      // console.log("Existing Item Update UseEffect")
      // dispatch(setBaskitCounterValue(0))
      if (existingItemUpdateResponse.isSuccess) {
                counterSum = existingItemUpdateResponse?.data?.res?.data?.cartLinesUpdate?.cart?.lines?.edges?.reduce((sum, item) => sum + item.node.quantity, 0);
                // console.log("existing Item Update Return Quantity", counterSum);
                dispatch(setBaskitCounterValue(counterSum))
                
                // console.log(" useEffect counterSum", counterSum)
                // console.log(" store value ", baskitCounter)
            }
    }, [existingItemUpdateResponse.isSuccess]);


    useEffect(() => {
      if (retrieveResponse.isSuccess) {
        const initialQuantities = {};
        retrieveResponse?.data?.res?.data?.cart?.lines?.edges?.forEach(item => {
          initialQuantities[item.node.id] = item.node.quantity;
        });
        setItemQuantities(initialQuantities);
      }
    }, [retrieveResponse.isSuccess]);

  //   useEffect(() => {

  //     if (removeItemresponse?.isSuccess) {
  //         counterSum = removeItemresponse?.data?.res?.data?.cartLinesRemove?.cart?.lines?.edges?.reduce((sum, item) => sum + item.node.quantity, 0);
  //         dispatch(setBaskitCounterValue(counterSum))
  //     }
  // }, [removeItemresponse.isSuccess]);

//   useEffect(() => {
//     if (retrieveResponse.data?.res?.data?.cart?.lines?.edges) {
//         counterSum = retrieveResponse.data.res.data.cart.lines.edges.reduce((sum, item) => sum + item.node.quantity, 0);
//         dispatch(setBaskitCounterValue(counterSum))
//         console.log(" useEffect counterSum", counterSum)
//         console.log(" store value ", baskitCounter)
//     }
// }, [retrieveResponse])
    // response.data.res.data.cart.lines.edges.map().node.merchandise.product.images.edges.map().node.url
    
    const RemoveCartItems = (itemid)=>{
      const removeItemdata = {
        cartId: cartId,
        itemid: itemid
    }
      // console.log("cart item id####", itemid)
      setLoadingItemId(itemid);
      RemoveItem(removeItemdata)

    }
  //   const updateCartData = {
  //     variantID: selectedVariantForCart,
  //     cartId: cartIdExist,
  //     quantity: productCount
  // }
  
  const handleProductCountDecrease = (itemid) => {
    setItemQuantities(prevQuantities => ({
      ...prevQuantities,
      [itemid]: Math.max(prevQuantities[itemid] - 1, 1)
    }));
    const currentQuantity = itemQuantities[itemid] || 0; 
    const updateCartItemData = {
      variantID: itemid,
      cartId: cartId.replace(/^"|"$/g, '').replace(/\\/g, ''),
      quantity:  currentQuantity - 1
    }
    // console.log("Item Increase from cart ", cartId.replace(/^"|"$/g, '').replace(/\\/g, ''))
   
    updateItemInCart(updateCartItemData);
  };
  
    const handleProductCountIncrease = (itemid) => {
      const currentQuantity = itemQuantities[itemid] || 0; 
      const updateCartItemData = {
        variantID: itemid,
        cartId: cartId.replace(/^"|"$/g, '').replace(/\\/g, ''),
        quantity:  currentQuantity + 1
      }
      // console.log("Item Increase from cart ", cartId.replace(/^"|"$/g, '').replace(/\\/g, ''))
      setItemQuantities(prevQuantities => ({
        ...prevQuantities,
        [itemid]: prevQuantities[itemid] + 1
      }));

      updateItemInCart(updateCartItemData);
    };

    const createCheckout = () => {
      // console.log("Create Checkout id $$$", cartId)
      createCheckOut(cartId)
    }

    useEffect(()=>{
      if (CheckoutResponse.isSuccess) {
        let redirectUrl = CheckoutResponse?.data?.res?.data?.cart?.checkoutUrl;
  
        // Remove double quotes from the URL if present
        if (redirectUrl.startsWith('"') && redirectUrl.endsWith('"')) {
          redirectUrl = redirectUrl.slice(1, -1);
        }
  
        router.push(redirectUrl);
      }
    },[CheckoutResponse.isSuccess])

    
  return (
    <>
      <div>
        <h2 className="text-center font-bold text-3xl">Cart</h2>
        <div className="mt-8 flex justify-between">
          <div className="w-[70%] pl-40">
          <ul className="flex w-[100%] justify-evenly items-center text-lg font-semibold p-4 border-b-[1px] mb-2">
            <li className="w-[40%]">Product</li>
            <li>Quantity</li>
            <li>Price</li>
            <li>Remove</li>
          </ul>
          {
            retrieveResponse?.data?.res?.data?.cart?.lines?.edges?.map((item, i)=>{
              return(
                <div className="flex w-[100%] justify-evenly  items-center   p-4 mb-2" key={i}>
                  <div className="w-[40%] flex space-x-2">
                    {/* {
                      item?.node?.merchandise?.product?.images?.edges?.map((item, i)=>{
                        return   <img src={item?.node?.merchandise?.image?.url} className="w-[20%]" />
                        
                      })
                    } */}
                    <img src={item?.node?.merchandise?.image?.url} className="w-[20%]" />
                    <div className="flex flex-col">

                     <h5 className="text-lg font-semibold">
                      {item?.node?.merchandise?.product?.title}
                     </h5>
                     <h5 className="text-md">
                      {item?.node?.merchandise?.price?.amount}
                     </h5>
                     <h5 className="text-md">
                      {item?.node?.merchandise?.title}
                     </h5>
                    </div>
                    
                  </div>
                  {
                    existingItemUpdateResponse.isLoading ? <span class="relative flex h-3 w-3">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-500 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-3 w-3 bg-slate-700"></span>
                  </span> :  <div class="counter-box-content flex  items-center">
                            <button class="block py-5 px-2 w-full max-w-fit cursor-pointer decrement" onClick={() => handleProductCountDecrease(item?.node?.id)}  >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                                </svg>
                            </button>

                            <p>{itemQuantities[item?.node?.id]}</p>
                            
                           
                            <button class="block py-5 px-2 w-full max-w-fit cursor-pointer " onClick={() => handleProductCountIncrease(item?.node?.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </button>

                            {/* <button onClick={()=>RemoveCartItems(item?.node?.id)}>
                              {loadingItemId === item?.node?.id ? "Loading...!" : "Remove"}
                            </button> */}
                        </div>
                  }
                  
                  {/* <div>
                    <p>{item?.node?.quantity}</p>
                    <button onClick={()=>RemoveCartItems(item?.node?.id)}>
                    {loadingItemId === item?.node?.id ? "Loading...!" : "Remove"}
                      </button>
                  </div> */}
                  <div>{ item?.node?.merchandise?.price?.amount}</div>
                  <div>    <button className="font-bold	" onClick={()=>RemoveCartItems(item?.node?.id)}>
                              {loadingItemId === item?.node?.id ? "Loading...!" : "X"}
                            </button>
                            </div>
              </div>
              )
            })
          }
         
        </div>
        <div className="w-[20%] mt-8">
          <div className="w-[300px] h-[200px] border p-10 mb-4">
            <div className="flex justify-between">
            <span>Subtotal  </span> <span>{retrieveResponse?.data?.res?.data?.cart?.cost?.subtotalAmount?.amount}</span>
            </div>
            <div className="flex font-bold justify-between text-xl">
            <span>Total  </span> <span>{retrieveResponse?.data?.res?.data?.cart?.cost?.totalAmount?.amount}</span>
            </div>

            <button onClick={createCheckout}  className="flex justify-center items-center w-[46%] capitalize bg-[#161619] text-white text-sm text-center h-[40px] mt-8">Checkout</button>

          </div>
        </div>
        </div>
      </div>
    </>
  )
}

export default CartPage;