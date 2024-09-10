import collectionPageQuery from "@/graphql/collection/collection"
import CollectionGrid from "./collectionGrid/CollectionGrid"
import CollectionHeader from "./collectionHeader/CollectionHeader"
import CollectionReviews from "./collectionReviews/CollectionReviews"
import FilterBar from "./filterBar/FilterBar"
import ProductsAndFiltersWrapper from "./productsAndFiltersWrapper/productsAndFiltersWrapper"


const CollectionWraper = async({collection, slug ,initialcheck}) => {
  // console.log(("CollectionWraper", searchParams))
  // let collectionPageData = await collectionPageQuery(slug, "");
  // const {collection} = collectionPageData?.data
  // console.log("Collection Page Data", collectionPageData?.data?.collection?.products?.edges)
  return (
    <>
    <div className="w-full">
        <CollectionHeader collection={collection} />
        <FilterBar collection={collection} />
        <ProductsAndFiltersWrapper collection={collection} slug={slug} initialcheck={initialcheck} />
        {/* <CollectionGrid /> */}
        {/* <CollectionReviews /> */}
    </div>
    </>
  )
}

export default CollectionWraper