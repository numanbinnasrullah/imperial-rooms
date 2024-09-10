import CollectionGrid from "../collectionGrid/CollectionGrid"
import Filters from "../filters/Filters"



const ProductsAndFiltersWrapper = ({collection, slug, initialcheck}) => {
  return (
    <>
        <div className='lg:w-[85%] xl:w-[77%] flex lg:gap-[2%] mx-auto '> 
            <Filters  collection={collection} slug={slug} initialcheck={initialcheck} />
            <CollectionGrid collection={collection}  />
        </div>
    </>
  )
}

export default ProductsAndFiltersWrapper