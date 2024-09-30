'use client'

import { useEffect, useState } from "react";
import ProductGallery from "../productGallery/ProductGallery";
import colornames from 'colornames';
import YouMayAlsoLike from "../youMayAlsoLike/YouMayAlsoLike";
import { useCartCreateMutation, useUpdateExistingCartMutation } from "@/store/services/cartService";
import CartSidebar from "../../Cart/cartSidebar/CartSidebar";

const checkVariants = (title, variants) => {
    // console.log("Selected Variants====", title)
    let sizes = [];
    let colors = [];
    let choices = [];

    // List of known color names (extend this list as needed)
    const knownColors = [
        'beige', 'cream', 'grey', 'green', 'burgundy', 'charcoal', 'navy', 'ochre', 'peach',
        'pink', 'purple', 'rust', 'red', 'silver', 'white', 'light grey', 'blue',
        'emerald green', 'light blue', 'black', 'ivory', 'champion', 'brown'
    ];

    // Function to check if a value is a color
    const isColor = (value) => {
        return knownColors.includes(value.toLowerCase());
    }

    // Check if title can be split by "/"
    const canSplit = title.includes("/");
    if (canSplit) {
        variants.forEach(variant => {
            const [first, second, ...rest] = variant.node.title.split("/").map(part => part.trim());

            if (isColor(first)) {
                colors.push(first);
                sizes.push(second);
            } else if (isColor(second)) {
                colors.push(second);
                sizes.push(first);
            }

            if (rest.length > 0) {
                choices.push(rest.join(" / ").trim());
            }
        });

        colors = Array.from(new Set(colors));
        sizes = Array.from(new Set(sizes));
        choices = Array.from(new Set(choices));
    } else {
        sizes = Array.from(new Set(variants.map((variant) => variant.node.title)));
    }
    // console.log("Sizes *****", sizes);
    return { sizes, colors, choices };
};

const customColorMapping = {
    beige: '#fff0db',
    cream: '#FFFDD0',
    grey: '#808080',
    green: '#008000',
    burgundy: '#800020',
    charcoal: '#36454F',
    navy: '#000068',
    ochre: '#ecce00',
    blue: '#0000FF',
    peach: '	#f6c492',
    pink: '	#FF8096',
    purple: '	#800080',
    rust: '	#b7410e',
    red: '	#FF0000',
    silver: '	#C0C0C0',
    white: '	#ffffff',
    black: '#000',
    ivory: '#FFFFF0',
    champion: '#ba8442',
    brown: '##964B00',
    'light-grey': '#D3D3D3',
    'emerald-green': '#046307',
    'light-blue': '#90D6FF',
    
  };

