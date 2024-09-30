

const TextBanner = ({reverse}) => {
    return (
        <>
            <div class="block px-3 mb-10 md:mb-[70px]">
                <div class="block w-full max-w-[1410px] mx-auto px-2">
                    <div class={`flex flex-col-reverse gap-3 ${reverse ? "md:flex-row-reverse" : "md:flex-row"}  md:items-center md:gap-10 md:justify-between`}>
                        <div class="block w-full h-full max-w-[550px] mx-auto md:mx-0 md:max-w-[800px]">
                            <img src="/Rectangle-740.png" alt="" class="block w-full h-full object-cover" />
                        </div>
                        <div class="flex flex-col justify-end  w-full md:max-w-[450px] md:h-full gap-[30px] lg:gap-[70px] ">
                            <div class="block w-full max-w-[500px] mx-auto md:max-w-[450px]">
                                <h2 class="block text-center text-3xl text-black mb-3 md:mb-4 md:text-start lg:text-[37px] lg:leading-tight">New Banner Version For The Website Collection Page</h2>
                                <p class="block text-base text-black ">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.</p>
                            </div>
                            <div class="hidden justify-end md:flex w-full max-w-[450px]">
                                <a href="#" class="flex items-center text-base gap-1">Browse
                                    <span class="relative top-[2px]">
                                        <svg class="w-2 h-2" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 1H13M13 1V9M13 1L1 13" stroke="black" stroke-width="1.5" />
                                        </svg>
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TextBanner