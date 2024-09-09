import CollectionWraper from "@/app/(components)/Collection/Collection"
import collectionPageQuery from "@/graphql/collection/collection";
import filtersQuery from "@/graphql/filters/filters";


const Collection = async({ params, searchParams}) => {
  console.log("CollectionWraper run", params, searchParams)
  const slug = params?.slug
  // console.log("slug", slug)
  const variantOptions = [];
  
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
  console.log("variantOptions", variantOptions)
  let collectionPageData;
  if(variantOptions?.length > 0){
    collectionPageData = await filtersQuery(slug, JSON.stringify(variantOptions) );
  }else {
    collectionPageData = await collectionPageQuery(slug, "");
  }
  const {collection} = collectionPageData?.data
  console.log("collection Products with Filters *****", collection)
  console.log("collection Products @@@@@", collection)
  return (
    <>
      <CollectionWraper slug={slug} collection={collection} />
    </>
  )
}

export default Collection 