const ProductInfo = ({product}) => {
    const [selected, setSelected] = useState('King');
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState(1);

    const incrementQuantity = () => setQuantity(prev => prev + 1);
    const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : prev));

    const variants = product?.variants?.edges || [];
    let Colors = [];
    let Sizes = [];
    let Choices = [];
    variants.forEach(variant => {
        const { title } = variant.node;
        const { sizes, colors, choices } = checkVariants(title, variants);
        Sizes = [...new Set([...Sizes, ...sizes])];
        Colors = [...new Set([...Colors, ...colors])];
        Choices = [...new Set([...Choices, ...choices])];
    });
    const [selectedColor, setSelectedColor] = useState(Colors[0]);
    const [selectedSize, setSelectedSize] = useState(Sizes[0]);
    const [selectedChoice, setSelectedChoice] = useState(Choices[0]);
    const [selectedPrice, setSelectedPrice] = useState('');
    const [compareAtPrice, setCompareAtPrice] = useState('');
    const discount = compareAtPrice - selectedPrice;
    const discountPercentage = Math.round((discount / compareAtPrice) * 100);
    const [selectedImageId, setSelectedImageId] = useState("")
    const [quantityAvailable, setQuantityAvailable] = useState("")
    const [productCount, setProductCount] = useState(1)
    const [selectedVariantForCart, setSelectedVariantForCart] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCartCreated, setIsCartCreated] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

    const [createCart, responseCreate] = useCartCreateMutation();
    const [updateCart, responseUpdate] = useUpdateExistingCartMutation();

    let cartIdExist;
    if (typeof window !== 'undefined') {
        cartIdExist = localStorage.getItem('cartId')
    }

    const createCartData = {
        variantID: selectedVariantForCart,
        quantity: productCount
    }
    const updateCartData = {
        variantID: selectedVariantForCart,
        cartId: cartIdExist,
        quantity: productCount
    }
  const AddToCartHandler = () => {
    setIsOpen(!isOpen);
    if (cartIdExist) {
        // console.log("Id exists in localStorage, updating cart...");
        updateCart(updateCartData);
    } else {
        // console.log("Creating new cart...");
        createCart(createCartData);
    }
  };

  const closeSidebar = (e) => {
    if (e.target.id !== 'sidebar' && isOpen) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', closeSidebar);
    } else {
      document.removeEventListener('click', closeSidebar);
    }

    return () => {
      document.removeEventListener('click', closeSidebar);
    };
  }, [isOpen]);

    // console.log("selectedImageId",selectedImageId)
    const getSizesAndChoicesForColor = (color) => {
            // const filteredVariants = variants.filter(variant => {
            //     const titleParts = variant.node.title.split("/");
            //     // console.log('titleParts', color);
            //     if (titleParts.length === 1) {
            //         // If title cannot be split, consider the color as the only option
            //         return titleParts[0].trim() === color;
            //     } else {
            //         // console.log("titleParts[1]", titleParts[1], color);
            //         return titleParts[0].trim() === color;
            //     }
            // });
            const containsColor = (titleParts, color) => {
                // console.log("containsColor", titleParts.some(part => part.trim() === color))
                return titleParts.some(part => part.trim() === color);
            };
            const filteredVariants = variants.filter(variant => {
                const titleParts = variant.node.title.split("/");
                return containsColor(titleParts, color);
            });
        // console.log("Check resultsssssssssss", filteredVariants);
        let sizes = [];
        let choices = [];

        if (filteredVariants.length > 0) {
            sizes = [...new Set(filteredVariants.map(variant => {
                const titleParts = variant.node.title.split("/");
                // console.log("titleParts &^&*", titleParts);
                const colorIndex = titleParts.findIndex(part => part.trim() === color);
                // Assuming the size is the other part if the color is found
                return colorIndex === 0 ? titleParts[1].trim() : titleParts[0].trim();
            }))];
    
            // Check if choices exist in any variant
            if (filteredVariants.some(variant => variant.node.title.split("/").length > 2)) {
                choices = [...new Set(filteredVariants.map(variant => {
                    const titleParts = variant.node.title.split("/");
                    // Assuming choice is the part after the color and size
                    return titleParts.length > 2 ? titleParts[2].trim() : '';
                }))].filter(choice => choice !== ''); // Remove empty strings
            }
        }
        return { sizes, choices };
    };

    const getSelectedVariantPrice = (size, color, choice) => {
        console.log("Compareddddd ====> :", size, color, choice);
        // console.log("Compare1 ====> :", selectedSize, selectedColor, selectedChoice);
        // console.log("Variantsdddddddddd:", variants);

        let selectedTitle = "";

        if (size && color && choice) {
            selectedTitle = `${size} / ${color} / ${choice}`;
        } else if (size && color) {
            selectedTitle = `${size} / ${color}`;
        } else if (size) {
            selectedTitle = `${size}`;
        }
        console.log("selectedTitle", selectedTitle);

        const normalizeTitle = (title) => {
            return title.split(' / ').sort().join(' / ');
        }
        const normalizedSelectedTitle = normalizeTitle(selectedTitle);
        const selectedVariant = variants.find(
            (variant) => normalizeTitle(variant.node.title) === normalizedSelectedTitle
        );
    
        // const selectedVariant = variants.find(
        //     (variant) => variant.node.title.includes(selectedTitle)
        // );
        console.log("selectedVariant", variants);

        // console.log("Selected Variant Price:", selectedVariant); 
        setSelectedPrice(selectedVariant?.node?.price?.amount);
        setCompareAtPrice(selectedVariant?.node?.compareAtPrice?.amount);
        setSelectedImageId(selectedVariant?.node?.image?.id);

        // const selectedImage = variants.find(
        //     (item) => item.node.image.id === selectedVariant?.node?.image?.id
        // );
        // // setSelectedImageId(selectedVariant?.node?.image?.id);
        // setSelectedImageId(selectedImage?.node?.image?.id);
        //  console.log("Selected Image", selectedImage);

        setQuantityAvailable(selectedVariant?.node.quantityAvailable)

        // setSelectedVariantForCart(selectedVariant?.node?.id)

    };

    const handleColorChange = (event) => {
        const selectColor = event.target.value;
        // console.log("ffffff", selectColor)
        setSelectedColor(selectColor);
        // console.log("ffffff", selectColor)
        // Find sizes and choices for selected color
        const { sizes, choices } = getSizesAndChoicesForColor(selectColor);
        // console.log("size return", sizes)

        setSelectedSize(sizes.includes(selectedSize) ? selectedSize : sizes[0]);
        // Update selected size and choice based on the first option of each list
        setSelectedChoice(Choices[0] || '');


        // Update selected price
        getSelectedVariantPrice(selectedSize, selectColor, selectedChoice);

    };

    const handleSizeChange = (event) => {
        const selectSize = event.target.value;
        // console.log("Ab size select hua ", selectSize)
        setSelectedSize(selectSize);

        // Update selected price
        getSelectedVariantPrice(selectSize, selectedColor, selectedChoice);
        // console.log("selected color ", selectedColor)


    };

    const handleChoiceChange = (event) => {
        setSelectedChoice(event.target.value);

        // Update selected price
        getSelectedVariantPrice(selectedColor, selectedSize, event.target.value);

    };

    useEffect(() => {
        // console.log("Compare1111 ====> :", selectedSize, selectedColor, selectedChoice);
        // Set default price on component mount
        getSelectedVariantPrice(selectedSize, selectedColor, selectedChoice);
        //    console.log("Check get", selectedPrice)

    }, []);

    useEffect(() => {
        if (responseCreate?.isSuccess) {
            const counterSum = responseCreate?.data?.res?.data?.cartCreate?.cart?.lines?.edges?.reduce((sum, item) => sum + item.node.quantity, 0);
            // console.log("Product count updated*****", counterSum)

            dispatch(setBaskitCounterValue(counterSum));
        }
    }, [responseCreate?.isSuccess]);

    useEffect(() => {
        if (responseUpdate?.isSuccess) {
            const counterSum = responseUpdate?.data?.res?.data?.cartLinesAdd?.cart?.lines?.edges?.reduce((sum, item) => sum + item.node.quantity, 0);
            // console.log("Product count updated 12211", counterSum)

            dispatch(setBaskitCounterValue(counterSum));
        }
    }, [responseUpdate?.isSuccess]);

    useEffect(() => {
        if (responseCreate.isSuccess) {
            const cartId = responseCreate.data?.res?.data?.cartCreate?.cart?.id;
            if (cartId) {
                localStorage.setItem('cartId', cartId);
                const currentTime = new Date().getTime();
                localStorage.setItem('cartCreationTime', currentTime);

                // 1 minute (60000 milliseconds) ke baad cartId ko remove karne ke liye setTimeout
                setTimeout(() => {
                    const storedCartCreationTime = localStorage.getItem('cartCreationTime');
                    if (storedCartCreationTime && (new Date().getTime() - storedCartCreationTime >= 60000)) {
                        localStorage.removeItem('cartId');
                        localStorage.removeItem('cartCreationTime');
                    }
                }, 60000);
            }
        }
    }, [responseCreate.isSuccess]);




    return (
        <>
        <ProductGallery variants={variants} selectedColor={selectedColor} selectedImageId={selectedImageId} product={product} />
            <div class="right block w-full md:max-w-[50%] md:px-2">
                <div class="right-content">
                    <div class="rating-box flex items-center gap-[10px] mb-[10px]">
                        <div class="stars flex items-center gap-1">
                            <svg class="w-5 h-5 sm:w-6 sm:h-6" width="20" height="20" viewBox="0 0 20 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9.12115 1.40576C9.45117 0.554271 10.656 0.554273 10.986 1.40576L12.8671 6.25916C13.0089 6.62524 13.3519 6.87442 13.7439 6.89624L18.9411 7.18545C19.8528 7.23619 20.2252 8.38203 19.5173 8.95902L15.4827 12.2478C15.1784 12.4959 15.0474 12.899 15.1478 13.2786L16.4788 18.3108C16.7123 19.1936 15.7376 19.9018 14.9701 19.4069L10.5955 16.5861C10.2655 16.3733 9.84161 16.3733 9.51165 16.5861L5.13707 19.4069C4.36959 19.9018 3.39489 19.1936 3.62839 18.3108L4.95933 13.2786C5.05972 12.899 4.92872 12.4959 4.6244 12.2478L0.589825 8.95901C-0.118008 8.38203 0.254297 7.23619 1.16609 7.18545L6.36323 6.89624C6.75524 6.87442 7.09821 6.62524 7.24009 6.25916L9.12115 1.40576Z"
                                    fill="#FFBD13" />
                            </svg>
                            <svg class="w-5 h-5 sm:w-6 sm:h-6" width="20" height="20" viewBox="0 0 20 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9.12115 1.40576C9.45117 0.554271 10.656 0.554273 10.986 1.40576L12.8671 6.25916C13.0089 6.62524 13.3519 6.87442 13.7439 6.89624L18.9411 7.18545C19.8528 7.23619 20.2252 8.38203 19.5173 8.95902L15.4827 12.2478C15.1784 12.4959 15.0474 12.899 15.1478 13.2786L16.4788 18.3108C16.7123 19.1936 15.7376 19.9018 14.9701 19.4069L10.5955 16.5861C10.2655 16.3733 9.84161 16.3733 9.51165 16.5861L5.13707 19.4069C4.36959 19.9018 3.39489 19.1936 3.62839 18.3108L4.95933 13.2786C5.05972 12.899 4.92872 12.4959 4.6244 12.2478L0.589825 8.95901C-0.118008 8.38203 0.254297 7.23619 1.16609 7.18545L6.36323 6.89624C6.75524 6.87442 7.09821 6.62524 7.24009 6.25916L9.12115 1.40576Z"
                                    fill="#FFBD13" />
                            </svg>
                            <svg class="w-5 h-5 sm:w-6 sm:h-6" width="20" height="20" viewBox="0 0 20 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9.12115 1.40576C9.45117 0.554271 10.656 0.554273 10.986 1.40576L12.8671 6.25916C13.0089 6.62524 13.3519 6.87442 13.7439 6.89624L18.9411 7.18545C19.8528 7.23619 20.2252 8.38203 19.5173 8.95902L15.4827 12.2478C15.1784 12.4959 15.0474 12.899 15.1478 13.2786L16.4788 18.3108C16.7123 19.1936 15.7376 19.9018 14.9701 19.4069L10.5955 16.5861C10.2655 16.3733 9.84161 16.3733 9.51165 16.5861L5.13707 19.4069C4.36959 19.9018 3.39489 19.1936 3.62839 18.3108L4.95933 13.2786C5.05972 12.899 4.92872 12.4959 4.6244 12.2478L0.589825 8.95901C-0.118008 8.38203 0.254297 7.23619 1.16609 7.18545L6.36323 6.89624C6.75524 6.87442 7.09821 6.62524 7.24009 6.25916L9.12115 1.40576Z"
                                    fill="#FFBD13" />
                            </svg>
                            <svg class="w-5 h-5 sm:w-6 sm:h-6" width="20" height="20" viewBox="0 0 20 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9.12115 1.40576C9.45117 0.554271 10.656 0.554273 10.986 1.40576L12.8671 6.25916C13.0089 6.62524 13.3519 6.87442 13.7439 6.89624L18.9411 7.18545C19.8528 7.23619 20.2252 8.38203 19.5173 8.95902L15.4827 12.2478C15.1784 12.4959 15.0474 12.899 15.1478 13.2786L16.4788 18.3108C16.7123 19.1936 15.7376 19.9018 14.9701 19.4069L10.5955 16.5861C10.2655 16.3733 9.84161 16.3733 9.51165 16.5861L5.13707 19.4069C4.36959 19.9018 3.39489 19.1936 3.62839 18.3108L4.95933 13.2786C5.05972 12.899 4.92872 12.4959 4.6244 12.2478L0.589825 8.95901C-0.118008 8.38203 0.254297 7.23619 1.16609 7.18545L6.36323 6.89624C6.75524 6.87442 7.09821 6.62524 7.24009 6.25916L9.12115 1.40576Z"
                                    fill="#FFBD13" />
                            </svg>
                            <svg class="w-5 h-5 sm:w-6 sm:h-6" width="20" height="20" viewBox="0 0 20 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9.12115 1.40576C9.45117 0.554271 10.656 0.554273 10.986 1.40576L12.8671 6.25916C13.0089 6.62524 13.3519 6.87442 13.7439 6.89624L18.9411 7.18545C19.8528 7.23619 20.2252 8.38203 19.5173 8.95902L15.4827 12.2478C15.1784 12.4959 15.0474 12.899 15.1478 13.2786L16.4788 18.3108C16.7123 19.1936 15.7376 19.9018 14.9701 19.4069L10.5955 16.5861C10.2655 16.3733 9.84161 16.3733 9.51165 16.5861L5.13707 19.4069C4.36959 19.9018 3.39489 19.1936 3.62839 18.3108L4.95933 13.2786C5.05972 12.899 4.92872 12.4959 4.6244 12.2478L0.589825 8.95901C-0.118008 8.38203 0.254297 7.23619 1.16609 7.18545L6.36323 6.89624C6.75524 6.87442 7.09821 6.62524 7.24009 6.25916L9.12115 1.40576Z"
                                    fill="#FFBD13" />
                            </svg>
                        </div>
                        <span class="text-sm text-black">3250 Ratings</span>
                    </div>
                    <h1 class="capitalize text-2xl font-bold text-[#4A4759] mb-2 sm:text-3xl xl:text-[40px]">{product?.title}</h1>
                    <div class="price-box block gap-1">
                        <span class="inline-block text-xs text[#222222] mr-1 sm:text-sm">From</span>
                        <span class="inline-block compare-price text-sm text-[#A0A0A0] line-through mr-1 sm:text-base">£{compareAtPrice}</span>
                        <span class="inline-block actuall-price text-2xl text-[#4A4759] font-bold mr-1">£{selectedPrice}</span>
                        <span class="inline-block save-price text-sm text-[#178954] font-medium sm:text-base">(You have save {discountPercentage}%)</span>
                    </div>

                    <div class="block py-4">
                        <svg width="111" height="30" viewBox="0 0 111 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M96.4735 30H13.6688C12.9577 30 12.2534 29.8599 11.5965 29.5878C10.9395 29.3157 10.3427 28.9169 9.84016 28.4141C9.3376 27.9114 8.93917 27.3146 8.66766 26.6579C8.39615 26.0012 8.25688 25.2974 8.25782 24.5869V5.41311C8.25688 4.70259 8.39615 3.99884 8.66766 3.34213C8.93917 2.68543 9.3376 2.08864 9.84016 1.58589C10.3427 1.08315 10.9395 0.684304 11.5965 0.412183C12.2534 0.140062 12.9577 -6.16685e-07 13.6688 0H96.4735C97.2076 0.00054788 97.9338 0.150501 98.608 0.440723C99.2821 0.730945 99.89 1.15535 100.395 1.68803L109.513 11.2749C110.467 12.2806 111 13.6139 111 15C111 16.3861 110.467 17.7194 109.513 18.7251L100.366 28.312C99.8648 28.8412 99.2615 29.2636 98.5926 29.5537C97.9236 29.8438 97.2027 29.9956 96.4735 30Z" fill="#178954" fill-opacity="0.05" />
                            <path d="M93.3446 30H10.5399C9.82875 30 9.12451 29.8599 8.46755 29.5878C7.81059 29.3157 7.2138 28.9169 6.71125 28.4141C6.2087 27.9114 5.81027 27.3146 5.53876 26.6579C5.26725 26.0012 5.12797 25.2974 5.12891 24.5869V5.41311C5.12797 4.70259 5.26725 3.99884 5.53876 3.34213C5.81027 2.68543 6.2087 2.08864 6.71125 1.58589C7.2138 1.08315 7.81059 0.684304 8.46755 0.412183C9.12451 0.140062 9.82875 -6.16685e-07 10.5399 0H93.3446C94.0786 0.00054788 94.8049 0.150501 95.4791 0.440723C96.1532 0.730945 96.761 1.15535 97.2656 1.68803L106.384 11.2749C107.339 12.2806 107.871 13.6139 107.871 15C107.871 16.3861 107.339 17.7194 106.384 18.7251L97.2371 28.312C96.7359 28.8412 96.1326 29.2636 95.4637 29.5537C94.7947 29.8438 94.0738 29.9956 93.3446 30Z" fill="#178954" fill-opacity="0.3" />
                            <path d="M88.2157 30H5.41102C4.69984 30 3.9956 29.8599 3.33864 29.5878C2.68169 29.3157 2.08489 28.9169 1.58234 28.4141C1.07979 27.9114 0.681359 27.3146 0.409851 26.6579C0.138342 26.0012 -0.000932303 25.2974 4.69661e-06 24.5869V5.41311C-0.000932303 4.70259 0.138342 3.99884 0.409851 3.34213C0.681359 2.68543 1.07979 2.08864 1.58234 1.58589C2.08489 1.08315 2.68169 0.684304 3.33864 0.412183C3.9956 0.140062 4.69984 -6.16685e-07 5.41102 0H88.2157C88.9497 0.00054788 89.676 0.150501 90.3502 0.440723C91.0243 0.730945 91.6321 1.15535 92.1367 1.68803L101.255 11.2749C102.21 12.2806 102.742 13.6139 102.742 15C102.742 16.3861 102.21 17.7194 101.255 18.7251L92.1082 28.312C91.6069 28.8412 91.0037 29.2636 90.3347 29.5537C89.6658 29.8438 88.9449 29.9956 88.2157 30Z" fill="#178954" />
                            <path d="M16.9508 9.662L16.7828 11.006H13.5348L13.2548 13.372H16.3908L16.2228 14.716H13.0868L12.5548 19H11.1268L12.2748 9.662H16.9508ZM17.1776 19L17.9056 13.106H19.2776L19.2076 13.638C19.2776 13.554 19.5016 13.302 19.8376 13.134C20.1456 12.98 20.4536 12.952 20.7336 12.952C21.0136 12.952 21.3496 12.994 21.7416 13.232L21.0696 14.478C20.8596 14.338 20.6216 14.268 20.3416 14.268C19.9216 14.268 19.6276 14.422 19.4316 14.618C19.0816 14.982 18.9696 15.654 18.9276 15.948L18.5496 19H17.1776ZM25.9352 17.012L27.0132 17.656C26.7192 18.146 26.3132 18.524 25.9212 18.762C25.5852 18.958 25.0532 19.182 24.2692 19.182C23.5412 19.182 22.9112 18.986 22.3792 18.44C21.9172 17.978 21.5812 17.264 21.5812 16.34C21.5812 15.332 21.9592 14.45 22.6032 13.82C23.1772 13.26 23.8772 12.952 24.7592 12.952C25.3052 12.952 25.9912 13.064 26.5372 13.638C26.9852 14.1 27.2652 14.842 27.2652 15.696C27.2652 15.878 27.2512 16.116 27.1952 16.382H22.9812C22.9812 16.802 23.1352 17.278 23.4152 17.572C23.5972 17.768 23.9192 17.95 24.3812 17.95C24.7032 17.95 25.0532 17.852 25.3192 17.684C25.5572 17.53 25.7952 17.264 25.9352 17.012ZM23.1912 15.262H25.9352C25.8932 14.968 25.7532 14.632 25.5852 14.45C25.3892 14.24 25.0672 14.128 24.7312 14.128C24.3812 14.128 24.0312 14.24 23.7372 14.478C23.4992 14.674 23.3032 14.982 23.1912 15.262ZM32.7848 17.012L33.8628 17.656C33.5688 18.146 33.1628 18.524 32.7708 18.762C32.4348 18.958 31.9028 19.182 31.1188 19.182C30.3908 19.182 29.7608 18.986 29.2288 18.44C28.7668 17.978 28.4308 17.264 28.4308 16.34C28.4308 15.332 28.8088 14.45 29.4528 13.82C30.0268 13.26 30.7268 12.952 31.6088 12.952C32.1548 12.952 32.8408 13.064 33.3868 13.638C33.8348 14.1 34.1148 14.842 34.1148 15.696C34.1148 15.878 34.1008 16.116 34.0448 16.382H29.8308C29.8308 16.802 29.9848 17.278 30.2648 17.572C30.4468 17.768 30.7688 17.95 31.2308 17.95C31.5528 17.95 31.9028 17.852 32.1688 17.684C32.4068 17.53 32.6448 17.264 32.7848 17.012ZM30.0408 15.262H32.7848C32.7428 14.968 32.6028 14.632 32.4348 14.45C32.2388 14.24 31.9168 14.128 31.5808 14.128C31.2308 14.128 30.8808 14.24 30.5868 14.478C30.3488 14.674 30.1528 14.982 30.0408 15.262ZM44.904 11.062L43.672 11.734C43.602 11.468 43.448 11.23 43.252 11.076C42.986 10.88 42.608 10.81 42.328 10.81C41.782 10.81 41.446 11.006 41.264 11.174C41.04 11.37 40.872 11.678 40.872 12.014C40.872 12.336 41.012 12.546 41.208 12.728C41.502 12.994 41.768 13.064 42.118 13.218L42.874 13.554C43.476 13.82 43.84 14.142 44.05 14.408C44.428 14.87 44.54 15.36 44.54 15.934C44.54 17.012 44.162 17.74 43.686 18.244C42.93 19.028 41.978 19.182 41.25 19.182C40.522 19.182 39.892 19.028 39.374 18.524C38.912 18.076 38.534 17.32 38.506 16.424L39.948 16.116C39.934 16.48 40.018 17.04 40.27 17.376C40.494 17.67 40.858 17.866 41.46 17.866C41.964 17.866 42.314 17.698 42.566 17.474C42.93 17.152 43.098 16.578 43.098 16.102C43.098 15.724 42.958 15.458 42.734 15.22C42.468 14.94 42.09 14.772 41.782 14.632L41.068 14.31C40.732 14.156 40.284 13.918 39.962 13.568C39.668 13.232 39.444 12.756 39.444 12.196C39.444 12.07 39.444 11.174 40.186 10.39C40.69 9.858 41.418 9.494 42.412 9.494C42.874 9.494 43.476 9.564 44.022 9.928C44.526 10.264 44.778 10.698 44.904 11.062ZM45.7108 19L46.9708 8.794H48.3428L47.7408 13.61C47.8528 13.484 48.0488 13.316 48.3288 13.176C48.6648 13.008 49.0008 12.952 49.3368 12.952C50.0508 12.952 50.4848 13.204 50.7368 13.456C51.0448 13.764 51.2688 14.268 51.2688 14.884C51.2688 15.094 51.2408 15.346 51.1428 16.102L50.7788 19H49.4068L49.7848 15.962C49.8548 15.444 49.8548 15.234 49.8548 15.178C49.8548 14.94 49.8128 14.632 49.5888 14.422C49.4068 14.254 49.1408 14.184 48.8888 14.184C48.3988 14.184 48.1188 14.394 48.0068 14.506C47.6428 14.856 47.5168 15.458 47.4328 16.158L47.0828 19H45.7108ZM53.2474 13.106H54.6194L53.8914 19H52.5194L53.2474 13.106ZM53.3314 10.81C53.3314 10.544 53.4294 10.278 53.6254 10.082C53.7934 9.914 54.0454 9.788 54.3394 9.788C54.5774 9.788 54.7734 9.872 54.8994 9.998C55.0254 10.124 55.1234 10.306 55.1234 10.53C55.1234 10.754 55.0254 11.048 54.8434 11.244C54.6754 11.426 54.3954 11.552 54.1014 11.552C53.8354 11.552 53.6674 11.454 53.5554 11.342C53.4294 11.23 53.3314 11.034 53.3314 10.81ZM57.0926 18.314L56.6166 22.206H55.2446L56.3646 13.106H57.7366L57.6526 13.75C57.8486 13.484 58.0726 13.316 58.3526 13.19C58.7026 13.022 59.0386 12.952 59.4026 12.952C60.1446 12.952 60.8446 13.26 61.2786 13.708C61.7126 14.156 62.0206 14.856 62.0206 15.71C62.0206 16.732 61.6006 17.726 61.0266 18.342C60.5226 18.874 59.8926 19.196 59.0666 19.196C58.5766 19.196 58.1146 19.098 57.7366 18.874C57.4846 18.72 57.2606 18.51 57.0926 18.314ZM59.0806 14.184C58.6466 14.184 58.2686 14.268 57.9046 14.618C57.4986 15.01 57.2606 15.668 57.2606 16.326C57.2606 16.662 57.3166 17.138 57.6526 17.488C57.9046 17.754 58.2966 17.95 58.7726 17.95C59.2626 17.95 59.6266 17.782 59.9346 17.474C60.3126 17.096 60.6066 16.466 60.6066 15.822C60.6066 15.332 60.4386 14.912 60.1866 14.632C59.8926 14.31 59.5286 14.184 59.0806 14.184ZM64.5437 18.314L64.0677 22.206H62.6957L63.8157 13.106H65.1877L65.1037 13.75C65.2997 13.484 65.5237 13.316 65.8037 13.19C66.1537 13.022 66.4897 12.952 66.8537 12.952C67.5957 12.952 68.2957 13.26 68.7297 13.708C69.1637 14.156 69.4717 14.856 69.4717 15.71C69.4717 16.732 69.0517 17.726 68.4777 18.342C67.9737 18.874 67.3437 19.196 66.5177 19.196C66.0277 19.196 65.5657 19.098 65.1877 18.874C64.9357 18.72 64.7117 18.51 64.5437 18.314ZM66.5317 14.184C66.0977 14.184 65.7197 14.268 65.3557 14.618C64.9497 15.01 64.7117 15.668 64.7117 16.326C64.7117 16.662 64.7677 17.138 65.1037 17.488C65.3557 17.754 65.7477 17.95 66.2237 17.95C66.7137 17.95 67.0777 17.782 67.3857 17.474C67.7637 17.096 68.0577 16.466 68.0577 15.822C68.0577 15.332 67.8897 14.912 67.6377 14.632C67.3437 14.31 66.9797 14.184 66.5317 14.184ZM71.2669 13.106H72.6389L71.9109 19H70.5389L71.2669 13.106ZM71.3509 10.81C71.3509 10.544 71.4489 10.278 71.6449 10.082C71.8129 9.914 72.0649 9.788 72.3589 9.788C72.5969 9.788 72.7929 9.872 72.9189 9.998C73.0449 10.124 73.1429 10.306 73.1429 10.53C73.1429 10.754 73.0449 11.048 72.8629 11.244C72.6949 11.426 72.4149 11.552 72.1209 11.552C71.8549 11.552 71.6869 11.454 71.5749 11.342C71.4489 11.23 71.3509 11.034 71.3509 10.81ZM73.6421 19L74.3701 13.106H75.7421L75.6721 13.638C75.8541 13.414 76.0361 13.288 76.2601 13.176C76.6101 13.008 76.9181 12.952 77.2681 12.952C77.9821 12.952 78.4161 13.204 78.6681 13.456C78.9761 13.764 79.2001 14.24 79.2001 14.856C79.2001 15.08 79.1721 15.332 79.0741 16.102L78.7101 19H77.3381L77.7161 15.962C77.7861 15.444 77.7861 15.234 77.7861 15.178C77.7861 14.94 77.7441 14.632 77.5201 14.422C77.3381 14.254 77.0721 14.184 76.8201 14.184C76.3301 14.184 76.0501 14.394 75.9381 14.506C75.5741 14.856 75.4481 15.458 75.3641 16.158L75.0141 19H73.6421ZM85.393 13.75L85.477 13.106H86.849L86.135 18.846C86.051 19.56 85.897 20.666 85.267 21.366C84.903 21.772 84.175 22.22 82.999 22.22C82.411 22.22 81.781 22.094 81.263 21.66C80.633 21.128 80.395 20.302 80.367 19.658H81.697C81.711 19.98 81.837 20.4 82.075 20.652C82.369 20.946 82.761 20.988 83.069 20.988C83.377 20.988 83.825 20.932 84.175 20.582C84.553 20.204 84.665 19.63 84.735 19.098L84.833 18.342C84.315 19.084 83.559 19.182 83.125 19.182C82.495 19.182 81.823 18.986 81.263 18.426C80.773 17.936 80.451 17.264 80.451 16.326C80.451 15.374 80.815 14.436 81.501 13.764C82.103 13.176 82.747 12.952 83.657 12.952C84.049 12.952 84.805 12.994 85.393 13.75ZM83.741 14.184C83.209 14.184 82.733 14.394 82.439 14.702C82.075 15.08 81.879 15.71 81.879 16.256C81.879 16.844 82.103 17.25 82.313 17.474C82.565 17.74 82.943 17.95 83.391 17.95C83.811 17.95 84.217 17.81 84.581 17.446C84.889 17.138 85.211 16.62 85.211 15.808C85.211 15.402 85.113 14.954 84.763 14.604C84.539 14.38 84.203 14.184 83.741 14.184Z" fill="white" />
                        </svg>
                    </div>
                    <d
                    iv class="block p-5 bg-[#F2F2F2] mb-4 sm:px-8">
                        <div class="block">
                            <p class="block text-sm text-black mb-3 sm:text-base">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                            <a href="#" class="block w-fit text-black underline sm:text-base">Your Product Link Here</a>
                        </div>
                    </d>
                    <div class="block mb-4">
                    <div class="variant mb-14 flex justify-between gap-5">
                        {
                            selectedColor ? <>
                                <div class="variant-content w-[50%]">
                                    <label for="size" class=" w-full text-base text-[#575759] capitalize mb-3">Color : <span class="ml-1">{selectedColor}</span></label>
                                    <div class="variant-box block w-full">
                                        <div class="variant-box-content flex w-full flex-wrap gap-5">
                                            <select className="w-[100%] p-2  border-2 cursor-pointer" value={selectedColor} onChange={handleColorChange}>
                                                {Colors.map((color, index) => {
                                                    return <option key={color} value={color} className=" cursor-pointer w-full  py-6 text-md text-center border-2 border-[#cbc4c499] capitalize">{color}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div class="variant-content w-[50%]">
                                    <label for="size" class=" w-full text-base text-[#575759] capitalize mb-3">Size : <span class="ml-1">{selectedSize}</span></label>
                                    <div class="variant-box block w-full">
                                        <div class="variant-box-content flex w-full flex-wrap gap-5">
                                            <select className="w-[100%] p-2  border-2 cursor-pointer" value={selectedSize} onChange={handleSizeChange}>
                                                {getSizesAndChoicesForColor(selectedColor).sizes.map((size, index) => (
                                                    <option key={index} value={size} className=" cursor-pointer w-full  py-6 text-md text-center  border-[2px] border-[#cbc4c499] capitalize">{size}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                {
                                    selectedChoice && <div class="variant-content w-[50%]">
                                        <label for="size" class=" w-full text-base text-[#575759] capitalize mb-3">Choices : <span class="ml-1">{selectedChoice}</span></label>
                                        <div class="variant-box block w-full">
                                            <div class="variant-box-content flex w-full flex-wrap gap-5">
                                                <select className="w-[100%] p-2  border-2" value={selectedSize} onChange={handleChoiceChange}>
                                                    {getSizesAndChoicesForColor(selectedColor).choices.map((choice, index) => (
                                                        <option key={index} value={choice} className=" cursor-pointer w-full  py-6 text-md text-center  border-[2px] border-[#cbc4c499] capitalize">{choice}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                }

                            </> : <div class="variant-content flex-1">
                                <label for="size" class=" w-full text-base text-[#575759] capitalize mb-3">Size : <span class="ml-1">{selectedSize}</span></label>
                                <div class="variant-box block w-full">
                                    <div class="variant-box-content flex w-full flex-wrap gap-5">
                                        <select className="w-[100%] p-2  border-2" value={selectedSize} onChange={handleSizeChange}>
                                            {Sizes.map((size, index) => (
                                                <option key={index} value={size} className=" cursor-pointer w-full  py-6 text-md text-center  border-[2px] border-[#cbc4c499] capitalize">{size}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                        }



                    </div>
                    </div>
                    {/* <div className="block mb-5">
                        <div className="block mb-3">
                            <div className="flex items-center gap-1">
                                <span className="text-base text-black font-medium">Sizes:</span>
                                <span className="text-base text-black font-medium">{selected}</span>
                            </div>
                        </div>
                        <div className="block">
                            <div className="flex gap-[10px] flex-wrap">
                            {getSizesAndChoicesForColor(selectedColor).choices.map((choice, index) => (
                                <span key={index} value={choice} className={`block border-2 w-full min-w-[84px] max-w-fit text-center text-sm capitalize p-[6px] bg-[#F2F2F2] sm:max-w-[120px] `}>{choice}</span>
                            ))}
                            </div>
                        </div>
                    </div> */}
                    {/* <div className="block mb-5">
                        <div className="block mb-3">
                            <div className="flex items-center gap-1">
                                <span className="text-base text-black font-medium">Sizes:</span>
                                <span className="text-base text-black font-medium">{selected}</span>
                            </div>
                        </div>
                        <div className="block">
                            <div className="flex gap-[10px] flex-wrap">
                            {getSizesAndChoicesForColor(selectedColor).sizes.map((size, index) => (
                                <span key={index} value={size} className={`block border-2 w-full min-w-[84px] max-w-fit text-center text-sm capitalize p-[6px] bg-[#F2F2F2] sm:max-w-[120px] ${selected === size ? 'border-[#4A4759] text-[#4A4759] bg-white' : ''}`}>{size}</span>
                            ))}
                            </div>
                        </div>
                    </div> */}
                    <div className="flex gap-[10px] mb-[18px]">
                        <div className="flex bg-[#F2F2F2] border w-full max-w-[170px] border-[#D9D9D9]">
                            <button
                                onClick={incrementQuantity}
                                className="min-w-[40px] max-w-[40px] flex items-center justify-center w-full py-[18px] text-xl font-bold focus:outline-none border-r border-[#D9D9D9]">
                                <svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.66 5.36365V4.04365H4.28V0.603647H5.72V4.04365H9.34V5.36365H5.72V8.80365H4.28V5.36365H0.66Z" fill="black" />
                                </svg>
                            </button>
                            <input
                                type="text"
                                value={quantity}
                                readOnly
                                className="w-full min-w-[57px] text-center bg-transparent border-none focus:outline-none"
                            />
                            <button
                                onClick={decrementQuantity}
                                className="min-w-[40px] max-w-[40px] flex items-center justify-center w-full py-[18px] text-xl font-bold focus:outline-none border-l border-[#D9D9D9]">
                                <svg width="7" height="2" viewBox="0 0 7 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect y="0.302979" width="7" height="1.39394" fill="black" />
                                </svg>
                            </button>
                        </div>
                        <button className="flex items-center justify-center text-base capitalize text-white text-center bg-[#0D7F99] min-h-[46px] w-full "
                         disabled={quantityAvailable <= 0}
                         onClick={AddToCartHandler}>
                            {quantityAvailable <= 0 ? "OUT OF STOCK" : "ADD TO Cart"}
                        </button>
                    </div>
                    <button class="flex items-center justify-center text-base capitalize text-white text-center bg-[#4A4759] min-h-[46px] w-full min-w-[217px] mb-5">
                        BUY NOW
                    </button>
                    <div class="block mb-20 sm:mb-8">
                        <div class="flex items-center">
                            <span class="text-base text-black mr-2 font-medium">Share on:</span>
                            <a href="#" class="block mr-2">
                                <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.3414 0.0743408H12.245L8.08622 4.8276L12.9787 11.2957H9.14794L6.14752 7.37283L2.71435 11.2957H0.809597L5.25786 6.21157L0.564453 0.0743408H4.49251L7.20463 3.66L10.3414 0.0743408ZM9.67333 10.1563H10.7281L3.91935 1.15389H2.78743L9.67333 10.1563Z" fill="black" />
                                </svg>
                            </a>
                            <a href="#" class="block mr-2">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_1099_1065)">
                                        <path d="M6.77143 1.21939C8.58067 1.21939 8.79492 1.22732 9.50645 1.25906C10.1677 1.28816 10.5248 1.39925 10.7629 1.49183C11.0776 1.6135 11.3051 1.76163 11.5405 1.99704C11.7786 2.2351 11.9241 2.45993 12.0457 2.7747C12.1383 3.01276 12.2494 3.37249 12.2785 4.03112C12.3102 4.74529 12.3182 4.95954 12.3182 6.76614C12.3182 8.57538 12.3102 8.78963 12.2785 9.50116C12.2494 10.1624 12.1383 10.5195 12.0457 10.7576C11.9241 11.0723 11.7759 11.2998 11.5405 11.5352C11.3025 11.7733 11.0776 11.9188 10.7629 12.0404C10.5248 12.133 10.1651 12.2441 9.50645 12.2732C8.79228 12.305 8.57803 12.3129 6.77143 12.3129C4.96219 12.3129 4.74794 12.305 4.03641 12.2732C3.37513 12.2441 3.01805 12.133 2.77999 12.0404C2.46522 11.9188 2.23775 11.7706 2.00233 11.5352C1.76427 11.2972 1.61879 11.0723 1.49712 10.7576C1.40454 10.5195 1.29345 10.1598 1.26435 9.50116C1.23261 8.78699 1.22468 8.57273 1.22468 6.76614C1.22468 4.9569 1.23261 4.74264 1.26435 4.03112C1.29345 3.36984 1.40454 3.01276 1.49712 2.7747C1.61879 2.45993 1.76692 2.23246 2.00233 1.99704C2.24039 1.75898 2.46522 1.6135 2.77999 1.49183C3.01805 1.39925 3.37778 1.28816 4.03641 1.25906C4.74794 1.22732 4.96219 1.21939 6.77143 1.21939ZM6.77143 0C4.93309 0 4.70297 0.00793527 3.98086 0.0396763C3.2614 0.0714174 2.76676 0.187801 2.33826 0.354442C1.89124 0.529018 1.51299 0.759141 1.13739 1.13739C0.759141 1.51299 0.529018 1.89124 0.354442 2.33561C0.187801 2.76676 0.0714174 3.25875 0.0396763 3.97821C0.00793527 4.70297 0 4.93309 0 6.77143C0 8.60977 0.00793527 8.83989 0.0396763 9.562C0.0714174 10.2815 0.187801 10.7761 0.354442 11.2046C0.529018 11.6516 0.759141 12.0299 1.13739 12.4055C1.51299 12.7811 1.89124 13.0138 2.33561 13.1858C2.76676 13.3524 3.25875 13.4688 3.97821 13.5005C4.70032 13.5323 4.93045 13.5402 6.76878 13.5402C8.60712 13.5402 8.83724 13.5323 9.55935 13.5005C10.2788 13.4688 10.7734 13.3524 11.202 13.1858C11.6463 13.0138 12.0246 12.7811 12.4002 12.4055C12.7758 12.0299 13.0085 11.6516 13.1805 11.2072C13.3471 10.7761 13.4635 10.2841 13.4952 9.56464C13.527 8.84253 13.5349 8.61241 13.5349 6.77407C13.5349 4.93574 13.527 4.70561 13.4952 3.9835C13.4635 3.26404 13.3471 2.76941 13.1805 2.3409C13.0138 1.89124 12.7837 1.51299 12.4055 1.13739C12.0299 0.761786 11.6516 0.529018 11.2072 0.357087C10.7761 0.190446 10.2841 0.0740625 9.56464 0.0423214C8.83989 0.00793527 8.60977 0 6.77143 0Z" fill="#000100" />
                                        <path d="M6.77126 3.29309C4.85093 3.29309 3.29297 4.85105 3.29297 6.77138C3.29297 8.69172 4.85093 10.2497 6.77126 10.2497C8.6916 10.2497 10.2496 8.69172 10.2496 6.77138C10.2496 4.85105 8.6916 3.29309 6.77126 3.29309ZM6.77126 9.02764C5.52542 9.02764 4.515 8.01722 4.515 6.77138C4.515 5.52555 5.52542 4.51512 6.77126 4.51512C8.0171 4.51512 9.02752 5.52555 9.02752 6.77138C9.02752 8.01722 8.0171 9.02764 6.77126 9.02764Z" fill="#000100" />
                                        <path d="M11.2003 3.15555C11.2003 3.60522 10.8352 3.96759 10.3882 3.96759C9.93855 3.96759 9.57617 3.60257 9.57617 3.15555C9.57617 2.70588 9.94119 2.34351 10.3882 2.34351C10.8352 2.34351 11.2003 2.70853 11.2003 3.15555Z" fill="#000100" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_1099_1065">
                                            <rect width="13.5429" height="13.5429" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </a>
                            <a href="#" class="block mr-2">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_1099_1064)">
                                        <path d="M14 7C14 3.13404 10.866 0 7 0C3.13404 0 0 3.13404 0 7C0 10.2827 2.26016 13.0374 5.30908 13.7939V9.1392H3.86568V7H5.30908V6.07824C5.30908 3.69572 6.38736 2.5914 8.72648 2.5914C9.17 2.5914 9.93524 2.67848 10.2483 2.76528V4.70428C10.0831 4.68692 9.79608 4.67824 9.43964 4.67824C8.29192 4.67824 7.8484 5.11308 7.8484 6.24344V7H10.1349L9.74204 9.1392H7.8484V13.9488C11.3145 13.5302 14.0003 10.579 14.0003 7H14Z" fill="#0866FF" />
                                        <path d="M9.74159 9.13923L10.1344 7.00003H7.84795V6.24347C7.84795 5.11311 8.29147 4.67827 9.43919 4.67827C9.79563 4.67827 10.0826 4.68695 10.2478 4.70431V2.76531C9.93479 2.67823 9.16955 2.59143 8.72603 2.59143C6.38691 2.59143 5.30863 3.69575 5.30863 6.07827V7.00003H3.86523V9.13923H5.30863V13.794C5.85015 13.9284 6.41659 14 6.99955 14C7.28655 14 7.56963 13.9824 7.84767 13.9488V9.13923H9.74131H9.74159Z" fill="white" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_1099_1064">
                                            <rect width="14" height="14" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </a>
                            <a href="#" class="block mr-2">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.69308 4.88873C10.564 5.51349 11.6309 5.88109 12.7831 5.88109V3.65584C12.5651 3.65589 12.3476 3.63307 12.1342 3.58771V5.33929C10.982 5.33929 9.91527 4.97169 9.04415 4.34698V8.88805C9.04415 11.1597 7.20914 13.0011 4.94567 13.0011C4.10112 13.0011 3.31614 12.7449 2.66406 12.3055C3.40831 13.0691 4.44621 13.5429 5.59447 13.5429C7.85807 13.5429 9.69317 11.7015 9.69317 9.42971V4.88873H9.69308V4.88873ZM10.4936 2.64373C10.0485 2.15575 9.75631 1.52514 9.69308 0.827962V0.541748H9.07812C9.23292 1.42786 9.7609 2.1849 10.4936 2.64373ZM4.09571 10.5622C3.84704 10.235 3.71266 9.83476 3.71326 9.4232C3.71326 8.38422 4.55258 7.5418 5.58808 7.5418C5.78106 7.54176 5.97288 7.57141 6.15679 7.62997V5.355C5.94187 5.32544 5.72496 5.31289 5.50814 5.31749V7.08822C5.32409 7.02966 5.13217 6.99991 4.93915 7.0001C3.90365 7.0001 3.06437 7.84242 3.06437 8.88154C3.06437 9.61627 3.4839 10.2524 4.09571 10.5622Z" fill="#FF004F" />
                                    <path d="M9.04429 4.34693C9.91542 4.97164 10.9822 5.33924 12.1344 5.33924V3.58766C11.4912 3.45018 10.9218 3.11288 10.4938 2.64373C9.76099 2.18485 9.23306 1.42781 9.07827 0.541748H7.46295V9.42961C7.4593 10.4658 6.62141 11.3047 5.58813 11.3047C4.97924 11.3047 4.4383 11.0135 4.09571 10.5622C3.48395 10.2524 3.06443 9.61622 3.06443 8.88159C3.06443 7.84256 3.9037 7.00015 4.9392 7.00015C5.1376 7.00015 5.32882 7.03115 5.50819 7.08827V5.31754C3.28449 5.36364 1.49609 7.18708 1.49609 9.42966C1.49609 10.5491 1.94145 11.564 2.66426 12.3055C3.31634 12.7449 4.10131 13.0012 4.94587 13.0012C7.20938 13.0012 9.04434 11.1597 9.04434 8.88805V4.34693H9.04429Z" fill="black" />
                                    <path d="M12.1328 3.58762V3.114C11.5529 3.11489 10.9843 2.95189 10.4923 2.64364C10.9278 3.12223 11.5014 3.45222 12.1328 3.58762ZM9.07677 0.541705C9.062 0.457021 9.05066 0.37178 9.04279 0.286214V0H6.81247V8.88796C6.80891 9.92396 5.97106 10.7629 4.9377 10.7629C4.63432 10.7629 4.34788 10.6907 4.09421 10.5622C4.4368 11.0134 4.97774 11.3046 5.58663 11.3046C6.61981 11.3046 7.45784 10.4658 7.46145 9.42962V0.541705H9.07677ZM5.50678 5.31749V4.8133C5.32042 4.78773 5.13253 4.77491 4.94441 4.775C2.68071 4.77495 0.845703 6.61647 0.845703 8.88796C0.845703 10.3121 1.56689 11.5671 2.6628 12.3054C1.93999 11.5639 1.49464 10.549 1.49464 9.42957C1.49464 7.18704 3.28299 5.3636 5.50678 5.31749Z" fill="#00F2EA" />
                                </svg>
                            </a>
                            <a href="#" class="block mr-2">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_1099_1063)">
                                        <path d="M13.2734 3.49032C13.1968 3.20221 13.0459 2.93925 12.8358 2.72778C12.6257 2.51631 12.3637 2.36373 12.076 2.28532C11.0172 2.00061 6.7851 2.00061 6.7851 2.00061C6.7851 2.00061 2.55296 2.00061 1.49415 2.28532C1.20653 2.36373 0.944551 2.51631 0.734427 2.72778C0.524303 2.93925 0.373407 3.20221 0.296841 3.49032C0.0136719 4.55375 0.0136719 6.77139 0.0136719 6.77139C0.0136719 6.77139 0.0136719 8.98903 0.296841 10.0525C0.373407 10.3406 0.524303 10.6035 0.734427 10.815C0.944551 11.0265 1.20653 11.179 1.49415 11.2575C2.55296 11.5422 6.7851 11.5422 6.7851 11.5422C6.7851 11.5422 11.0172 11.5422 12.076 11.2575C12.3637 11.179 12.6257 11.0265 12.8358 10.815C13.0459 10.6035 13.1968 10.3406 13.2734 10.0525C13.5565 8.98903 13.5565 6.77139 13.5565 6.77139C13.5565 6.77139 13.5565 4.55375 13.2734 3.49032Z" fill="#FF0302" />
                                        <path d="M5.40039 8.78515V4.75769L8.94 6.77142L5.40039 8.78515Z" fill="#FEFEFE" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_1099_1063">
                                            <rect width="13.5429" height="13.5429" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div class="hidden sm:block mb-4">
                        <div class="block mb-3">
                            <div class="flex items-center gap-1">
                                <span class="text-base text-black font-medium">Product Specifications</span>
                            </div>
                        </div>
                        <div class="block bg-[#F2F2F2] p-[30px]">
                            <div class="grid grid-cols-2 gap-9">
                                <div class="flex gap-[10px] items-center">
                                    <svg width="35" height="43" viewBox="0 0 35 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_917_832)">
                                            <path d="M31.8595 43H3.14046C2.30779 42.9992 1.50946 42.6636 0.920675 42.067C0.331893 41.4703 0.000777101 40.6613 0 39.8174V3.18254C0.000777101 2.33872 0.331893 1.52968 0.920675 0.933011C1.50946 0.33634 2.30779 0.000787514 3.14046 0H31.8595C32.6922 0.000787514 33.4905 0.33634 34.0793 0.933011C34.6681 1.52968 34.9992 2.33872 35 3.18254V39.8174C34.9992 40.6613 34.6681 41.4703 34.0793 42.067C33.4905 42.6636 32.6922 42.9992 31.8595 43ZM3.14046 1.35927C2.66017 1.35927 2.19956 1.55262 1.85995 1.89678C1.52034 2.24094 1.32956 2.70772 1.32956 3.19444V39.8174C1.33034 40.3039 1.52137 40.7702 1.86081 41.1142C2.20026 41.4582 2.66041 41.6518 3.14046 41.6526H31.8595C32.3396 41.6518 32.7997 41.4582 33.1392 41.1142C33.4786 40.7702 33.6697 40.3039 33.6704 39.8174V3.18254C33.6704 2.69582 33.4796 2.22904 33.14 1.88488C32.8004 1.54072 32.3398 1.34737 31.8595 1.34737L3.14046 1.35927Z" fill="#202020" />
                                            <path d="M31.9273 7.34958H3.07322C2.90455 7.33822 2.74643 7.26229 2.63093 7.1372C2.51543 7.01211 2.45117 6.8472 2.45117 6.67589C2.45117 6.50457 2.51543 6.33967 2.63093 6.21458C2.74643 6.08949 2.90455 6.01356 3.07322 6.0022H31.9273C32.096 6.01356 32.2541 6.08949 32.3696 6.21458C32.4851 6.33967 32.5494 6.50457 32.5494 6.67589C32.5494 6.8472 32.4851 7.01211 32.3696 7.1372C32.2541 7.26229 32.096 7.33822 31.9273 7.34958Z" fill="#202020" />
                                            <path d="M3.94777 4.51805H3.11717C2.94849 4.50669 2.79039 4.43078 2.67488 4.30569C2.55938 4.1806 2.49512 4.01567 2.49512 3.84436C2.49512 3.67304 2.55938 3.50814 2.67488 3.38305C2.79039 3.25796 2.94849 3.18204 3.11717 3.17068H3.94777C4.03879 3.16454 4.13007 3.17742 4.21598 3.2085C4.30188 3.23958 4.38058 3.2882 4.44718 3.35136C4.51379 3.41452 4.56689 3.49088 4.60319 3.57568C4.63949 3.66048 4.65822 3.75192 4.65822 3.84436C4.65822 3.9368 4.63949 4.02825 4.60319 4.11306C4.56689 4.19786 4.51379 4.27421 4.44718 4.33737C4.38058 4.40052 4.30188 4.44916 4.21598 4.48024C4.13007 4.51132 4.03879 4.52418 3.94777 4.51805Z" fill="#202020" />
                                            <path d="M7.30863 4.51805H6.47802C6.387 4.52418 6.29571 4.51132 6.20981 4.48024C6.1239 4.44916 6.04522 4.40052 5.97861 4.33737C5.91201 4.27421 5.85891 4.19786 5.82261 4.11306C5.78631 4.02825 5.76758 3.9368 5.76758 3.84436C5.76758 3.75192 5.78631 3.66048 5.82261 3.57568C5.85891 3.49088 5.91201 3.41452 5.97861 3.35136C6.04522 3.2882 6.1239 3.23958 6.20981 3.2085C6.29571 3.17742 6.387 3.16454 6.47802 3.17068H7.30863C7.47731 3.18204 7.63541 3.25796 7.75091 3.38305C7.86642 3.50814 7.93068 3.67304 7.93068 3.84436C7.93068 4.01567 7.86642 4.1806 7.75091 4.30569C7.63541 4.43078 7.47731 4.50669 7.30863 4.51805Z" fill="#202020" />
                                            <path d="M31.6656 4.51803H30.832C30.6633 4.50666 30.5052 4.43076 30.3897 4.30566C30.2742 4.18057 30.21 4.01565 30.21 3.84434C30.21 3.67302 30.2742 3.50812 30.3897 3.38303C30.5052 3.25794 30.6633 3.18202 30.832 3.17065H31.6656C31.8342 3.18202 31.9923 3.25794 32.1078 3.38303C32.2233 3.50812 32.2876 3.67302 32.2876 3.84434C32.2876 4.01565 32.2233 4.18057 32.1078 4.30566C31.9923 4.43076 31.8342 4.50666 31.6656 4.51803Z" fill="#202020" />
                                            <path d="M17.4987 38.4403C14.7704 38.4403 12.1033 37.6205 9.83481 36.0844C7.56631 34.5483 5.79824 32.365 4.75416 29.8106C3.71008 27.2562 3.4369 24.4455 3.96916 21.7337C4.50143 19.022 5.81524 16.5311 7.74444 14.576C9.67365 12.621 12.1316 11.2896 14.8075 10.7502C17.4834 10.2108 20.257 10.4876 22.7776 11.5457C25.2982 12.6038 27.4526 14.3955 28.9684 16.6944C30.4842 18.9933 31.2932 21.6961 31.2932 24.4609C31.2932 28.1685 29.8399 31.7242 27.2529 34.3459C24.6659 36.9675 21.1572 38.4403 17.4987 38.4403ZM17.4987 11.8319C15.0333 11.8319 12.6233 12.5728 10.5735 13.9608C8.52363 15.3488 6.92595 17.3217 5.98251 19.6299C5.03906 21.9381 4.79221 24.4779 5.27318 26.9283C5.75414 29.3787 6.94132 31.6295 8.68458 33.3961C10.4278 35.1627 12.6489 36.3658 15.0669 36.8532C17.4848 37.3406 19.9911 37.0905 22.2688 36.1344C24.5465 35.1783 26.4932 33.5592 27.8629 31.4819C29.2326 29.4046 29.9636 26.9623 29.9636 24.4639C29.9598 21.1149 28.6452 17.9042 26.3084 15.5361C23.9716 13.168 20.8034 11.8359 17.4987 11.8319Z" fill="#202020" />
                                            <path d="M17.499 35.1774C15.5329 35.1755 13.6064 34.6176 11.9361 33.5667C10.2657 32.5157 8.9179 31.0133 8.04414 29.2285C7.17038 27.4436 6.80536 25.4471 6.99013 23.4635C7.1749 21.4799 7.90213 19.5879 9.09003 18.0003C10.2779 16.4127 11.8794 15.1924 13.7143 14.4768C15.5491 13.7611 17.5447 13.5785 19.4764 13.9494C21.4081 14.3203 23.1993 15.23 24.6487 16.5763C26.0981 17.9225 27.1481 19.6519 27.6805 21.5698C27.7237 21.7285 27.7081 21.8978 27.6368 22.0456C27.5654 22.1935 27.4432 22.3099 27.2931 22.3729C26.8838 22.5426 26.5335 22.8319 26.287 23.204C26.0405 23.5761 25.9088 24.0142 25.9088 24.4624C25.9088 24.9106 26.0405 25.3486 26.287 25.7207C26.5335 26.0928 26.8838 26.3822 27.2931 26.5519C27.4438 26.6149 27.5665 26.7317 27.6379 26.8803C27.7093 27.0288 27.7245 27.1988 27.6805 27.3579C27.0527 29.6056 25.7193 31.5848 23.8821 32.9958C22.045 34.4068 19.8041 35.1726 17.499 35.1774ZM17.499 15.0947C15.8008 15.0949 14.1355 15.5692 12.6857 16.4654C11.2359 17.3616 10.0578 18.6451 9.28042 20.1752C8.50308 21.7053 8.15661 23.4228 8.27902 25.1392C8.40144 26.8557 8.98801 28.5049 9.97438 29.9058C10.9608 31.3067 12.3088 32.4052 13.8707 33.0808C15.4325 33.7564 17.1479 33.9831 18.8284 33.7358C20.509 33.4886 22.09 32.7771 23.3978 31.6793C24.7056 30.5815 25.6898 29.1399 26.2424 27.5126C25.7337 27.1878 25.3145 26.7378 25.024 26.2043C24.7335 25.6709 24.5811 25.0716 24.5811 24.4624C24.5811 23.8531 24.7335 23.2538 25.024 22.7204C25.3145 22.187 25.7337 21.7369 26.2424 21.4122C25.6109 19.5707 24.4303 17.9736 22.8639 16.8418C21.2975 15.71 19.4227 15.0995 17.499 15.0947Z" fill="#202020" />
                                            <path d="M14.3021 28.747C14.1263 28.7464 13.9577 28.6759 13.8326 28.5507L11.778 26.4687C11.6646 26.3402 11.604 26.1726 11.6086 26.0003C11.6132 25.828 11.6827 25.664 11.8028 25.5419C11.9229 25.4198 12.0845 25.3489 12.2545 25.3437C12.4246 25.3385 12.5901 25.3994 12.7172 25.5139L14.2992 27.1171L21.5663 19.7556C21.6908 19.6294 21.8598 19.5585 22.0359 19.5585C22.212 19.5585 22.381 19.6294 22.5055 19.7556C22.6301 19.8818 22.7 20.053 22.7 20.2315C22.7 20.41 22.6301 20.5812 22.5055 20.7074L14.7718 28.5477C14.6469 28.6737 14.4783 28.7453 14.3021 28.747Z" fill="#202020" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_917_832">
                                                <rect width="35" height="43" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <span class="text-xs sm:text-sm lg:text-base capitalize text-black font-medium">Machine Washable</span>
                                </div>
                                <div class="flex gap-[10px] items-center">
                                    <svg width="35" height="43" viewBox="0 0 35 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_917_832)">
                                            <path d="M31.8595 43H3.14046C2.30779 42.9992 1.50946 42.6636 0.920675 42.067C0.331893 41.4703 0.000777101 40.6613 0 39.8174V3.18254C0.000777101 2.33872 0.331893 1.52968 0.920675 0.933011C1.50946 0.33634 2.30779 0.000787514 3.14046 0H31.8595C32.6922 0.000787514 33.4905 0.33634 34.0793 0.933011C34.6681 1.52968 34.9992 2.33872 35 3.18254V39.8174C34.9992 40.6613 34.6681 41.4703 34.0793 42.067C33.4905 42.6636 32.6922 42.9992 31.8595 43ZM3.14046 1.35927C2.66017 1.35927 2.19956 1.55262 1.85995 1.89678C1.52034 2.24094 1.32956 2.70772 1.32956 3.19444V39.8174C1.33034 40.3039 1.52137 40.7702 1.86081 41.1142C2.20026 41.4582 2.66041 41.6518 3.14046 41.6526H31.8595C32.3396 41.6518 32.7997 41.4582 33.1392 41.1142C33.4786 40.7702 33.6697 40.3039 33.6704 39.8174V3.18254C33.6704 2.69582 33.4796 2.22904 33.14 1.88488C32.8004 1.54072 32.3398 1.34737 31.8595 1.34737L3.14046 1.35927Z" fill="#202020" />
                                            <path d="M31.9273 7.34958H3.07322C2.90455 7.33822 2.74643 7.26229 2.63093 7.1372C2.51543 7.01211 2.45117 6.8472 2.45117 6.67589C2.45117 6.50457 2.51543 6.33967 2.63093 6.21458C2.74643 6.08949 2.90455 6.01356 3.07322 6.0022H31.9273C32.096 6.01356 32.2541 6.08949 32.3696 6.21458C32.4851 6.33967 32.5494 6.50457 32.5494 6.67589C32.5494 6.8472 32.4851 7.01211 32.3696 7.1372C32.2541 7.26229 32.096 7.33822 31.9273 7.34958Z" fill="#202020" />
                                            <path d="M3.94777 4.51805H3.11717C2.94849 4.50669 2.79039 4.43078 2.67488 4.30569C2.55938 4.1806 2.49512 4.01567 2.49512 3.84436C2.49512 3.67304 2.55938 3.50814 2.67488 3.38305C2.79039 3.25796 2.94849 3.18204 3.11717 3.17068H3.94777C4.03879 3.16454 4.13007 3.17742 4.21598 3.2085C4.30188 3.23958 4.38058 3.2882 4.44718 3.35136C4.51379 3.41452 4.56689 3.49088 4.60319 3.57568C4.63949 3.66048 4.65822 3.75192 4.65822 3.84436C4.65822 3.9368 4.63949 4.02825 4.60319 4.11306C4.56689 4.19786 4.51379 4.27421 4.44718 4.33737C4.38058 4.40052 4.30188 4.44916 4.21598 4.48024C4.13007 4.51132 4.03879 4.52418 3.94777 4.51805Z" fill="#202020" />
                                            <path d="M7.30863 4.51805H6.47802C6.387 4.52418 6.29571 4.51132 6.20981 4.48024C6.1239 4.44916 6.04522 4.40052 5.97861 4.33737C5.91201 4.27421 5.85891 4.19786 5.82261 4.11306C5.78631 4.02825 5.76758 3.9368 5.76758 3.84436C5.76758 3.75192 5.78631 3.66048 5.82261 3.57568C5.85891 3.49088 5.91201 3.41452 5.97861 3.35136C6.04522 3.2882 6.1239 3.23958 6.20981 3.2085C6.29571 3.17742 6.387 3.16454 6.47802 3.17068H7.30863C7.47731 3.18204 7.63541 3.25796 7.75091 3.38305C7.86642 3.50814 7.93068 3.67304 7.93068 3.84436C7.93068 4.01567 7.86642 4.1806 7.75091 4.30569C7.63541 4.43078 7.47731 4.50669 7.30863 4.51805Z" fill="#202020" />
                                            <path d="M31.6656 4.51803H30.832C30.6633 4.50666 30.5052 4.43076 30.3897 4.30566C30.2742 4.18057 30.21 4.01565 30.21 3.84434C30.21 3.67302 30.2742 3.50812 30.3897 3.38303C30.5052 3.25794 30.6633 3.18202 30.832 3.17065H31.6656C31.8342 3.18202 31.9923 3.25794 32.1078 3.38303C32.2233 3.50812 32.2876 3.67302 32.2876 3.84434C32.2876 4.01565 32.2233 4.18057 32.1078 4.30566C31.9923 4.43076 31.8342 4.50666 31.6656 4.51803Z" fill="#202020" />
                                            <path d="M17.4987 38.4403C14.7704 38.4403 12.1033 37.6205 9.83481 36.0844C7.56631 34.5483 5.79824 32.365 4.75416 29.8106C3.71008 27.2562 3.4369 24.4455 3.96916 21.7337C4.50143 19.022 5.81524 16.5311 7.74444 14.576C9.67365 12.621 12.1316 11.2896 14.8075 10.7502C17.4834 10.2108 20.257 10.4876 22.7776 11.5457C25.2982 12.6038 27.4526 14.3955 28.9684 16.6944C30.4842 18.9933 31.2932 21.6961 31.2932 24.4609C31.2932 28.1685 29.8399 31.7242 27.2529 34.3459C24.6659 36.9675 21.1572 38.4403 17.4987 38.4403ZM17.4987 11.8319C15.0333 11.8319 12.6233 12.5728 10.5735 13.9608C8.52363 15.3488 6.92595 17.3217 5.98251 19.6299C5.03906 21.9381 4.79221 24.4779 5.27318 26.9283C5.75414 29.3787 6.94132 31.6295 8.68458 33.3961C10.4278 35.1627 12.6489 36.3658 15.0669 36.8532C17.4848 37.3406 19.9911 37.0905 22.2688 36.1344C24.5465 35.1783 26.4932 33.5592 27.8629 31.4819C29.2326 29.4046 29.9636 26.9623 29.9636 24.4639C29.9598 21.1149 28.6452 17.9042 26.3084 15.5361C23.9716 13.168 20.8034 11.8359 17.4987 11.8319Z" fill="#202020" />
                                            <path d="M17.499 35.1774C15.5329 35.1755 13.6064 34.6176 11.9361 33.5667C10.2657 32.5157 8.9179 31.0133 8.04414 29.2285C7.17038 27.4436 6.80536 25.4471 6.99013 23.4635C7.1749 21.4799 7.90213 19.5879 9.09003 18.0003C10.2779 16.4127 11.8794 15.1924 13.7143 14.4768C15.5491 13.7611 17.5447 13.5785 19.4764 13.9494C21.4081 14.3203 23.1993 15.23 24.6487 16.5763C26.0981 17.9225 27.1481 19.6519 27.6805 21.5698C27.7237 21.7285 27.7081 21.8978 27.6368 22.0456C27.5654 22.1935 27.4432 22.3099 27.2931 22.3729C26.8838 22.5426 26.5335 22.8319 26.287 23.204C26.0405 23.5761 25.9088 24.0142 25.9088 24.4624C25.9088 24.9106 26.0405 25.3486 26.287 25.7207C26.5335 26.0928 26.8838 26.3822 27.2931 26.5519C27.4438 26.6149 27.5665 26.7317 27.6379 26.8803C27.7093 27.0288 27.7245 27.1988 27.6805 27.3579C27.0527 29.6056 25.7193 31.5848 23.8821 32.9958C22.045 34.4068 19.8041 35.1726 17.499 35.1774ZM17.499 15.0947C15.8008 15.0949 14.1355 15.5692 12.6857 16.4654C11.2359 17.3616 10.0578 18.6451 9.28042 20.1752C8.50308 21.7053 8.15661 23.4228 8.27902 25.1392C8.40144 26.8557 8.98801 28.5049 9.97438 29.9058C10.9608 31.3067 12.3088 32.4052 13.8707 33.0808C15.4325 33.7564 17.1479 33.9831 18.8284 33.7358C20.509 33.4886 22.09 32.7771 23.3978 31.6793C24.7056 30.5815 25.6898 29.1399 26.2424 27.5126C25.7337 27.1878 25.3145 26.7378 25.024 26.2043C24.7335 25.6709 24.5811 25.0716 24.5811 24.4624C24.5811 23.8531 24.7335 23.2538 25.024 22.7204C25.3145 22.187 25.7337 21.7369 26.2424 21.4122C25.6109 19.5707 24.4303 17.9736 22.8639 16.8418C21.2975 15.71 19.4227 15.0995 17.499 15.0947Z" fill="#202020" />
                                            <path d="M14.3021 28.747C14.1263 28.7464 13.9577 28.6759 13.8326 28.5507L11.778 26.4687C11.6646 26.3402 11.604 26.1726 11.6086 26.0003C11.6132 25.828 11.6827 25.664 11.8028 25.5419C11.9229 25.4198 12.0845 25.3489 12.2545 25.3437C12.4246 25.3385 12.5901 25.3994 12.7172 25.5139L14.2992 27.1171L21.5663 19.7556C21.6908 19.6294 21.8598 19.5585 22.0359 19.5585C22.212 19.5585 22.381 19.6294 22.5055 19.7556C22.6301 19.8818 22.7 20.053 22.7 20.2315C22.7 20.41 22.6301 20.5812 22.5055 20.7074L14.7718 28.5477C14.6469 28.6737 14.4783 28.7453 14.3021 28.747Z" fill="#202020" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_917_832">
                                                <rect width="35" height="43" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <span class="text-xs sm:text-sm lg:text-base capitalize text-black font-medium">Machine Washable</span>
                                </div>
                                <div class="flex gap-[10px] items-center">
                                    <svg width="35" height="43" viewBox="0 0 35 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_917_832)">
                                            <path d="M31.8595 43H3.14046C2.30779 42.9992 1.50946 42.6636 0.920675 42.067C0.331893 41.4703 0.000777101 40.6613 0 39.8174V3.18254C0.000777101 2.33872 0.331893 1.52968 0.920675 0.933011C1.50946 0.33634 2.30779 0.000787514 3.14046 0H31.8595C32.6922 0.000787514 33.4905 0.33634 34.0793 0.933011C34.6681 1.52968 34.9992 2.33872 35 3.18254V39.8174C34.9992 40.6613 34.6681 41.4703 34.0793 42.067C33.4905 42.6636 32.6922 42.9992 31.8595 43ZM3.14046 1.35927C2.66017 1.35927 2.19956 1.55262 1.85995 1.89678C1.52034 2.24094 1.32956 2.70772 1.32956 3.19444V39.8174C1.33034 40.3039 1.52137 40.7702 1.86081 41.1142C2.20026 41.4582 2.66041 41.6518 3.14046 41.6526H31.8595C32.3396 41.6518 32.7997 41.4582 33.1392 41.1142C33.4786 40.7702 33.6697 40.3039 33.6704 39.8174V3.18254C33.6704 2.69582 33.4796 2.22904 33.14 1.88488C32.8004 1.54072 32.3398 1.34737 31.8595 1.34737L3.14046 1.35927Z" fill="#202020" />
                                            <path d="M31.9273 7.34958H3.07322C2.90455 7.33822 2.74643 7.26229 2.63093 7.1372C2.51543 7.01211 2.45117 6.8472 2.45117 6.67589C2.45117 6.50457 2.51543 6.33967 2.63093 6.21458C2.74643 6.08949 2.90455 6.01356 3.07322 6.0022H31.9273C32.096 6.01356 32.2541 6.08949 32.3696 6.21458C32.4851 6.33967 32.5494 6.50457 32.5494 6.67589C32.5494 6.8472 32.4851 7.01211 32.3696 7.1372C32.2541 7.26229 32.096 7.33822 31.9273 7.34958Z" fill="#202020" />
                                            <path d="M3.94777 4.51805H3.11717C2.94849 4.50669 2.79039 4.43078 2.67488 4.30569C2.55938 4.1806 2.49512 4.01567 2.49512 3.84436C2.49512 3.67304 2.55938 3.50814 2.67488 3.38305C2.79039 3.25796 2.94849 3.18204 3.11717 3.17068H3.94777C4.03879 3.16454 4.13007 3.17742 4.21598 3.2085C4.30188 3.23958 4.38058 3.2882 4.44718 3.35136C4.51379 3.41452 4.56689 3.49088 4.60319 3.57568C4.63949 3.66048 4.65822 3.75192 4.65822 3.84436C4.65822 3.9368 4.63949 4.02825 4.60319 4.11306C4.56689 4.19786 4.51379 4.27421 4.44718 4.33737C4.38058 4.40052 4.30188 4.44916 4.21598 4.48024C4.13007 4.51132 4.03879 4.52418 3.94777 4.51805Z" fill="#202020" />
                                            <path d="M7.30863 4.51805H6.47802C6.387 4.52418 6.29571 4.51132 6.20981 4.48024C6.1239 4.44916 6.04522 4.40052 5.97861 4.33737C5.91201 4.27421 5.85891 4.19786 5.82261 4.11306C5.78631 4.02825 5.76758 3.9368 5.76758 3.84436C5.76758 3.75192 5.78631 3.66048 5.82261 3.57568C5.85891 3.49088 5.91201 3.41452 5.97861 3.35136C6.04522 3.2882 6.1239 3.23958 6.20981 3.2085C6.29571 3.17742 6.387 3.16454 6.47802 3.17068H7.30863C7.47731 3.18204 7.63541 3.25796 7.75091 3.38305C7.86642 3.50814 7.93068 3.67304 7.93068 3.84436C7.93068 4.01567 7.86642 4.1806 7.75091 4.30569C7.63541 4.43078 7.47731 4.50669 7.30863 4.51805Z" fill="#202020" />
                                            <path d="M31.6656 4.51803H30.832C30.6633 4.50666 30.5052 4.43076 30.3897 4.30566C30.2742 4.18057 30.21 4.01565 30.21 3.84434C30.21 3.67302 30.2742 3.50812 30.3897 3.38303C30.5052 3.25794 30.6633 3.18202 30.832 3.17065H31.6656C31.8342 3.18202 31.9923 3.25794 32.1078 3.38303C32.2233 3.50812 32.2876 3.67302 32.2876 3.84434C32.2876 4.01565 32.2233 4.18057 32.1078 4.30566C31.9923 4.43076 31.8342 4.50666 31.6656 4.51803Z" fill="#202020" />
                                            <path d="M17.4987 38.4403C14.7704 38.4403 12.1033 37.6205 9.83481 36.0844C7.56631 34.5483 5.79824 32.365 4.75416 29.8106C3.71008 27.2562 3.4369 24.4455 3.96916 21.7337C4.50143 19.022 5.81524 16.5311 7.74444 14.576C9.67365 12.621 12.1316 11.2896 14.8075 10.7502C17.4834 10.2108 20.257 10.4876 22.7776 11.5457C25.2982 12.6038 27.4526 14.3955 28.9684 16.6944C30.4842 18.9933 31.2932 21.6961 31.2932 24.4609C31.2932 28.1685 29.8399 31.7242 27.2529 34.3459C24.6659 36.9675 21.1572 38.4403 17.4987 38.4403ZM17.4987 11.8319C15.0333 11.8319 12.6233 12.5728 10.5735 13.9608C8.52363 15.3488 6.92595 17.3217 5.98251 19.6299C5.03906 21.9381 4.79221 24.4779 5.27318 26.9283C5.75414 29.3787 6.94132 31.6295 8.68458 33.3961C10.4278 35.1627 12.6489 36.3658 15.0669 36.8532C17.4848 37.3406 19.9911 37.0905 22.2688 36.1344C24.5465 35.1783 26.4932 33.5592 27.8629 31.4819C29.2326 29.4046 29.9636 26.9623 29.9636 24.4639C29.9598 21.1149 28.6452 17.9042 26.3084 15.5361C23.9716 13.168 20.8034 11.8359 17.4987 11.8319Z" fill="#202020" />
                                            <path d="M17.499 35.1774C15.5329 35.1755 13.6064 34.6176 11.9361 33.5667C10.2657 32.5157 8.9179 31.0133 8.04414 29.2285C7.17038 27.4436 6.80536 25.4471 6.99013 23.4635C7.1749 21.4799 7.90213 19.5879 9.09003 18.0003C10.2779 16.4127 11.8794 15.1924 13.7143 14.4768C15.5491 13.7611 17.5447 13.5785 19.4764 13.9494C21.4081 14.3203 23.1993 15.23 24.6487 16.5763C26.0981 17.9225 27.1481 19.6519 27.6805 21.5698C27.7237 21.7285 27.7081 21.8978 27.6368 22.0456C27.5654 22.1935 27.4432 22.3099 27.2931 22.3729C26.8838 22.5426 26.5335 22.8319 26.287 23.204C26.0405 23.5761 25.9088 24.0142 25.9088 24.4624C25.9088 24.9106 26.0405 25.3486 26.287 25.7207C26.5335 26.0928 26.8838 26.3822 27.2931 26.5519C27.4438 26.6149 27.5665 26.7317 27.6379 26.8803C27.7093 27.0288 27.7245 27.1988 27.6805 27.3579C27.0527 29.6056 25.7193 31.5848 23.8821 32.9958C22.045 34.4068 19.8041 35.1726 17.499 35.1774ZM17.499 15.0947C15.8008 15.0949 14.1355 15.5692 12.6857 16.4654C11.2359 17.3616 10.0578 18.6451 9.28042 20.1752C8.50308 21.7053 8.15661 23.4228 8.27902 25.1392C8.40144 26.8557 8.98801 28.5049 9.97438 29.9058C10.9608 31.3067 12.3088 32.4052 13.8707 33.0808C15.4325 33.7564 17.1479 33.9831 18.8284 33.7358C20.509 33.4886 22.09 32.7771 23.3978 31.6793C24.7056 30.5815 25.6898 29.1399 26.2424 27.5126C25.7337 27.1878 25.3145 26.7378 25.024 26.2043C24.7335 25.6709 24.5811 25.0716 24.5811 24.4624C24.5811 23.8531 24.7335 23.2538 25.024 22.7204C25.3145 22.187 25.7337 21.7369 26.2424 21.4122C25.6109 19.5707 24.4303 17.9736 22.8639 16.8418C21.2975 15.71 19.4227 15.0995 17.499 15.0947Z" fill="#202020" />
                                            <path d="M14.3021 28.747C14.1263 28.7464 13.9577 28.6759 13.8326 28.5507L11.778 26.4687C11.6646 26.3402 11.604 26.1726 11.6086 26.0003C11.6132 25.828 11.6827 25.664 11.8028 25.5419C11.9229 25.4198 12.0845 25.3489 12.2545 25.3437C12.4246 25.3385 12.5901 25.3994 12.7172 25.5139L14.2992 27.1171L21.5663 19.7556C21.6908 19.6294 21.8598 19.5585 22.0359 19.5585C22.212 19.5585 22.381 19.6294 22.5055 19.7556C22.6301 19.8818 22.7 20.053 22.7 20.2315C22.7 20.41 22.6301 20.5812 22.5055 20.7074L14.7718 28.5477C14.6469 28.6737 14.4783 28.7453 14.3021 28.747Z" fill="#202020" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_917_832">
                                                <rect width="35" height="43" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <span class="text-xs sm:text-sm lg:text-base capitalize text-black font-medium">Machine Washable</span>
                                </div>
                                <div class="flex gap-[10px] items-center">
                                    <svg width="35" height="43" viewBox="0 0 35 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_917_832)">
                                            <path d="M31.8595 43H3.14046C2.30779 42.9992 1.50946 42.6636 0.920675 42.067C0.331893 41.4703 0.000777101 40.6613 0 39.8174V3.18254C0.000777101 2.33872 0.331893 1.52968 0.920675 0.933011C1.50946 0.33634 2.30779 0.000787514 3.14046 0H31.8595C32.6922 0.000787514 33.4905 0.33634 34.0793 0.933011C34.6681 1.52968 34.9992 2.33872 35 3.18254V39.8174C34.9992 40.6613 34.6681 41.4703 34.0793 42.067C33.4905 42.6636 32.6922 42.9992 31.8595 43ZM3.14046 1.35927C2.66017 1.35927 2.19956 1.55262 1.85995 1.89678C1.52034 2.24094 1.32956 2.70772 1.32956 3.19444V39.8174C1.33034 40.3039 1.52137 40.7702 1.86081 41.1142C2.20026 41.4582 2.66041 41.6518 3.14046 41.6526H31.8595C32.3396 41.6518 32.7997 41.4582 33.1392 41.1142C33.4786 40.7702 33.6697 40.3039 33.6704 39.8174V3.18254C33.6704 2.69582 33.4796 2.22904 33.14 1.88488C32.8004 1.54072 32.3398 1.34737 31.8595 1.34737L3.14046 1.35927Z" fill="#202020" />
                                            <path d="M31.9273 7.34958H3.07322C2.90455 7.33822 2.74643 7.26229 2.63093 7.1372C2.51543 7.01211 2.45117 6.8472 2.45117 6.67589C2.45117 6.50457 2.51543 6.33967 2.63093 6.21458C2.74643 6.08949 2.90455 6.01356 3.07322 6.0022H31.9273C32.096 6.01356 32.2541 6.08949 32.3696 6.21458C32.4851 6.33967 32.5494 6.50457 32.5494 6.67589C32.5494 6.8472 32.4851 7.01211 32.3696 7.1372C32.2541 7.26229 32.096 7.33822 31.9273 7.34958Z" fill="#202020" />
                                            <path d="M3.94777 4.51805H3.11717C2.94849 4.50669 2.79039 4.43078 2.67488 4.30569C2.55938 4.1806 2.49512 4.01567 2.49512 3.84436C2.49512 3.67304 2.55938 3.50814 2.67488 3.38305C2.79039 3.25796 2.94849 3.18204 3.11717 3.17068H3.94777C4.03879 3.16454 4.13007 3.17742 4.21598 3.2085C4.30188 3.23958 4.38058 3.2882 4.44718 3.35136C4.51379 3.41452 4.56689 3.49088 4.60319 3.57568C4.63949 3.66048 4.65822 3.75192 4.65822 3.84436C4.65822 3.9368 4.63949 4.02825 4.60319 4.11306C4.56689 4.19786 4.51379 4.27421 4.44718 4.33737C4.38058 4.40052 4.30188 4.44916 4.21598 4.48024C4.13007 4.51132 4.03879 4.52418 3.94777 4.51805Z" fill="#202020" />
                                            <path d="M7.30863 4.51805H6.47802C6.387 4.52418 6.29571 4.51132 6.20981 4.48024C6.1239 4.44916 6.04522 4.40052 5.97861 4.33737C5.91201 4.27421 5.85891 4.19786 5.82261 4.11306C5.78631 4.02825 5.76758 3.9368 5.76758 3.84436C5.76758 3.75192 5.78631 3.66048 5.82261 3.57568C5.85891 3.49088 5.91201 3.41452 5.97861 3.35136C6.04522 3.2882 6.1239 3.23958 6.20981 3.2085C6.29571 3.17742 6.387 3.16454 6.47802 3.17068H7.30863C7.47731 3.18204 7.63541 3.25796 7.75091 3.38305C7.86642 3.50814 7.93068 3.67304 7.93068 3.84436C7.93068 4.01567 7.86642 4.1806 7.75091 4.30569C7.63541 4.43078 7.47731 4.50669 7.30863 4.51805Z" fill="#202020" />
                                            <path d="M31.6656 4.51803H30.832C30.6633 4.50666 30.5052 4.43076 30.3897 4.30566C30.2742 4.18057 30.21 4.01565 30.21 3.84434C30.21 3.67302 30.2742 3.50812 30.3897 3.38303C30.5052 3.25794 30.6633 3.18202 30.832 3.17065H31.6656C31.8342 3.18202 31.9923 3.25794 32.1078 3.38303C32.2233 3.50812 32.2876 3.67302 32.2876 3.84434C32.2876 4.01565 32.2233 4.18057 32.1078 4.30566C31.9923 4.43076 31.8342 4.50666 31.6656 4.51803Z" fill="#202020" />
                                            <path d="M17.4987 38.4403C14.7704 38.4403 12.1033 37.6205 9.83481 36.0844C7.56631 34.5483 5.79824 32.365 4.75416 29.8106C3.71008 27.2562 3.4369 24.4455 3.96916 21.7337C4.50143 19.022 5.81524 16.5311 7.74444 14.576C9.67365 12.621 12.1316 11.2896 14.8075 10.7502C17.4834 10.2108 20.257 10.4876 22.7776 11.5457C25.2982 12.6038 27.4526 14.3955 28.9684 16.6944C30.4842 18.9933 31.2932 21.6961 31.2932 24.4609C31.2932 28.1685 29.8399 31.7242 27.2529 34.3459C24.6659 36.9675 21.1572 38.4403 17.4987 38.4403ZM17.4987 11.8319C15.0333 11.8319 12.6233 12.5728 10.5735 13.9608C8.52363 15.3488 6.92595 17.3217 5.98251 19.6299C5.03906 21.9381 4.79221 24.4779 5.27318 26.9283C5.75414 29.3787 6.94132 31.6295 8.68458 33.3961C10.4278 35.1627 12.6489 36.3658 15.0669 36.8532C17.4848 37.3406 19.9911 37.0905 22.2688 36.1344C24.5465 35.1783 26.4932 33.5592 27.8629 31.4819C29.2326 29.4046 29.9636 26.9623 29.9636 24.4639C29.9598 21.1149 28.6452 17.9042 26.3084 15.5361C23.9716 13.168 20.8034 11.8359 17.4987 11.8319Z" fill="#202020" />
                                            <path d="M17.499 35.1774C15.5329 35.1755 13.6064 34.6176 11.9361 33.5667C10.2657 32.5157 8.9179 31.0133 8.04414 29.2285C7.17038 27.4436 6.80536 25.4471 6.99013 23.4635C7.1749 21.4799 7.90213 19.5879 9.09003 18.0003C10.2779 16.4127 11.8794 15.1924 13.7143 14.4768C15.5491 13.7611 17.5447 13.5785 19.4764 13.9494C21.4081 14.3203 23.1993 15.23 24.6487 16.5763C26.0981 17.9225 27.1481 19.6519 27.6805 21.5698C27.7237 21.7285 27.7081 21.8978 27.6368 22.0456C27.5654 22.1935 27.4432 22.3099 27.2931 22.3729C26.8838 22.5426 26.5335 22.8319 26.287 23.204C26.0405 23.5761 25.9088 24.0142 25.9088 24.4624C25.9088 24.9106 26.0405 25.3486 26.287 25.7207C26.5335 26.0928 26.8838 26.3822 27.2931 26.5519C27.4438 26.6149 27.5665 26.7317 27.6379 26.8803C27.7093 27.0288 27.7245 27.1988 27.6805 27.3579C27.0527 29.6056 25.7193 31.5848 23.8821 32.9958C22.045 34.4068 19.8041 35.1726 17.499 35.1774ZM17.499 15.0947C15.8008 15.0949 14.1355 15.5692 12.6857 16.4654C11.2359 17.3616 10.0578 18.6451 9.28042 20.1752C8.50308 21.7053 8.15661 23.4228 8.27902 25.1392C8.40144 26.8557 8.98801 28.5049 9.97438 29.9058C10.9608 31.3067 12.3088 32.4052 13.8707 33.0808C15.4325 33.7564 17.1479 33.9831 18.8284 33.7358C20.509 33.4886 22.09 32.7771 23.3978 31.6793C24.7056 30.5815 25.6898 29.1399 26.2424 27.5126C25.7337 27.1878 25.3145 26.7378 25.024 26.2043C24.7335 25.6709 24.5811 25.0716 24.5811 24.4624C24.5811 23.8531 24.7335 23.2538 25.024 22.7204C25.3145 22.187 25.7337 21.7369 26.2424 21.4122C25.6109 19.5707 24.4303 17.9736 22.8639 16.8418C21.2975 15.71 19.4227 15.0995 17.499 15.0947Z" fill="#202020" />
                                            <path d="M14.3021 28.747C14.1263 28.7464 13.9577 28.6759 13.8326 28.5507L11.778 26.4687C11.6646 26.3402 11.604 26.1726 11.6086 26.0003C11.6132 25.828 11.6827 25.664 11.8028 25.5419C11.9229 25.4198 12.0845 25.3489 12.2545 25.3437C12.4246 25.3385 12.5901 25.3994 12.7172 25.5139L14.2992 27.1171L21.5663 19.7556C21.6908 19.6294 21.8598 19.5585 22.0359 19.5585C22.212 19.5585 22.381 19.6294 22.5055 19.7556C22.6301 19.8818 22.7 20.053 22.7 20.2315C22.7 20.41 22.6301 20.5812 22.5055 20.7074L14.7718 28.5477C14.6469 28.6737 14.4783 28.7453 14.3021 28.747Z" fill="#202020" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_917_832">
                                                <rect width="35" height="43" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <span class="text-xs sm:text-sm lg:text-base capitalize text-black font-medium">Machine Washable</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-2xl">
                        {/* Tab headers */}
                        <div className="flex gap-6">
                            {['Product Info 1', 'Product Info 2', 'Product Info 3'].map((tab, index) => {
                                const tabIndex = index + 1;
                                return (
                                    <button
                                        key={tabIndex}
                                        onClick={() => setActiveTab(tabIndex)}
                                        className={`py-2 focus:outline-none text-sm font-bold sm:text-base ${activeTab === tabIndex ? 'text-black border-b-2 border-gray-400' : 'text-gray-500'}`}
                                    >
                                        {tab}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Tab content */}
                        <div className="mt-2">
                            {activeTab === 1 && (
                                <div>
                                    <p className="text-base">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...</p>
                                </div>
                            )}
                            {activeTab === 2 && (
                                <div>
                                    <p className="text-base">This is the content for Product Info 2. It could be different text or any other content you want to display.</p>
                                </div>
                            )}
                            {activeTab === 3 && (
                                <div>
                                    <p className="text-base">This is the content for Product Info 3. Feel free to add more content here as needed.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>


           <CartSidebar isOpen={isOpen} product={product} selectedImageId={selectedImageId} selectedPrice={selectedPrice} selectedSize={selectedSize} />
    
            

        </>
    )
}

export default ProductInfo