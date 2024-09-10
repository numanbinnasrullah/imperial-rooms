import CollectionWraper from "@/app/(components)/Collection/Collection"
import collectionPageQuery from "@/graphql/collection/collection";
import filtersQuery from "@/graphql/filters/filters";


const Collection = async({ params, searchParams}) => {
  console.log("CollectionWraper run", params, searchParams)
  const slug = params?.slug
  // console.log("slug", slug)
  const variantOptions = [];
  let paginate = ""
  let priceRange = {};
  
  const addVariantOption = (name, value) => {
    if(value.includes('x')){
      // console.log("Valueeeeeee include ", value)
      const valueX =   value.replace('x', ' x ')
      const variantOption = { "variantOption": { "name": name, "value": valueX } };
      variantOptions.push(variantOption);
    } else if(value.includes('X')){
      const valueX =   value.replace('X', ' X ')
      const variantOption = { "variantOption": { "name": name, "value": valueX } };
      variantOptions.push(variantOption);
    } else {
      const variantOption = { "variantOption": { "name": name, "value": value } };
      variantOptions.push(variantOption);
    }
  };

  // Function to add price range to variantOptions array
const addPriceRange = (min, max) => {
  priceRange = { "price": { "min": min, "max": max } };
  variantOptions.push(priceRange);
};

  for (const key in searchParams) {
    if (searchParams.hasOwnProperty(key)) {
      let values = searchParams[key];
      // console.log("Values", values)
      if (!Array.isArray(values)) {
        values = [values]; // Convert to array if not already an array
      }
  
      values.forEach(value => {
      
          // console.log("Value above switch", key)
          switch (key) {
            
            case 'filter.size':
              // Add size variant option
              addVariantOption('Size', value);
              break;
            case 'filter.color':
              // Add color variant option
              addVariantOption('Color', value);
              break;
            case 'filter.gt-price':
              // Greater than price
              priceRange.min = parseFloat(value);
              break;
            case 'filter.lt-price':
              // Less than price
              priceRange.max = parseFloat(value);
              break;
            case 'nextPage':
                paginate = JSON.stringify(value);
                break;
            case 'previousPage':
               paginate = JSON.stringify(value);
            break;
            default:
              break;
          }
        
      });
    }
  }

  // Add price range to variantOptions array if it's defined
if (priceRange.min !== undefined && priceRange.max !== undefined) {
  addPriceRange(priceRange.min, priceRange.max);
}

  console.log("variantOptions", variantOptions)
  let collectionPageData;
  let initialcheck ;
  if(variantOptions?.length > 0){
    initialcheck = false
    collectionPageData = await filtersQuery(slug, JSON.stringify(variantOptions) );
    if(paginate){
      collectionPageData = await filtersQuery(slug, JSON.stringify(variantOptions), paginate );
    }
  }else {
    initialcheck = true
    collectionPageData = await collectionPageQuery(slug, "");
    if(paginate){
      collectionPageData = await collectionPageQuery(slug, paginate);
    }
  }
  const {collection} = collectionPageData?.data
  // console.log("collection Products with Filters *****", collection)
  // console.log("collection Products @@@@@", collection)
  const colorFiltersLength = collection?.products?.filters?.filter(filter => filter.label.includes('Color')).map((filter)=> filter?.values)
  // console.log("one two ", colorFiltersLength)
  return (
    <>
      <CollectionWraper slug={slug} collection={collection} initialcheck={initialcheck} />
    </>
  )
}

export default Collection 