import CollectionGrid from "../collectionGrid/CollectionGrid"
import Filters from "../filters/Filters"


const ProductsAndFiltersWrapper = ({slug}) => {
  return (
    <>
        <div className='lg:w-[85%] xl:w-[77%] flex lg:gap-[2%] mx-auto '> 
            <Filters slug={slug} />
            <CollectionGrid />
        </div>
    </>
  )
}

export default ProductsAndFiltersWrapper