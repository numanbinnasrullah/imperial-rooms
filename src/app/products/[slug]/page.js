import ProductInfo from "@/app/(components)/Product/productInfo/ProductInfo"
import ProductWrapper from "@/app/(components)/Product/productWrapper/ProductWrapper"
import TextBanner from "@/app/(components)/Product/textBanner/TextBanner";
import YouMayAlsoLike from "@/app/(components)/Product/youMayAlsoLike/YouMayAlsoLike";
import productPageQuery from "@/graphql/product/product";


const page = async({params}) => {
  const productPageData = await productPageQuery(params.slug);
  if (!productPageData || !productPageData?.data) {
    console.error("No data returned from query");
    return <div>Error: Product not found.</div>;
}

  const { product, collection } = productPageData?.data
  console.log("Product id leany k leay", product)
  return (
    <>
      <ProductWrapper>
        <ProductInfo product={product} />
      </ProductWrapper>
      <YouMayAlsoLike />
      <TextBanner reverse={true} />
      <TextBanner  />
    </>
  )
}

export default page