

const ProductWrapper = ({children}) => {
  return (
   <>
     <section class="prd-template block py-10 sm:px-6">
        <div class="block w-full max-w-[1440px] mx-auto px-3">
            <div class="block w-full">
                <div class="flex flex-col gap-5 md:flex-row md:gap-0 lg:gap-5">
                    {children}
                </div>
            </div>
        </div>
    </section>
   </>
  )
}

export default ProductWrapper